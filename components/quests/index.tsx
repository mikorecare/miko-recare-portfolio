"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { setupLighting } from "./lights";
import { animateSun, buildDungeon } from "./dungeon-builder";
import { setupControls } from "./controls";
import {
  loadStoryMonsters,
  getNearbyStoryMonster,
  getDialogForMonster,
  markMonsterTriggered,
} from "./story-data";
import {
  loadTechStackFloatingBuildings,
  animateFloatingObjects,
} from "./tech-stacks";
import { setupMonsters } from "./monsters";
import type { MonsterController } from "@/monsters_modules/monster.controller";
import DialogBox from "@/app/medieval-village/ui/dialog-box";
import { checkPortalWarp, animatePortals } from "./dungeon-builder";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DungeonExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDialog, setActiveDialog] = useState<{
    name: string;
    dialog: string;
  } | null>(null);
  const controlsRef = useRef<ReturnType<typeof setupControls> | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isActiveRef = useRef(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const monsterControllerRef = useRef<MonsterController | null>(null);
  const lastDialogTriggerRef = useRef<number>(0);
  const router = useRouter();
  const [showWarpPrompt, setShowWarpPrompt] = useState<{
    type: "start" | "end";
    onConfirm: () => void;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.008);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 1.6, -90);
    camera.rotation.order = "YXZ";
    camera.rotation.y = 90;
    camera.rotation.x = 0;
    camera.matrixAutoUpdate = true;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Setup
    setupLighting(scene);
    buildDungeon(scene);

    // Setup monsters
    const monsterController = setupMonsters(scene, camera);
    monsterControllerRef.current = monsterController;

    // Load story monsters (replacing wooden signs)
    loadStoryMonsters(scene, monsterController);

    // Pass the sign position for the tech stack buildings
    loadTechStackFloatingBuildings(scene, { x: -15, y: 0, z: 20 });

    // Simple loading timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Create controls with ref
    const controls = setupControls(camera, isActiveRef);
    controlsRef.current = controls;

    // Animation loop
    let lastTime = performance.now();

    function animate() {
      const now = performance.now();
      const delta = Math.min(1 / 30, (now - lastTime) / 1000);
      lastTime = now;

      controls.update(delta);

      // Update monsters
      if (monsterControllerRef.current) {
        monsterControllerRef.current.update(delta);
      }

      // Animate floating objects
      if (sceneRef.current) {
        animateFloatingObjects(sceneRef.current, delta);
      }
      animatePortals(delta);

      if (cameraRef.current && !activeDialog && !showWarpPrompt) {
        checkPortalWarp(
          cameraRef.current.position,
          () => {
            // Start portal - return to homepage
            setShowWarpPrompt({
              type: "start",
              onConfirm: () => {
                setShowWarpPrompt(null);
                router.push("/");
              },
            });
          },
          () => {
            // End portal - go to medieval village page
            setShowWarpPrompt({
              type: "end",
              onConfirm: () => {
                setShowWarpPrompt(null);
                router.push("/medieval-village");
              },
            });
          },
        );
      }
      // Check for nearby story monsters to trigger dialog
      if (cameraRef.current && !activeDialog) {
        const nearbyMonster = getNearbyStoryMonster(
          cameraRef.current.position,
          5,
        );
        if (nearbyMonster && !nearbyMonster.hasBeenTriggered) {
          const now = Date.now();
          // Debounce dialog triggers
          if (now - lastDialogTriggerRef.current > 1000) {
            const dialog = getDialogForMonster(nearbyMonster);
            if (dialog) {
              setActiveDialog(dialog);
              markMonsterTriggered(nearbyMonster);
              lastDialogTriggerRef.current = now;
            }
          }
        }
      }

      animateSun(0.002);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Spacebar to continue/close dialog
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && activeDialog) {
        // DialogBox handles closing internally
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      controls.cleanup();
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!showWarpPrompt) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        e.preventDefault();
        showWarpPrompt.onConfirm();
      } else if (e.code === "Space") {
        e.preventDefault();
        setShowWarpPrompt(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showWarpPrompt]);

  const handleStart = () => {
    isActiveRef.current = true;
    setIsActive(true);
    const canvas = document.querySelector("canvas");
    if (canvas && controlsRef.current) {
      setTimeout(() => {
        controlsRef.current?.requestPointerLock(canvas);
      }, 100);
    }
  };

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      {/* Dialog Box */}
      <DialogBox monster={activeDialog} onClose={handleCloseDialog} />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-30">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-amber-400 font-masonic text-sm">
              Loading Dungeon...
            </p>
            <p className="text-stone-500 text-xs mt-2 font-masonic">
              Please wait
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handleStart}
        disabled={isLoading}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-6 py-2 rounded-lg font-masonic text-sm transition cursor-pointer ${
          isLoading
            ? "bg-stone-700 text-stone-400 cursor-not-allowed"
            : "bg-amber-700 hover:bg-amber-600 text-white"
        }`}
      >
        {isLoading
          ? "Loading..."
          : isActive
            ? "Active - WASD to move"
            : "Click to Start (WASD to move)"}
      </button>

      {showWarpPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 pointer-events-auto">
          <div className="bg-black/90 backdrop-blur-md rounded-2xl p-8 border-2 border-cyan-500 shadow-2xl max-w-md text-center">
            {/* Portal Image */}
            <div className="flex justify-center mb-1">
              <Image
                src={
                  showWarpPrompt.type === "start"
                    ? "/buttons/enter-the-keep.png"
                    : "/buttons/explore-the-village.png"
                }
                alt={
                  showWarpPrompt.type === "start"
                    ? "Return to Keep"
                    : "Explore Village"
                }
                width={200}
                height={200}
                className="w-48 h-48 object-contain"
              />
            </div>

            <p className="font-reactor7 text-cyan-100 text-lg mb-6">
              {showWarpPrompt.type === "start"
                ? "Are you sure you want to leave this adventure and return to the keep?"
                : "Step through the portal to explore the Medieval Village?"}
            </p>

            <p className="font-reactor7 text-cyan-100 text-md mb-6">
              Move away a bit from the portal to prevent this dialog from re-firing.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowWarpPrompt(null)}
                className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-reactor7 transition-colors"
              >
                Cancel [SPACE]
              </button>
              <button
                onClick={showWarpPrompt.onConfirm}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-reactor7 transition-all duration-200 shadow-lg"
              >
                {showWarpPrompt.type === "start"
                  ? "Enter the Keep"
                  : "Explore Village"}{" "}
                [↵]
              </button>
            </div>

            <div className="mt-4 text-gray-400 font-reactor7 text-xs">
              Press [ENTER] to confirm • [SPACE] to cancel
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-amber-400 text-xs bg-black/50 px-3 py-1 rounded z-10 pointer-events-none">
        WASD to move | Mouse to look around | Approach monsters to talk
      </div>
    </div>
  );
}
