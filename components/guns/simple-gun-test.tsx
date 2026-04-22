"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function SimpleGunTest() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Simple setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111122);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 1, 2);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    // Add a reference cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
    );
    cube.position.set(0, 0, 0);
    scene.add(cube);

    // Try to load a gun
    const loader = new GLTFLoader();
    loader.load(
      "/guns/MDR.glb",
      (gltf) => {
        console.log("GUN LOADED IN TEST!");
        const gun = gltf.scene;
        gun.position.set(0.5, -0.3, -0.5);
        gun.scale.set(1, 1, 1);
        camera.add(gun);
        console.log("Gun added to camera");
      },
      undefined,
      (error) => {
        console.error("Test failed to load gun:", error);
        // Add a red cube as fallback
        const fallback = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.3, 0.8),
          new THREE.MeshStandardMaterial({ color: 0xff0000 }),
        );
        fallback.position.set(0.5, -0.3, -0.5);
        camera.add(fallback);
      },
    );

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div
        ref={containerRef}
        className="bg-black rounded-lg overflow-hidden shadow-2xl border-2 border-white"
      />
      <div className="text-center mt-2 text-white text-xs">
        Gun Test - Should see gun or red cube
      </div>
    </div>
  );
}
