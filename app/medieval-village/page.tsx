"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { loadBuildings } from "./components/buildings";
import { loadDecorations } from "./components/decorations";
import { createGround } from "./components/ground";
import { setupLighting } from "./components/lighting";
import { createPath } from "./components/path";
import {
  createScene,
  createCamera,
  createRenderer,
} from "./components/scene-setup";
import { createTrees } from "./components/trees";
import { createCrosshair, createUI } from "./components/ui";
import { addDockDetails } from "./components/dock-extensions";
import { createWater } from "./components/water";
import { createPortArea } from "./components/port-area";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  VILLAGE2_BUILDINGS,
  VILLAGE2_DECORATIONS,
  VILLAGE2_FENCE_POSITIONS,
} from "./data/village2";
import MiniMap from "./components/mini-map";

export default function MedievalVillage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPointerLock, setIsPointerLock] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const collisionObjectsRef = useRef<
    { x: number; z: number; radius: number }[]
  >([]);
  const animationRef = useRef<number | null>(null);

  const keyStateRef = useRef({ w: false, a: false, s: false, d: false });
  const mouseStateRef = useRef({ x: 0, y: 0 });
  const rotationStateRef = useRef({ yaw: -Math.PI / 2, pitch: 0 });
  const lastTimeRef = useRef(performance.now());
  const bobTimeRef = useRef(0);
  const minimapRef = useRef<{
    updatePosition: (x: number, z: number, rotation: number) => void;
  } | null>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 0 });
  const [treesData, setTreesData] = useState<{ x: number; z: number }[]>([]);
  const [buildingsList, setBuildingsList] = useState<
    { x: number; z: number; radius: number }[]
  >([]);
  const [decorationsList, setDecorationsList] = useState<
    { x: number; z: number }[]
  >([]);
  const [waterAreas] = useState<
    { x: number; z: number; width: number; height: number }[]
  >([{ x: -15, z: 22, width: 50, height: 40 }]);

  const setupAudio = () => {
    audioRef.current = new Audio("/village.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    const startMusic = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }
      document.removeEventListener("click", startMusic);
      document.removeEventListener("keydown", startMusic);
    };

    document.addEventListener("click", startMusic);
    document.addEventListener("keydown", startMusic);
  };

  const checkCollision = (newX: number, newZ: number): boolean => {
    for (const obj of collisionObjectsRef.current) {
      const dx = newX - obj.x;
      const dz = newZ - obj.z;
      const distance = Math.sqrt(dx * dx + dz * dz);
      if (distance < obj.radius + 0.4) return true;
    }
    return false;
  };

  const updateMovement = () => {
    if (!cameraRef.current) return;

    const now = performance.now();
    let delta = Math.min(0.033, (now - lastTimeRef.current) / 1000);
    lastTimeRef.current = now;

    const actualSpeed = 5 * delta;
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    cameraRef.current.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(new THREE.Vector3(0, 1, 0), forward);
    right.normalize();

    let moveDelta = new THREE.Vector3(0, 0, 0);
    const isMoving =
      keyStateRef.current.w ||
      keyStateRef.current.s ||
      keyStateRef.current.a ||
      keyStateRef.current.d;

    if (keyStateRef.current.w) moveDelta.add(forward);
    if (keyStateRef.current.s) moveDelta.sub(forward);
    if (keyStateRef.current.d) moveDelta.sub(right);
    if (keyStateRef.current.a) moveDelta.add(right);

    if (moveDelta.length() > 0) {
      moveDelta.normalize();
      moveDelta.multiplyScalar(actualSpeed);

      let newX = cameraRef.current.position.x + moveDelta.x;
      if (!checkCollision(newX, cameraRef.current.position.z))
        cameraRef.current.position.x = newX;

      let newZ = cameraRef.current.position.z + moveDelta.z;
      if (!checkCollision(cameraRef.current.position.x, newZ))
        cameraRef.current.position.z = newZ;
    }

    if (isMoving && isPointerLock) {
      bobTimeRef.current += delta * 10;
      cameraRef.current.position.y = 1.2 + Math.sin(bobTimeRef.current) * 0.015;
    } else {
      bobTimeRef.current = 0;
      cameraRef.current.position.y = 1.2;
    }
  };

  const loadVillage2Buildings = () => {
    const loader = new GLTFLoader();
    VILLAGE2_BUILDINGS.forEach((building) => {
      loader.load(
        `/medieval-village-2/${building.path}`,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(building.x, building.yOffset || -0.2, building.z);
          model.scale.set(building.scale *2, building.scale * 2, building.scale *2);
          if (building.rotation) model.rotation.y = building.rotation;
          model.castShadow = true;
          sceneRef.current?.add(model);
          if (building.collisionRadius) {
            collisionObjectsRef.current.push({
              x: building.x,
              z: building.z,
              radius: building.collisionRadius,
            });
          }
        },
        undefined,
        (error) => console.error(`Failed to load ${building.path}:`, error),
      );
    });
  };

  const loadVillage2Decorations = () => {
    const loader = new GLTFLoader();
    VILLAGE2_DECORATIONS.forEach((decoration) => {
      loader.load(
        `/medieval-village-2/${decoration.path}`,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(
            decoration.x,
            decoration.yOffset || -0.2,
            decoration.z,
          );
          model.scale.set(decoration.scale, decoration.scale, decoration.scale);
          if (decoration.rotation) model.rotation.y = decoration.rotation;
          model.castShadow = true;
          sceneRef.current?.add(model);
        },
        undefined,
        (error) => console.error(`Failed to load ${decoration.path}:`, error),
      );
    });
  };

  const createConnectingPath = () => {
    const pathMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b7355,
      roughness: 0.8,
    });

    for (let t = 0; t <= 1; t += 0.03) {
      const x = -100 + t * 100;
      const z = 30 - t * 30;
      const pathPiece = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 3),
        pathMaterial,
      );
      pathPiece.rotation.x = -Math.PI / 2;
      pathPiece.position.set(x, -0.15, z);
      pathPiece.receiveShadow = true;
      sceneRef.current?.add(pathPiece);
    }

    for (let t = 0; t <= 1; t += 0.05) {
      const x = t * 80;
      const z = t * 60;
      const pathPiece = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 3),
        pathMaterial,
      );
      pathPiece.rotation.x = -Math.PI / 2;
      pathPiece.position.set(x, -0.15, z);
      pathPiece.receiveShadow = true;
      sceneRef.current?.add(pathPiece);
    }
  };

  const initScene = () => {
    if (!containerRef.current) return;

    const scene = createScene();
    const camera = createCamera(containerRef.current);
    const renderer = createRenderer(containerRef.current);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    setupLighting(scene);
    createGround(scene);
    createWater(scene);
    createPortArea(scene);
    createPath(scene);

    const buildingData = loadBuildings(scene, collisionObjectsRef.current);
    setBuildingsList(
      buildingData.map((b) => ({ x: b.x, z: b.z, radius: b.radius })),
    );

    const decorationData = loadDecorations(scene);
    setDecorationsList(decorationData.map((d) => ({ x: d.x, z: d.z })));

    loadVillage2Buildings();
    loadVillage2Decorations();
    createConnectingPath();

    const treePositions = createTrees(scene, collisionObjectsRef.current);
    setTreesData(treePositions);
  };

  useEffect(() => {
    initScene();
    setupAudio();

    if (!cameraRef.current || !rendererRef.current || !containerRef.current)
      return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          keyStateRef.current.w = true;
          break;
        case "KeyA":
          keyStateRef.current.a = true;
          break;
        case "KeyS":
          keyStateRef.current.s = true;
          break;
        case "KeyD":
          keyStateRef.current.d = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          keyStateRef.current.w = false;
          break;
        case "KeyA":
          keyStateRef.current.a = false;
          break;
        case "KeyS":
          keyStateRef.current.s = false;
          break;
        case "KeyD":
          keyStateRef.current.d = false;
          break;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (
        document.pointerLockElement === rendererRef.current?.domElement &&
        cameraRef.current
      ) {
        mouseStateRef.current.x += e.movementX * 0.002;
        mouseStateRef.current.y += e.movementY * 0.002;
        mouseStateRef.current.y = Math.max(
          -Math.PI / 2.2,
          Math.min(Math.PI / 2.2, mouseStateRef.current.y),
        );
        rotationStateRef.current.yaw = mouseStateRef.current.x;
        rotationStateRef.current.pitch = mouseStateRef.current.y;
        cameraRef.current.rotation.order = "YXZ";
        cameraRef.current.rotation.y = rotationStateRef.current.yaw;
        cameraRef.current.rotation.x = rotationStateRef.current.pitch;
      }
    };

    const handleClick = () => {
      rendererRef.current?.domElement.requestPointerLock();
      setIsPointerLock(true);
    };

    const handlePointerLockChange = () => {
      if (document.pointerLockElement !== rendererRef.current?.domElement) {
        setIsPointerLock(false);
      }
    };

    rendererRef.current.domElement.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    const animate = () => {
      updateMovement();

      if (cameraRef.current && minimapRef.current) {
        minimapRef.current.updatePosition(
          cameraRef.current.position.x,
          cameraRef.current.position.z,
          cameraRef.current.rotation.y,
        );
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    handleResize();

    const crosshair = createCrosshair(containerRef.current);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      if (rendererRef.current?.domElement) {
        rendererRef.current.domElement.removeEventListener(
          "click",
          handleClick,
        );
      }
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        containerRef.current.removeChild(crosshair);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      {/* Game Canvas - takes full width */}
      <div className="flex-1 relative">
        <div
          ref={containerRef}
          className="w-full h-full relative"
          style={{ position: "relative" }}
        >
          <MiniMap
            ref={minimapRef}
            trees={treesData}
            buildings={buildingsList}
            decorations={decorationsList}
            secondVillagePosition={{ x: 80, z: 60 }}
          />
        </div>
      </div>

      {/* Instructions Panel - fixed width on the right */}
      <div className="w-80 bg-black/80 backdrop-blur-md border-l border-white/20 p-5 flex flex-col overflow-y-auto">
        <div className="mb-6">
          <h2 className="font-poppins text-xl font-bold text-white mb-2">
            Controls
          </h2>
          <div className="space-y-3 text-gray-300 font-inter text-sm">
            <div className="flex justify-between items-center">
              <span>Move Forward / Backward</span>
              <kbd className="px-3 py-1 bg-white/10 rounded text-xs">W / S</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span>Strafe Left / Right</span>
              <kbd className="px-3 py-1 bg-white/10 rounded text-xs">A / D</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span>Look Around</span>
              <kbd className="px-3 py-1 bg-white/10 rounded text-xs">Mouse</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span>Lock / Unlock Cursor</span>
              <kbd className="px-3 py-1 bg-white/10 rounded text-xs">
                Click / ESC
              </kbd>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-poppins font-semibold text-white text-sm mb-2">
            Locations
          </h3>
          <div className="space-y-2 text-gray-400 font-inter text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-f1c40f rounded-sm" />
              <span>Village 1 (Starting Area)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-9b59b6 rounded-sm" />
              <span>Village 2 (Far East)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-4B8BBe rounded-sm" />
              <span>Port & Harbor</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-poppins font-semibold text-white text-sm mb-2">
            Map Legend
          </h3>
          <div className="space-y-2 text-gray-400 font-inter text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-3a7d2c rounded-full" />
              <span>Trees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-c46a3a" />
              <span>Buildings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-ff4444" />
              <span>Your Position</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
          <p className="text-gray-500 text-xs font-inter text-center">
            Medieval Village Explorer
          </p>
        </div>
      </div>
    </div>
  );
}
