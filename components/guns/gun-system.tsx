"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface GunSystemProps {
  camera: THREE.Camera;
  scene: THREE.Scene;
}

export default function GunSystem({ camera, scene }: GunSystemProps) {
  const [currentGun, setCurrentGun] = useState(0);
  const gunModelRef = useRef<THREE.Group | null>(null);
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
    const loader = new GLTFLoader();

    // Load the current gun model
    const loadGun = () => {
      // Remove existing gun model
      if (gunModelRef.current) {
        scene.remove(gunModelRef.current);
      }

      const gunPath = `/guns/${gunsList[currentGun]}`;

      loader.load(
        gunPath,
        (gltf) => {
          const model = gltf.scene;

          // Position the gun in first-person view
          model.position.set(0.3, -0.3, -0.5);
          model.rotation.set(0, 0, 0);
          model.scale.set(0.5, 0.5, 0.5);

          // Attach to camera
          camera.add(model);
          gunModelRef.current = model;
        },
        (progress) => {
          console.log(
            "Loading progress:",
            (progress.loaded / progress.total) * 100,
            "%",
          );
        },
        (error) => {
          console.error("Error loading gun model:", error);
        },
      );
    };

    loadGun();

    // Cleanup
    return () => {
      if (gunModelRef.current) {
        camera.remove(gunModelRef.current);
      }
    };
  }, [currentGun, camera, scene]);

  // Handle gun switching
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Number keys 1-9 for switching guns
      if (e.code >= "Digit1" && e.code <= "Digit9") {
        const index = parseInt(e.code.replace("Digit", "")) - 1;
        if (index < gunsList.length) {
          setCurrentGun(index);
        }
      }
      // Next gun (N key)
      if (e.code === "KeyN") {
        setCurrentGun((prev) => (prev + 1) % gunsList.length);
      }
      // Previous gun (P key)
      if (e.code === "KeyP") {
        setCurrentGun((prev) => (prev - 1 + gunsList.length) % gunsList.length);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gunsList.length]);

  return null; // This component doesn't render anything, just manages the 3D gun
}
