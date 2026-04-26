import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const PATH_START = -96;
const PATH_END = 96;
const PATH_WIDTH = 3.5;

let treeModel: THREE.Group | null = null;
let pineTreeModel: THREE.Group | null = null;
let cropModel: THREE.Group | null = null;
let mountainModel: THREE.Group | null = null;
let castleModel: THREE.Group | null = null;
let houseModel: THREE.Group | null = null;
let towerModel: THREE.Group | null = null;
let farmModel: THREE.Group | null = null;

// Portal references for external use
export let startPortal: THREE.Mesh | null = null;
export let endPortal: THREE.Mesh | null = null;

export function buildDungeon(scene: THREE.Scene) {
  const loader = new GLTFLoader();

  // Preload models
  Promise.all([
    new Promise<THREE.Group>((resolve) => {
      loader.load("/medieval-village/Trees.glb", (gltf) => {
        treeModel = gltf.scene;
        resolve(treeModel);
      });
    }),
    new Promise<THREE.Group>((resolve) => {
      loader.load("/medieval-village/Pine Trees.glb", (gltf) => {
        pineTreeModel = gltf.scene;
        resolve(pineTreeModel);
      });
    }),
    new Promise<THREE.Group>((resolve) => {
      loader.load("/medieval-village/Crops.glb", (gltf) => {
        cropModel = gltf.scene;
        resolve(cropModel);
      });
    }),
    new Promise<THREE.Group>((resolve) => {
      loader.load("/medieval-village/Mountain.glb", (gltf) => {
        mountainModel = gltf.scene;
        resolve(mountainModel);
      });
    }),
    new Promise<THREE.Group>((resolve) => {
      loader.load("/medieval-village/Castle.glb", (gltf) => {
        castleModel = gltf.scene;
        resolve(castleModel);
      });
    }),
    new Promise<THREE.Group>((resolve) => {
      loader.load("/medieval-village/House.glb", (gltf) => {
        houseModel = gltf.scene;
        resolve(houseModel);
      });
    }),
    new Promise<THREE.Group>((resolve) => {
      loader.load("/medieval-village/Stone Tower.glb", (gltf) => {
        towerModel = gltf.scene;
        resolve(towerModel);
      });
    }),
    new Promise<THREE.Group>((resolve) => {
      loader.load("/medieval-village/Farm.glb", (gltf) => {
        farmModel = gltf.scene;
        resolve(farmModel);
      });
    }),
  ]).then(() => {
    createMeadow(scene);
    createPath(scene);
    addDistantTrees(scene);
    addPineTrees(scene);
    addCropsNearPath(scene);
    addFarMountains(scene);
    addFarBuildings(scene);
    addSun(scene);
    createStartPortal(scene);
    createEndPortal(scene);
  });
}

function createMeadow(scene: THREE.Scene) {
  scene.background = new THREE.Color(0x87ceeb);
  scene.fog = new THREE.FogExp2(0x87ceeb, 0.0008);

  const grassMat = new THREE.MeshStandardMaterial({
    color: 0x5a9c3a,
    roughness: 0.9,
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 500), grassMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.2;
  ground.receiveShadow = true;
  scene.add(ground);
}

function createPath(scene: THREE.Scene) {
  const pathMat = new THREE.MeshStandardMaterial({
    color: 0xc4a56a,
    roughness: 0.8,
  });

  for (let z = PATH_START; z <= PATH_END; z += 1) {
    for (let x = -PATH_WIDTH; x <= PATH_WIDTH; x += 0.8) {
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.05, 0.7),
        pathMat,
      );
      tile.position.set(x, -0.15, z);
      tile.castShadow = true;
      scene.add(tile);
    }
  }
}

function createStartPortal(scene: THREE.Scene) {
  const portalGroup = new THREE.Group();
  portalGroup.position.set(0, 0.5, PATH_START + 3);

  // Outer magic ring with runes
  const outerRingGeo = new THREE.TorusGeometry(1.8, 0.08, 64, 128);
  const outerRingMat = new THREE.MeshStandardMaterial({
    color: 0x44ff88,
    emissive: 0x22cc44,
    emissiveIntensity: 1.2,
    metalness: 0.8,
    roughness: 0.2,
  });
  const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
  outerRing.rotation.x = Math.PI / 2;
  portalGroup.add(outerRing);

  // Inner rotating ring (opposite direction)
  const innerRingGeo = new THREE.TorusGeometry(1.4, 0.06, 64, 128);
  const innerRingMat = new THREE.MeshStandardMaterial({
    color: 0x88ffaa,
    emissive: 0x44ff88,
    emissiveIntensity: 1.0,
    metalness: 0.9,
    roughness: 0.1,
  });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  innerRing.rotation.x = Math.PI / 2;
  portalGroup.add(innerRing);

  // Middle ring (diagonal)
  const middleRingGeo = new THREE.TorusGeometry(1.6, 0.05, 64, 128);
  const middleRingMat = new THREE.MeshStandardMaterial({
    color: 0xaaffcc,
    emissive: 0x66ffaa,
    emissiveIntensity: 0.9,
    metalness: 0.7,
    roughness: 0.3,
  });
  const middleRing = new THREE.Mesh(middleRingGeo, middleRingMat);
  middleRing.rotation.x = Math.PI / 3;
  middleRing.rotation.z = Math.PI / 4;
  portalGroup.add(middleRing);

  // Core portal glow (animated)
  const coreGlow = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x44ff88,
      emissive: 0x22cc55,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.7,
    }),
  );
  portalGroup.add(coreGlow);

  // Inner bright core
  const innerCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xaaffaa,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.9,
    }),
  );
  portalGroup.add(innerCore);

  // Create rune symbols floating around
  const runeCount = 12;
  const runes: THREE.Mesh[] = [];
  for (let i = 0; i < runeCount; i++) {
    const runeGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const runeMat = new THREE.MeshStandardMaterial({
      color: 0xaaffaa,
      emissive: 0x44ff66,
      emissiveIntensity: 0.8,
    });
    const rune = new THREE.Mesh(runeGeo, runeMat);
    const angle = (i / runeCount) * Math.PI * 2;
    const radius = 2.0;
    rune.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    rune.userData = {
      angle: angle,
      radius: radius,
      speed: 0.5,
      floatSpeed: 1 + Math.random() * 2,
    };
    portalGroup.add(rune);
    runes.push(rune);
  }

  // Particle system (swirling particles)
  const particleCount = 200;
  const particles: THREE.Mesh[] = [];
  for (let i = 0; i < particleCount; i++) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 6, 6),
      new THREE.MeshStandardMaterial({
        color: 0x88ff88,
        emissive: 0x44ff44,
        emissiveIntensity: 0.6,
      }),
    );
    particle.userData = {
      angle: Math.random() * Math.PI * 2,
      radius: 0.5 + Math.random() * 2.5,
      speed: 0.5 + Math.random() * 2,
      yOffset: (Math.random() - 0.5) * 3,
      verticalSpeed: 0.5 + Math.random() * 1,
    };
    portalGroup.add(particle);
    particles.push(particle);
  }

  // Floating energy orbs
  const orbCount = 8;
  const orbs: THREE.Mesh[] = [];
  for (let i = 0; i < orbCount; i++) {
    const orbGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xaaffaa,
      emissive: 0x66ff66,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.8,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.userData = {
      angle: (i / orbCount) * Math.PI * 2,
      radius: 2.2,
      yOffset: 0,
      speed: 0.8,
    };
    portalGroup.add(orb);
    orbs.push(orb);
  }

  // Store all animated elements
  portalGroup.userData = {
    particles,
    runes,
    orbs,
    outerRing,
    innerRing,
    middleRing,
    coreGlow,
    innerCore,
    time: 0,
    type: "start",
  };

  scene.add(portalGroup);
  startPortal = portalGroup as unknown as THREE.Mesh;

  // Add floating image sign
  createPortalSign(scene, PATH_START + 3, "/buttons/enter-the-keep.png", 2.8);
}

function createEndPortal(scene: THREE.Scene) {
  const portalGroup = new THREE.Group();
  portalGroup.position.set(0, 0.5, PATH_END - 3);

  // Outer magic ring with runes
  const outerRingGeo = new THREE.TorusGeometry(1.8, 0.08, 64, 128);
  const outerRingMat = new THREE.MeshStandardMaterial({
    color: 0xaa66ff,
    emissive: 0x8833ff,
    emissiveIntensity: 1.2,
    metalness: 0.8,
    roughness: 0.2,
  });
  const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
  outerRing.rotation.x = Math.PI / 2;
  portalGroup.add(outerRing);

  // Inner rotating ring (opposite direction)
  const innerRingGeo = new THREE.TorusGeometry(1.4, 0.06, 64, 128);
  const innerRingMat = new THREE.MeshStandardMaterial({
    color: 0xff66cc,
    emissive: 0xff33aa,
    emissiveIntensity: 1.0,
    metalness: 0.9,
    roughness: 0.1,
  });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  innerRing.rotation.x = Math.PI / 2;
  portalGroup.add(innerRing);

  // Middle ring (diagonal)
  const middleRingGeo = new THREE.TorusGeometry(1.6, 0.05, 64, 128);
  const middleRingMat = new THREE.MeshStandardMaterial({
    color: 0x33ccff,
    emissive: 0x2299ff,
    emissiveIntensity: 0.9,
    metalness: 0.7,
    roughness: 0.3,
  });
  const middleRing = new THREE.Mesh(middleRingGeo, middleRingMat);
  middleRing.rotation.x = Math.PI / 3;
  middleRing.rotation.z = Math.PI / 4;
  portalGroup.add(middleRing);

  // Core portal glow (animated)
  const coreGlow = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x8844ff,
      emissive: 0x5533cc,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.7,
    }),
  );
  portalGroup.add(coreGlow);

  // Inner bright core
  const innerCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xaa88ff,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.9,
    }),
  );
  portalGroup.add(innerCore);

  // Create rune symbols floating around
  const runeCount = 12;
  const runes: THREE.Mesh[] = [];
  for (let i = 0; i < runeCount; i++) {
    const runeGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const runeMat = new THREE.MeshStandardMaterial({
      color: 0xffaa66,
      emissive: 0xff6622,
      emissiveIntensity: 0.8,
    });
    const rune = new THREE.Mesh(runeGeo, runeMat);
    const angle = (i / runeCount) * Math.PI * 2;
    const radius = 2.0;
    rune.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    rune.userData = {
      angle: angle,
      radius: radius,
      speed: 0.5,
      floatSpeed: 1 + Math.random() * 2,
    };
    portalGroup.add(rune);
    runes.push(rune);
  }

  // Particle system (swirling particles)
  const particleCount = 200;
  const particles: THREE.Mesh[] = [];
  for (let i = 0; i < particleCount; i++) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 6, 6),
      new THREE.MeshStandardMaterial({
        color: 0xff88ff,
        emissive: 0xff44aa,
        emissiveIntensity: 0.6,
      }),
    );
    particle.userData = {
      angle: Math.random() * Math.PI * 2,
      radius: 0.5 + Math.random() * 2.5,
      speed: 0.5 + Math.random() * 2,
      yOffset: (Math.random() - 0.5) * 3,
      verticalSpeed: 0.5 + Math.random() * 1,
    };
    portalGroup.add(particle);
    particles.push(particle);
  }

  // Floating energy orbs
  const orbCount = 8;
  const orbs: THREE.Mesh[] = [];
  for (let i = 0; i < orbCount; i++) {
    const orbGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xffaa44,
      emissive: 0xff6622,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.8,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.userData = {
      angle: (i / orbCount) * Math.PI * 2,
      radius: 2.2,
      yOffset: 0,
      speed: 0.8,
    };
    portalGroup.add(orb);
    orbs.push(orb);
  }

  // Store all animated elements
  portalGroup.userData = {
    particles,
    runes,
    orbs,
    outerRing,
    innerRing,
    middleRing,
    coreGlow,
    innerCore,
    time: 0,
    type: "end",
  };

  scene.add(portalGroup);
  endPortal = portalGroup as unknown as THREE.Mesh;

  // Add floating image sign
  createPortalSign(
    scene,
    PATH_END - 3,
    "/buttons/explore-the-village.png",
    2.8,
  );
}

function createPortalSign(
  scene: THREE.Scene,
  z: number,
  imagePath: string,
  yOffset: number = 2.0,
) {
  // Load the image and create a texture
  const img = new Image();
  img.crossOrigin = "Anonymous";

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(0, yOffset, z);

    // Adjust scale based on image aspect ratio
    const aspect = img.width / img.height;
    sprite.scale.set(1.5 * aspect, 1.5, 1);

    scene.add(sprite);
  };

  img.src = imagePath;
}

// Animation function for portals - call in your animation loop
export function animatePortals(deltaTime: number) {
  if (startPortal) {
    startPortal.userData.time = (startPortal.userData.time || 0) + deltaTime;
    const particles = startPortal.userData.particles;
    if (particles) {
      particles.forEach((particle: THREE.Mesh, i: number) => {
        const angle =
          particle.userData.angle +
          startPortal!.userData.time * particle.userData.speed;
        const x = Math.cos(angle) * particle.userData.radius;
        const z = Math.sin(angle) * particle.userData.radius;
        particle.position.set(x, particle.userData.yOffset, z);
      });
    }
    // Rotate the ring
    const ring = startPortal.children.find(
      (c) =>
        c instanceof THREE.Mesh && c.geometry instanceof THREE.TorusGeometry,
    );
    if (ring) ring.rotation.z += deltaTime * 2;
  }

  if (endPortal) {
    endPortal.userData.time = (endPortal.userData.time || 0) + deltaTime;
    const particles = endPortal.userData.particles;
    if (particles) {
      particles.forEach((particle: THREE.Mesh, i: number) => {
        const angle =
          particle.userData.angle +
          endPortal!.userData.time * particle.userData.speed;
        const x = Math.cos(angle) * particle.userData.radius;
        const z = Math.sin(angle) * particle.userData.radius;
        particle.position.set(x, particle.userData.yOffset, z);
      });
    }
    const ring = endPortal.children.find(
      (c) =>
        c instanceof THREE.Mesh && c.geometry instanceof THREE.TorusGeometry,
    );
    if (ring) ring.rotation.z += deltaTime * 2;
  }
}

// Warp check function - call in your animation loop
export function checkPortalWarp(
  playerPosition: THREE.Vector3,
  onStartWarp: () => void,
  onEndWarp: () => void,
): boolean {
  if (!startPortal || !endPortal) return false;

  const startPortalPos = startPortal.position;
  const endPortalPos = endPortal.position;

  const distToStart = playerPosition.distanceTo(startPortalPos);
  const distToEnd = playerPosition.distanceTo(endPortalPos);

  if (distToStart < 1.5) {
    onStartWarp();
    return true;
  }

  if (distToEnd < 1.5) {
    onEndWarp();
    return true;
  }

  return false;
}

function addDistantTrees(scene: THREE.Scene) {
  if (!treeModel) return;

  for (let i = 0; i < 20; i++) {
    const side = Math.random() > 0.5 ? -1 : 1;
    const x = side * (12 + Math.random() * 30);
    const z = (Math.random() - 0.5) * 250;

    if (Math.abs(z) > 90) continue;

    const tree = treeModel.clone();
    tree.position.set(x, -0.2, z);
    const scale = (0.8 + Math.random() * 0.7) * 3;
    tree.scale.set(scale, scale, scale);
    tree.castShadow = true;
    scene.add(tree);
  }
}

function addPineTrees(scene: THREE.Scene) {
  if (!pineTreeModel) return;

  for (let i = 0; i < 20; i++) {
    const side = Math.random() > 0.5 ? -1 : 1;
    const x = side * (18 + Math.random() * 40);
    const z = (Math.random() - 0.5) * 200;

    const tree = pineTreeModel.clone();
    tree.position.set(x, -0.2, z);
    const scale = (0.7 + Math.random() * 0.6) * 3;
    tree.scale.set(scale, scale, scale);
    tree.castShadow = true;
    scene.add(tree);
  }
}

function addCropsNearPath(scene: THREE.Scene) {
  if (!cropModel) return;

  for (let z = PATH_START + 10; z <= PATH_END - 10; z += 6) {
    const x = -5.5;
    const crop = cropModel.clone();
    crop.position.set(x, -0.15, z + (Math.random() - 0.5) * 1.5);
    crop.scale.set(1.2, 1.2, 1.2);
    crop.castShadow = true;
    scene.add(crop);

    const x2 = 5.5;
    const crop2 = cropModel.clone();
    crop2.position.set(x2, -0.15, z + (Math.random() - 0.5) * 1.5);
    crop2.scale.set(1.2, 1.2, 1.2);
    crop2.castShadow = true;
    scene.add(crop2);
  }
}

function addFarMountains(scene: THREE.Scene) {
  if (!mountainModel) return;

  const mountainPositions = [
    { x: -180, z: -220, scale: 8 },
    { x: -150, z: -180, scale: 10 },
    { x: -200, z: -140, scale: 7 },
    { x: -170, z: -100, scale: 9 },
    { x: -220, z: -60, scale: 8 },
    { x: -190, z: -20, scale: 11 },
    { x: -210, z: 20, scale: 7 },
    { x: -160, z: 60, scale: 10 },
    { x: -200, z: 100, scale: 8 },
    { x: -180, z: 140, scale: 9 },
    { x: -220, z: 180, scale: 12 },
    { x: -170, z: 220, scale: 8 },
    { x: 180, z: -230, scale: 9 },
    { x: 150, z: -190, scale: 8 },
    { x: 200, z: -150, scale: 11 },
    { x: 170, z: -110, scale: 7 },
    { x: 220, z: -70, scale: 10 },
    { x: 190, z: -30, scale: 8 },
    { x: 210, z: 10, scale: 12 },
    { x: 160, z: 50, scale: 9 },
    { x: 200, z: 90, scale: 7 },
    { x: 180, z: 130, scale: 10 },
    { x: 220, z: 170, scale: 8 },
    { x: 170, z: 210, scale: 11 },
    { x: -80, z: -280, scale: 6 },
    { x: 0, z: -300, scale: 8 },
    { x: 80, z: -290, scale: 7 },
    { x: -100, z: 290, scale: 9 },
    { x: 0, z: 310, scale: 8 },
    { x: 100, z: 300, scale: 7 },
  ];

  mountainPositions.forEach((pos) => {
    const mountain = mountainModel!.clone();
    mountain.position.set(pos.x, -0.5, pos.z);
    const scale = pos.scale * 2.5;
    mountain.scale.set(scale, scale, scale);
    mountain.castShadow = false;
    mountain.receiveShadow = false;
    scene.add(mountain);
  });
}

function addFarBuildings(scene: THREE.Scene) {
  if (!castleModel || !houseModel || !towerModel || !farmModel) return;

  const buildingClusters = [
    { type: "castle", x: -95, z: -70, scale: 4 },
    { type: "tower", x: -85, z: -65, scale: 3.5 },
    { type: "tower", x: -105, z: -62, scale: 3.5 },
    { type: "house", x: -90, z: -55, scale: 3 },
    { type: "house", x: -100, z: -50, scale: 2.8 },
    { type: "farm", x: -110, z: -10, scale: 3.5 },
    { type: "house", x: -100, z: -5, scale: 3 },
    { type: "house", x: -115, z: 0, scale: 2.8 },
    { type: "tower", x: -105, z: 5, scale: 3 },
    { type: "castle", x: -90, z: 50, scale: 3.5 },
    { type: "house", x: -80, z: 55, scale: 3 },
    { type: "house", x: -95, z: 60, scale: 2.8 },
    { type: "tower", x: -85, z: 65, scale: 3.2 },
    { type: "house", x: -100, z: 45, scale: 2.5 },
    { type: "farm", x: -120, z: 110, scale: 3.2 },
    { type: "house", x: -110, z: 115, scale: 3 },
    { type: "tower", x: -125, z: 108, scale: 3.5 },
    { type: "house", x: -115, z: 125, scale: 2.8 },
    { type: "castle", x: 95, z: -80, scale: 4.5 },
    { type: "tower", x: 85, z: -75, scale: 3.8 },
    { type: "tower", x: 105, z: -72, scale: 3.5 },
    { type: "house", x: 90, z: -65, scale: 3.2 },
    { type: "house", x: 100, z: -60, scale: 3 },
    { type: "farm", x: 110, z: -20, scale: 3.5 },
    { type: "house", x: 100, z: -15, scale: 3 },
    { type: "house", x: 115, z: -10, scale: 2.8 },
    { type: "tower", x: 105, z: -5, scale: 3.2 },
    { type: "house", x: 120, z: -25, scale: 2.5 },
    { type: "castle", x: 90, z: 40, scale: 4 },
    { type: "house", x: 80, z: 45, scale: 3 },
    { type: "house", x: 95, z: 50, scale: 2.8 },
    { type: "tower", x: 85, z: 55, scale: 3.5 },
    { type: "farm", x: 100, z: 35, scale: 3.2 },
    { type: "farm", x: 120, z: 100, scale: 3.2 },
    { type: "house", x: 110, z: 105, scale: 3 },
    { type: "tower", x: 125, z: 98, scale: 3.5 },
    { type: "house", x: 115, z: 115, scale: 2.8 },
    { type: "house", x: 130, z: 110, scale: 2.5 },
    { type: "castle", x: -40, z: -140, scale: 3 },
    { type: "tower", x: 0, z: -145, scale: 3.5 },
    { type: "castle", x: 40, z: -138, scale: 3.2 },
    { type: "house", x: -30, z: 150, scale: 3 },
    { type: "tower", x: 0, z: 155, scale: 3.5 },
    { type: "house", x: 35, z: 152, scale: 2.8 },
  ];

  buildingClusters.forEach((building) => {
    let model: THREE.Group | null = null;

    switch (building.type) {
      case "castle":
        model = castleModel!.clone();
        break;
      case "house":
        model = houseModel!.clone();
        break;
      case "tower":
        model = towerModel!.clone();
        break;
      case "farm":
        model = farmModel!.clone();
        break;
    }

    if (model) {
      model.position.set(building.x, -0.2, building.z);
      model.scale.set(building.scale, building.scale, building.scale);
      model.castShadow = false;
      model.receiveShadow = false;
      scene.add(model);
    }
  });
}

let sunModelRef: THREE.Object3D | null = null;

function addSun(scene: THREE.Scene) {
  const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
  sunLight.position.set(20, 30, 10);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  scene.add(sunLight);

  const ambientLight = new THREE.AmbientLight(0x88aaff, 0.5);
  scene.add(ambientLight);

  const groundFill = new THREE.PointLight(0xccaa66, 0.3);
  groundFill.position.set(0, -1, 0);
  scene.add(groundFill);

  const loader = new GLTFLoader();
  loader.load(
    "/medieval-village/Sun With Island.glb",
    (gltf) => {
      sunModelRef = gltf.scene;
      sunModelRef.position.set(18, 100, -25);
      sunModelRef.scale.set(0.1, 0.1, 0.1);

      const glowGeometry = new THREE.SphereGeometry(2.2, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffaa66,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      sunModelRef.add(glow);

      scene.add(sunModelRef);
    },
    undefined,
    (error) => {
      console.error("Error loading Sun With Island model:", error);
      const sunMat = new THREE.MeshStandardMaterial({
        color: 0xffdd88,
        emissive: 0xffaa44,
      });
      const sunDisk = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 16, 16),
        sunMat,
      );
      sunDisk.position.set(18, 28, -25);
      scene.add(sunDisk);
    },
  );
}

export function animateSun(deltaTime: number) {
  if (sunModelRef) {
    sunModelRef.rotation.y += deltaTime * 0.1;
  }
}

export function addPathMarkers(scene: THREE.Scene) {
  const startMat = new THREE.MeshStandardMaterial({
    color: 0x44ff44,
    emissive: 0x226622,
  });
  const startMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 16),
    startMat,
  );
  startMarker.position.set(0, 0.1, PATH_START + 2);
  scene.add(startMarker);

  const endMat = new THREE.MeshStandardMaterial({
    color: 0xff4444,
    emissive: 0x662222,
  });
  const endMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 16),
    endMat,
  );
  endMarker.position.set(0, 0.1, PATH_END - 2);
  scene.add(endMarker);
}
