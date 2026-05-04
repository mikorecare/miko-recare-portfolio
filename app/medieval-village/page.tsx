"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { loadBuildings } from "./components/buildings";
import { loadDecorations } from "./components/decorations";
import { loadVillage2 } from "./components/village2";
import { loadMonsters, updateMonsterAnimations } from "./components/monsters";
import { createGround } from "./components/ground";
import { setupLighting } from "./components/lighting";
import { createPath } from "./components/path";
import {
  createScene,
  createCamera,
  createRenderer,
} from "./components/scene-setup";
import { createTrees } from "./components/trees";
import { createCrosshair } from "./components/ui";
import { createWater } from "./components/water";
import { createPortArea } from "./components/port-area";
import MiniMap from "./components/mini-map";
import DialogBox from "./ui/dialog-box";
import Icon from "@/components/icons";

export default function MedievalVillage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPointerLock, setIsPointerLock] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedMonster, setSelectedMonster] = useState<{
    name: string;
    dialog: string;
  } | null>(null);

  let animationTime = 0;

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const collisionObjectsRef = useRef<
    { x: number; z: number; radius: number }[]
  >([]);
  const animationRef = useRef<number | null>(null);
  const monstersRef = useRef<THREE.Object3D[]>([]);

  const keyStateRef = useRef({ w: false, a: false, s: false, d: false });
  const mouseStateRef = useRef({ x: 0, y: 0 });
  const rotationStateRef = useRef({ yaw: -Math.PI / 2, pitch: 0 });
  const lastTimeRef = useRef(performance.now());
  const bobTimeRef = useRef(0);
  const minimapRef = useRef<{
    updatePosition: (x: number, z: number, rotation: number) => void;
  } | null>(null);

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

  const [showComingSoonModal, setShowComingSoonModal] = useState(true);
  const [timerCountdown, setTimerCountdown] = useState(10);

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
      if (distance < obj.radius + 0.15) return true;
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

  const handleMonsterClick = () => {
    if (!cameraRef.current || !sceneRef.current) return;

    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(cameraRef.current.quaternion);
    raycaster.set(cameraRef.current.position, direction);

    // Set camera for sprite raycasting
    raycaster.camera = cameraRef.current;

    // Collect all clickable monster objects
    const clickableObjects: THREE.Object3D[] = [];
    sceneRef.current.traverse((obj) => {
      if (
        obj.userData?.isMonster === true ||
        obj.parent?.userData?.isMonster === true
      ) {
        clickableObjects.push(obj);
      }
    });

    const intersects = raycaster.intersectObjects(clickableObjects, true);

    if (intersects.length > 0) {
      // Find the monster data by traversing up the parent chain
      let hitObject = intersects[0].object;
      let monsterData = hitObject.userData?.monsterData;

      while (!monsterData && hitObject.parent) {
        hitObject = hitObject.parent;
        monsterData = hitObject.userData?.monsterData;
      }

      if (monsterData) {
        console.log(`Clicked on monster: ${monsterData.name}`);
        setSelectedMonster(monsterData);
      }
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

    // Setup basic environment
    setupLighting(scene);
    createGround(scene);
    createWater(scene);
    createPortArea(scene);
    createPath(scene);

    // Load Village 1 assets
    const buildingData = loadBuildings(scene, collisionObjectsRef.current);
    setBuildingsList(
      buildingData.map((b) => ({ x: b.x, z: b.z, radius: b.radius })),
    );

    const decorationData = loadDecorations(scene);
    setDecorationsList(decorationData.map((d) => ({ x: d.x, z: d.z })));

    // Load Village 2 assets (refactored)
    loadVillage2(scene, collisionObjectsRef.current);

    // Load monsters - PLACE THIS HERE
    const loadedMonsters = loadMonsters(
      scene,
      collisionObjectsRef.current,
      (monster) => setSelectedMonster(monster),
    );
    monstersRef.current = loadedMonsters;

    // Load trees
    const treePositions = createTrees(scene, collisionObjectsRef.current);
    setTreesData(treePositions);
  };

  useEffect(() => {
    if (!showComingSoonModal) return;

    const timer = setInterval(() => {
      setTimerCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showComingSoonModal]);

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
        case "Space":
          e.preventDefault();
          if (selectedMonster) {
            const event = new CustomEvent("dialogNext");
            window.dispatchEvent(event);
          }
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
      handleMonsterClick();
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

      updateMovement();

      // Update animation time
      animationTime += 0.016;

      const delta = Math.min(
        0.033,
        (performance.now() - lastTimeRef.current) / 1000,
      );
      updateMonsterAnimations(delta, animationTime);

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
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-9999 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md border-2 border-amber-700 rounded-lg px-6 py-3 shadow-lg">
          <p className="font-masonic text-amber-400 text-sm tracking-wider flex gap-2">
            <Icon name="blacksmith" /> HEARKEN, TRAVELER! THIS REALM IS STILL
            BEING FORGED IN THE FIRES OF CREATION. <Icon name="blacksmith" />
          </p>
          <p className="font-masonic text-amber-600/80 text-xs tracking-wider text-center mt-1">
            More wonders shall manifest with each passing moon
          </p>
        </div>
      </div>
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
            <div className="flex justify-between items-center">
              <span>Talk to Monsters</span>
              <kbd className="px-3 py-1 bg-white/10 rounded text-xs">
                Click on them
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
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-9b59b6 rounded-full" />
              <span>Monsters (Talk to them!)</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
          <p className="text-gray-500 text-xs font-inter text-center">
            Medieval Village Explorer
          </p>
        </div>
      </div>

      <DialogBox
        monster={selectedMonster}
        onClose={() => setSelectedMonster(null)}
      />

      {showComingSoonModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 border-2 border-amber-700 rounded-lg max-w-md w-full mx-4 p-8 shadow-2xl">
            {/* Decorative corners */}
            <div className="absolute top-2 left-2 text-amber-700/40 text-xl">
              ❧
            </div>
            <div className="absolute top-2 right-2 text-amber-700/40 text-xl">
              ❧
            </div>
            <div className="absolute bottom-2 left-2 text-amber-700/40 text-xl">
              ❦
            </div>
            <div className="absolute bottom-2 right-2 text-amber-700/40 text-xl">
              ❦
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-amber-900/30 border-2 border-amber-700 flex items-center justify-center">
                <span className="text-5xl">🏗️</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-masonic text-2xl text-amber-400 text-center tracking-wider mb-3">
              THE FORGE AWAITS
            </h2>

            {/* Message */}
            <p className="font-masonic text-stone-300 text-center text-sm mb-6">
              This realm is currently being forged in the fires of creation.
              <br />
              <span className="text-amber-600">
                Greater wonders shall manifest soon...
              </span>
            </p>

            {/* Divider */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-700/50"></div>
              <span className="text-amber-700/40 text-xs">✦ ✦ ✦</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-700/50"></div>
            </div>

            {/* Timer */}
            <p className="text-center text-amber-500 font-masonic text-lg mb-4">
              Returning to the keep in{" "}
              <span className="font-bold text-amber-300">{timerCountdown}</span>
              ...
            </p>

            {/* Button */}
            <button
              onClick={() => {
                window.location.href = "/medieval-style";
              }}
              className="w-full py-3 bg-amber-900/40 border-2 border-amber-700 rounded-lg text-amber-400 font-masonic tracking-wider hover:bg-amber-800/60 hover:border-amber-500 transition-all duration-300"
            >
              ⚔ RETURN NOW ⚔
            </button>

            {/* Footer */}
            <p className="text-center text-stone-500 text-[10px] font-masonic mt-4 tracking-wider">
              ~ The ancient codex shall reveal more in time ~
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
