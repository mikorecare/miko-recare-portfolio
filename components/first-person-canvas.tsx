"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import WeaponHUD from "./guns/weapon-hud";

export default function FirstPersonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentGunIndex, setCurrentGunIndex] = useState(0);
  const gunModelRef = useRef<THREE.Object3D | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const gunsList = [
    "M21 EBR.glb",
    "MDR.glb",
    "MK14.glb",
    "Mpa.glb",
    "Mpsd.glb",
    "MPX.glb",
    "P226.glb",
    "P320.glb",
    "Precision Rifle Chassis.glb",
    "Revolver-AnsEmKwuu7.glb",
    "Revolver.glb",
    "RPG Launcher.glb",
    "SR1MP.glb",
    "SRSA1.glb",
  ];

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.Fog(0x1a1a2e, 100, 200);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.01,
      1000,
    );
    camera.position.y = 1.6;
    camera.position.x = 0;
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.PointLight(0x4466ff, 0.5);
    fillLight.position.set(0, 2, 2);
    scene.add(fillLight);

    // Simple ground
    const gridHelper = new THREE.GridHelper(100, 20, 0x888888, 0x444444);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d5a2d,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Movement
    const keyState = { w: false, a: false, s: false, d: false };
    let mouseX = 0;
    let mouseY = 0;
    let yaw = -Math.PI / 2;
    let pitch = 0;
    const speed = 8;
    const mouseSpeed = 0.002;

    // Load gun function
    const loader = new GLTFLoader();

    const loadGun = (gunIndex: number) => {
      if (gunModelRef.current && cameraRef.current) {
        cameraRef.current.remove(gunModelRef.current);
        gunModelRef.current = null;
      }

      const gunPath = `/guns/${gunsList[gunIndex]}`;
      console.log("Loading:", gunPath);

      loader.load(
        gunPath,
        (gltf) => {
          console.log("Loaded:", gunsList[gunIndex]);
          const model = gltf.scene;

          // Position the gun for first-person view
          model.position.set(0.5, -0.35, -0.7);
          model.rotation.set(0.05, 0.1, 0.02);
          model.scale.set(1.2, 1.2, 1.2);

          // Add a light to make it visible
          const light = new THREE.PointLight(0xffaa66, 0.8);
          light.position.set(0, 0, 0);
          model.add(light);

          if (cameraRef.current) {
            cameraRef.current.add(model);
            gunModelRef.current = model;
          }

          console.log("Gun added to camera at position:", model.position);
        },
        (progress) => {
          console.log(
            "Progress:",
            Math.round((progress.loaded / progress.total) * 100),
            "%",
          );
        },
        (error) => {
          console.error("Error:", error);
          // Add visible fallback
          if (cameraRef.current) {
            const fallback = new THREE.Mesh(
              new THREE.BoxGeometry(0.5, 0.3, 1.0),
              new THREE.MeshStandardMaterial({
                color: 0xff3333,
                emissive: 0x331100,
              }),
            );
            fallback.position.set(0.5, -0.35, -0.7);
            cameraRef.current.add(fallback);
            gunModelRef.current = fallback;
          }
        },
      );
    };

    // Load first gun
    setTimeout(() => loadGun(currentGunIndex), 500);

    // Event handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          keyState.w = true;
          break;
        case "KeyA":
          keyState.a = true;
          break;
        case "KeyS":
          keyState.s = true;
          break;
        case "KeyD":
          keyState.d = true;
          break;
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8":
        case "Digit9":
          const index = parseInt(e.code.replace("Digit", "")) - 1;
          if (index < gunsList.length) setCurrentGunIndex(index);
          break;
        case "KeyN":
          setCurrentGunIndex((prev) => (prev + 1) % gunsList.length);
          break;
        case "KeyP":
          setCurrentGunIndex(
            (prev) => (prev - 1 + gunsList.length) % gunsList.length,
          );
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          keyState.w = false;
          break;
        case "KeyA":
          keyState.a = false;
          break;
        case "KeyS":
          keyState.s = false;
          break;
        case "KeyD":
          keyState.d = false;
          break;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement === canvas) {
        mouseX += e.movementX * mouseSpeed;
        mouseY += e.movementY * mouseSpeed;
        mouseY = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, mouseY));
        yaw = mouseX;
        pitch = mouseY;
        camera.rotation.order = "YXZ";
        camera.rotation.y = yaw;
        camera.rotation.x = pitch;
      }
    };

    const handleCanvasClick = () => canvas.requestPointerLock();

    canvas.addEventListener("click", handleCanvasClick);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousemove", handleMouseMove);

    // Reload gun on index change
    let prevIndex = currentGunIndex;
    const interval = setInterval(() => {
      if (prevIndex !== currentGunIndex) {
        prevIndex = currentGunIndex;
        loadGun(currentGunIndex);
      }
    }, 100);

    // Animation
    let lastTime = performance.now();

    const animate = () => {
      const now = performance.now();
      let delta = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;

      const actualSpeed = speed * delta;
      const forward = new THREE.Vector3();
      const right = new THREE.Vector3();

      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();
      right.crossVectors(new THREE.Vector3(0, 1, 0), forward);
      right.normalize();

      let moveDelta = new THREE.Vector3(0, 0, 0);
      if (keyState.w) moveDelta.add(forward);
      if (keyState.s) moveDelta.sub(forward);
      if (keyState.d) moveDelta.add(right);
      if (keyState.a) moveDelta.sub(right);
      moveDelta.multiplyScalar(actualSpeed);
      camera.position.add(moveDelta);

      camera.position.x = Math.max(-45, Math.min(45, camera.position.x));
      camera.position.z = Math.max(-45, Math.min(45, camera.position.z));

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // Cleanup
    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      clearInterval(interval);
      if (gunModelRef.current && cameraRef.current) {
        cameraRef.current.remove(gunModelRef.current);
      }
      renderer.dispose();
    };
  }, [currentGunIndex]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full block outline-none cursor-crosshair"
        style={{ display: "block" }}
      />
      <WeaponHUD
        currentGun={gunsList[currentGunIndex]}
        ammo={30}
        maxAmmo={30}
      />
    </div>
  );
}
