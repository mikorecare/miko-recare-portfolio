"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function MonsterTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMonster, setSelectedMonster] = useState("Dragon.glb");
  const [isLoading, setIsLoading] = useState(false);

  const monstersList = [
    "Dragon.glb",
    "Demon.glb",
    "Orc.glb",
    "Wizard.glb",
    "Yeti.glb",
    "Ninja.glb",
    "Alien.glb",
    "Ghost.glb",
    "Cat.glb",
    "Chicken.glb",
    "Frog.glb",
    "Bunny.glb",
    "Dino.glb",
    "Blue Demon.glb",
    "Pink Blob.glb",
    "Green Blob.glb",
    "Squidle.glb",
    "Tribal.glb",
    "Birb.glb",
    "Fish.glb",
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a2a);
    scene.fog = new THREE.Fog(0x0a0a2a, 30, 80);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(5, 3, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 600);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Controls for third-person view
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.enableZoom = true;
    controls.zoomSpeed = 1.2;
    controls.target.set(0, 1, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0x404060, 0.6));

    const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    mainLight.receiveShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0x4466ff, 0.4);
    fillLight.position.set(0, 3, 0);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xffaa66, 0.3);
    backLight.position.set(0, 2, -3);
    scene.add(backLight);

    // Ground with grid
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d5a2d,
      roughness: 0.8,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(30, 20, 0x88aaff, 0x335588);
    gridHelper.position.y = -0.4;
    scene.add(gridHelper);

    // Add some trees/rocks as environment
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.9,
    });
    for (let i = 0; i < 30; i++) {
      const rock = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.2 + Math.random() * 0.3),
        rockMaterial,
      );
      const angle = Math.random() * Math.PI * 2;
      const radius = 8 + Math.random() * 12;
      rock.position.x = Math.cos(angle) * radius;
      rock.position.z = Math.sin(angle) * radius;
      rock.position.y = -0.3;
      rock.scale.set(1, Math.random() * 0.5 + 0.5, 1);
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
    }

    // Current monster model
    let currentMonster: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let clock = new THREE.Clock();

    const loader = new GLTFLoader();

    const loadMonster = (monsterPath: string) => {
      setIsLoading(true);

      if (currentMonster) {
        scene.remove(currentMonster);
        if (mixer) {
          mixer.stopAllAction();
          mixer = null;
        }
      }

      const fullPath = `/monsters/${monsterPath}`;
      console.log(`Loading monster: ${fullPath}`);

      loader.load(
        fullPath,
        (gltf) => {
          console.log(`✅ Loaded: ${monsterPath}`);
          currentMonster = gltf.scene;
          currentMonster.position.set(0, 0, 0);
          currentMonster.scale.set(1, 1, 1);
          currentMonster.castShadow = true;
          currentMonster.receiveShadow = true;

          // Adjust scale for different monsters
          if (monsterPath.includes("Dragon"))
            currentMonster.scale.set(0.8, 0.8, 0.8);
          if (monsterPath.includes("Yeti"))
            currentMonster.scale.set(0.7, 0.7, 0.7);
          if (monsterPath.includes("Orc"))
            currentMonster.scale.set(0.9, 0.9, 0.9);
          if (monsterPath.includes("Fish"))
            currentMonster.scale.set(1.2, 1.2, 1.2);

          // Play animation if available
          if (gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(currentMonster);
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
            console.log(`Playing animation: ${gltf.animations[0].name}`);
          }

          scene.add(currentMonster);
          setIsLoading(false);

          // Update controls target
          controls.target.set(0, 1.5, 0);
        },
        (progress) => {
          console.log(
            `Loading: ${Math.round((progress.loaded / progress.total) * 100)}%`,
          );
        },
        (error) => {
          console.error(`Failed to load ${monsterPath}:`, error);
          // Create fallback monster
          const fallbackMonster = new THREE.Group();
          const body = new THREE.Mesh(
            new THREE.SphereGeometry(0.6, 32, 32),
            new THREE.MeshStandardMaterial({
              color: 0xff6600,
              emissive: 0x331100,
            }),
          );
          fallbackMonster.add(body);
          const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 32, 32),
            new THREE.MeshStandardMaterial({ color: 0xff8844 }),
          );
          head.position.y = 0.8;
          fallbackMonster.add(head);
          scene.add(fallbackMonster);
          currentMonster = fallbackMonster;
          setIsLoading(false);
        },
      );
    };

    // Load default monster
    loadMonster(selectedMonster);

    // Simple animation for idle movement
    let time = 0;

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      // Idle floating animation for monster
      if (currentMonster && !isLoading) {
        time += 0.01;
        currentMonster.position.y = Math.sin(time) * 0.05;
        currentMonster.rotation.y = Math.sin(time * 0.5) * 0.1;
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [selectedMonster]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 3D View */}
          <div className="lg:col-span-3">
            <div className="bg-black/50 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <div ref={containerRef} className="w-full aspect-video" />
            </div>
            <div className="mt-4 text-center text-white/70 text-sm">
              🖱️ Drag to rotate | Right-click to pan | Scroll to zoom
            </div>
          </div>

          {/* Monster Selection Panel */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="font-poppins text-xl font-bold text-white mb-4 flex items-center gap-2">
              🎮 Select Monster
            </h2>

            {isLoading && (
              <div className="text-center py-4">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-white/70 text-sm">Loading monster...</p>
              </div>
            )}

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {monstersList.map((monster) => (
                <button
                  key={monster}
                  onClick={() => setSelectedMonster(monster)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                    selectedMonster === monster
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  <span className="font-inter text-sm">
                    {monster.replace(".glb", "")}
                  </span>
                  {selectedMonster === monster && (
                    <span className="text-xs">✅</span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-white/60 text-xs font-inter space-y-1">
                <p>💡 Tips:</p>
                <p>• Drag mouse to orbit camera</p>
                <p>• Scroll to zoom in/out</p>
                <p>• Monsters have idle animations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/50 text-sm font-inter">
            🎮 {monstersList.length} monsters available | Click any monster to
            load it in 3D
          </p>
        </div>
      </div>
    </div>
  );
}
