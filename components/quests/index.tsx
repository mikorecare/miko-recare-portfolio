"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

import { setupMonsters } from "./monsters";
import type { MonsterController } from "@/monsters_modules/monster.controller";
import DialogBox from "@/app/medieval-village/ui/dialog-box";
import { checkPortalWarp, animatePortals } from "./dungeon-builder";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CharacterLoader } from "./character-loader";
import {
  getNearbyTechSign,
  getDialogForTechSign,
  markTechSignTriggered,
} from "./tech-stacks";
import ControlsBar from "./control-bar";

export default function DungeonExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeDialog, setActiveDialog] = useState<{
    name: string;
    dialog: string;
  } | null>(null);
  const controlsRef = useRef<ReturnType<typeof setupControls> | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const playerRef = useRef<THREE.Object3D | null>(null);
  const characterLoaderRef = useRef<CharacterLoader | null>(null);
  const isActiveRef = useRef(false);
  const monsterControllerRef = useRef<MonsterController | null>(null);
  const lastDialogTriggerRef = useRef<number>(0);
  const lastWarpTriggerRef = useRef<number>(0); // Track last warp trigger time
  const lastTechSignTriggerRef = useRef<number>(0);
  const router = useRouter();
  const [showWarpPrompt, setShowWarpPrompt] = useState<{
    type: "start" | "end";
    onConfirm: () => void;
  } | null>(null);
  const isGameReadyRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const isMountedRef = useRef(true);

  const handleActionKey = useCallback(
    (action: string) => {
      if (!isGameReadyRef.current || !playerRef.current || activeDialog) return;

      const now = Date.now();
      if (now - lastDialogTriggerRef.current < 1000) return;

      // Check for nearby tech sign first
      const nearbySign = getNearbyTechSign(playerRef.current.position, 4);
      if (nearbySign && !nearbySign.hasBeenTriggered) {
        const dialog = getDialogForTechSign(nearbySign);
        if (dialog) {
          setActiveDialog(dialog);
          markTechSignTriggered(nearbySign);
          lastDialogTriggerRef.current = now;
          return;
        }
      }

      // If no sign, check for nearby monster
      const nearbyMonster = getNearbyStoryMonster(
        playerRef.current.position,
        5,
      );
      if (nearbyMonster && !nearbyMonster.hasBeenTriggered) {
        const dialog = getDialogForMonster(nearbyMonster);
        if (dialog) {
          setActiveDialog(dialog);
          markMonsterTriggered(nearbyMonster);
          lastDialogTriggerRef.current = now;
        }
      }
    },
    [activeDialog, isGameReadyRef, playerRef],
  );

  // Cleanup function
  const cleanupGame = () => {
    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Exit pointer lock if active
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    // Cleanup controls
    if (controlsRef.current) {
      controlsRef.current.cleanup();
      controlsRef.current = null;
    }

    // Cleanup monster controller
    if (monsterControllerRef.current) {
      monsterControllerRef.current.cleanup();
      monsterControllerRef.current = null;
    }

    // Cleanup character loader (if it has cleanup method)
    if (characterLoaderRef.current) {
      if (typeof characterLoaderRef.current.dispose === "function") {
        characterLoaderRef.current.dispose();
      }
      characterLoaderRef.current = null;
    }

    // Remove renderer from DOM
    if (rendererRef.current && containerRef.current) {
      const canvas = rendererRef.current.domElement;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    // Clear scene references
    if (sceneRef.current) {
      sceneRef.current.clear();
      sceneRef.current = null;
    }

    // Clear player reference
    playerRef.current = null;
    cameraRef.current = null;
  };

  useEffect(() => {
    const handlePointerLockChange = () => {
      if (isActiveRef.current && !document.pointerLockElement) {
        setTimeout(() => {
          if (!document.pointerLockElement && isMountedRef.current) {
            setIsActive(false);
            isActiveRef.current = false;
          }
        }, 200);
      }
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
    };
  }, []);

  const showWarpPromptWithExit = (
    type: "start" | "end",
    onConfirm: () => void,
  ) => {
    if (document.pointerLockElement) {
      document.exitPointerLock();
      setIsActive(false);
      isActiveRef.current = false;
    }
    setShowWarpPrompt({ type, onConfirm });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset state on remount
    isMountedRef.current = true;
    isGameReadyRef.current = false;

    // Clean up any existing game instances
    cleanupGame();

    const loadingSteps: Promise<void>[] = [];

    // Clear container
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Update loading progress
    const updateProgress = (increment: number) => {
      if (isMountedRef.current) {
        setLoadingProgress((prev) => Math.min(prev + increment, 90));
      }
    };

    // Initialize scene and renderer (synchronous)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.008);
    sceneRef.current = scene;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);
    updateProgress(5);

    // Setup lighting (synchronous)
    setupLighting(scene);
    updateProgress(5);

    // Build dungeon (synchronous)
    buildDungeon(scene);
    updateProgress(10);

    // Setup monsters (synchronous but may load assets)
    const monsterController = setupMonsters(scene, camera);
    monsterControllerRef.current = monsterController;
    updateProgress(10);

    // Load story monsters (async - loads GLB models)
    const storyMonstersPromise = loadStoryMonsters(
      scene,
      monsterController,
    ).then(() => {
      if (isMountedRef.current) updateProgress(20);
    });
    loadingSteps.push(storyMonstersPromise);

    // Load character (async - loads GLB model)
    const characterLoader = new CharacterLoader();
    characterLoaderRef.current = characterLoader;

    const characterPromise = characterLoader
      .loadCharacter("/characters/Rabbit Grey.glb", scene, 0.3)
      .then((rabbit) => {
        if (isMountedRef.current && rabbit) {
          rabbit.position.set(-3, 0, -115);
          playerRef.current = rabbit;
          monsterController.setPlayer(rabbit);
          updateProgress(25);
        }
      });
    loadingSteps.push(characterPromise);

    // Setup controls (synchronous but depends on player being ready)
    const controls = setupControls(
      camera,
      playerRef,
      characterLoaderRef,
      isActiveRef,
      handleActionKey,
    );
    controlsRef.current = controls;
    updateProgress(5);

    // Wait for all async loading to complete
    Promise.all(loadingSteps)
      .then(() => {
        if (isMountedRef.current) {
          setLoadingProgress(100);
          isGameReadyRef.current = true;
          // Small delay to show 100% before hiding
          setTimeout(() => {
            if (isMountedRef.current) {
              setIsLoading(false);
            }
          }, 500);
        }
      })
      .catch((error) => {
        console.error("Error loading game assets:", error);
        if (isMountedRef.current) {
          isGameReadyRef.current = true;
          setTimeout(() => {
            if (isMountedRef.current) {
              setIsLoading(false);
            }
          }, 1000);
        }
      });

    let lastTime = performance.now();

    function animate() {
      if (!isMountedRef.current) return;

      const now = performance.now();
      const delta = Math.min(1 / 30, (now - lastTime) / 1000);
      lastTime = now;

      // Always update game logic once loading is complete OR player is ready
      if (isGameReadyRef.current && controlsRef.current) {
        controlsRef.current.update(delta);
      }

      if (isGameReadyRef.current && monsterControllerRef.current) {
        monsterControllerRef.current.update(delta);
      }

      animatePortals(delta);

      // Check for warp with debounce cooldown
      if (
        isGameReadyRef.current &&
        playerRef.current &&
        !activeDialog &&
        !showWarpPrompt
      ) {
        const now = Date.now();
        // Only check warp if enough time has passed since last warp trigger (3 seconds cooldown)
        if (now - lastWarpTriggerRef.current > 3000) {
          checkPortalWarp(
            playerRef.current.position,
            () => {
              lastWarpTriggerRef.current = now;
              showWarpPromptWithExit("start", () => {
                setShowWarpPrompt(null);
                router.push("/");
              });
            },
            () => {
              lastWarpTriggerRef.current = now;
              showWarpPromptWithExit("end", () => {
                setShowWarpPrompt(null);
                router.push("/medieval-village");
              });
            },
          );
        }
      }

      animateSun(0.002);

      if (rendererRef.current && cameraRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      if (!isMountedRef.current) return;

      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener("resize", handleResize);
      cleanupGame();
    };
  }, [router]);

  useEffect(() => {
    if (!showWarpPrompt) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.code === "Enter") {
        showWarpPrompt.onConfirm();
      } else if (e.code === "Space") {
        setShowWarpPrompt(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showWarpPrompt]);

  const handleStart = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas || !controlsRef.current) return;

    // Only proceed if game is ready
    if (!isGameReadyRef.current) {
      console.log("Game still loading, please wait...");
      return;
    }

    // Don't allow multiple start attempts
    if (isActiveRef.current) return;

    setTimeout(() => {
      if (isMountedRef.current && controlsRef.current) {
        isActiveRef.current = true;
        setIsActive(true);
        controlsRef.current?.requestPointerLock(canvas);
      }
    }, 100);
  };

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  const handleConfirmWarp = () => {
    if (!showWarpPrompt) return;

    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setIsActive(false);
    isActiveRef.current = false;
    showWarpPrompt.onConfirm();
  };

  const handleCancelWarp = () => {
    setShowWarpPrompt(null);
    // Reset the last warp trigger so player can move away
    lastWarpTriggerRef.current = Date.now();
    // Optional: Add a small teleport to move player slightly away from the portal
    if (playerRef.current) {
      // Push player back slightly to exit portal trigger zone
      const pushBack = playerRef.current.position.z - 2;
      playerRef.current.position.z = Math.max(pushBack, -96);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      <DialogBox monster={activeDialog} onClose={handleCloseDialog} />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-30">
          <div className="text-center min-w-[300px]">
            {/* Animated loading spinner */}
            <div className="w-16 h-16 border-4 border-amber-700 border-t-amber-400 rounded-full animate-spin mx-auto mb-6" />

            {/* Progress bar */}
            <div className="w-64 h-2 bg-amber-900/50 rounded-full overflow-hidden mx-auto mb-4">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            {/* Loading text */}
            <p className="text-amber-400 font-masonic text-sm mb-2">
              {loadingProgress < 30 && "Summoning the dungeon..."}
              {loadingProgress >= 30 &&
                loadingProgress < 60 &&
                "Awakening ancient creatures..."}
              {loadingProgress >= 60 &&
                loadingProgress < 90 &&
                "Preparing your journey..."}
              {loadingProgress >= 90 && "Almost ready..."}
            </p>

            {/* Percentage */}
            <p className="text-amber-500/60 font-masonic text-xs">
              {Math.floor(loadingProgress)}%
            </p>
          </div>
        </div>
      )}

      {!isActive && !isLoading && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="absolute inset-4 border-2 border-amber-700/50 rounded-2xl pointer-events-none" />
          <div className="absolute inset-8 border border-amber-500/30 rounded-xl pointer-events-none" />

          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-masonic text-amber-400 text-5xl tracking-wider drop-shadow-lg">
                QUEST EXPLORER
              </h1>
              <div className="w-48 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
              <p className="font-masonic text-amber-500/80 text-sm tracking-widest">
                A MEDIEVAL QUEST OF MYSELF
              </p>
            </div>

            <div className="text-amber-600 text-6xl animate-pulse">⚔️</div>

            <button
              onClick={handleStart}
              className="group relative px-8 py-3 rounded-lg font-masonic text-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white shadow-lg hover:shadow-amber-700/50"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>◀</span>
                <span>ENTER MY WORLD</span>
                <span>▶</span>
              </span>
              <div className="absolute inset-0 rounded-lg bg-amber-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>

            <div className="space-y-1 pt-4">
              <p className="font-masonic text-amber-400/60 text-xs tracking-wider">
                WASD to move • Mouse to look around
              </p>
              <p className="font-masonic text-amber-500/40 text-[10px] tracking-wider">
                Approach monsters to uncover their stories
              </p>
            </div>

            <div className="pt-4">
              <div className="w-64 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent mx-auto" />
            </div>
          </div>
        </div>
      )}

      {showWarpPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 pointer-events-auto">
          <div className="bg-black/90 backdrop-blur-md rounded-2xl p-8 border-2 border-cyan-500 shadow-2xl max-w-md justify-center items-center text-center">
            <Image
              src={
                showWarpPrompt.type === "start"
                  ? "/buttons/enter-the-keep.png"
                  : "/buttons/explore-the-village.png"
              }
              alt="Portal"
              width={200}
              height={200}
              className="w-48 h-48 object-contain"
              loading="eager"
            />
            <p className="font-reactor7 text-cyan-100 text-lg mb-6">
              {showWarpPrompt.type === "start"
                ? "Are you sure you want to leave this adventure and return to the keep?"
                : "Step through the portal to explore the Medieval Village?"}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCancelWarp}
                className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
              >
                Cancel [SPACE]
              </button>
              <button
                onClick={handleConfirmWarp}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                Confirm [ENTER]
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-amber-400 text-xs bg-black/50 px-3 py-1 rounded z-10 pointer-events-none">
        WASD to move | Mouse to look around | Approach monsters to talk
      </div>

      <ControlsBar />
    </div>
  );
}
