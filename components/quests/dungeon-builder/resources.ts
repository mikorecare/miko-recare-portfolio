import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PATH_START, PATH_END, PATH_WIDTH } from "./index";

// Store all rock variations
let rockModels: THREE.Group[] = [];
let goldModel: THREE.Group | null = null;
let logModel: THREE.Group | null = null;

// Cache for curve points
let cachedCurvePoints: THREE.Vector3[] = [];

export async function loadResourceModels(loader: GLTFLoader) {
    console.log("Loading resource models...");

    // Load all rock variations
    const rockFiles = [
        "/medieval-village/Rock.glb",
        "/medieval-village/Rocks.glb",
        "/medieval-village/Rock-JmFMh7ztL9.glb",
        "/medieval-village/Rock-RtLRqYjfMs.glb"
    ];

    const rockPromises = rockFiles.map(file =>
        new Promise<THREE.Group>((resolve) => {
            loader.load(file, (gltf) => {
                resolve(gltf.scene);
            });
        })
    );

    const rocks = await Promise.all(rockPromises);
    rockModels = rocks;

    // Load gold and logs
    const [gold, logs] = await Promise.all([
        new Promise<THREE.Group>((resolve) => {
            loader.load("/medieval-village/Resource Gold.glb", (gltf) => {
                goldModel = gltf.scene;
                resolve(goldModel);
            });
        }),
        new Promise<THREE.Group>((resolve) => {
            loader.load("/medieval-village/Logs.glb", (gltf) => {
                logModel = gltf.scene;
                resolve(logModel);
            });
        })
    ]);

    console.log(`Loaded ${rockModels.length} rock variations, gold, and logs`);
}

export function setCurvePointsForResources(points: THREE.Vector3[]) {
    cachedCurvePoints = points;
}

// Check if position is too close to path
function isTooCloseToPath(x: number, z: number, minDistance: number): boolean {
    if (cachedCurvePoints.length === 0) return false;

    // Sample every 20th point for performance
    for (let i = 0; i < cachedCurvePoints.length; i += 20) {
        const point = cachedCurvePoints[i];
        const dist = Math.hypot(x - point.x, z - point.z);
        if (dist < minDistance) return true;
    }
    return false;
}

// Add rocks randomly (subtle placement, far from path)
export function addRocks(scene: THREE.Scene) {
    if (rockModels.length === 0 || cachedCurvePoints.length === 0) return;

    let rocksPlaced = 0;
    const maxRocks = 40; // Subtle amount
    const minDistanceFromPath = PATH_WIDTH + 5; // Farther than trees
    const maxAttempts = 200;
    let attempts = 0;

    while (rocksPlaced < maxRocks && attempts < maxAttempts) {
        attempts++;

        // Place rocks in outer areas
        const side = Math.random() > 0.5 ? 1 : -1;
        const x = side * (55 + Math.random() * 45);
        const z = PATH_START - 20 + Math.random() * (PATH_END - PATH_START + 80);

        if (Math.abs(x) < 50) continue; // Keep far from path

        const tooClose = isTooCloseToPath(x, z, minDistanceFromPath);

        if (!tooClose) {
            // Pick random rock variation
            const randomRock = rockModels[Math.floor(Math.random() * rockModels.length)];
            const rock = randomRock.clone();
            rock.userData.isResource = true;
            rock.position.set(x, 0, z);

            // Random scale variation
            const scale = 0.5 + Math.random() * 2;
            rock.scale.set(scale, scale, scale);
            rock.rotation.y = Math.random() * Math.PI * 2;
            rock.castShadow = true;
            rock.receiveShadow = true;
            scene.add(rock);
            rocksPlaced++;
        }
    }

    console.log(`Placed ${rocksPlaced} rocks`);
}

// Add gold resources (rare spawns)
export function addGoldResources(scene: THREE.Scene) {
    if (!goldModel || cachedCurvePoints.length === 0) return;

    let goldPlaced = 0;
    const maxGold = 15; // Rare
    const minDistanceFromPath = PATH_WIDTH + 6;
    const maxAttempts = 150;
    let attempts = 0;

    while (goldPlaced < maxGold && attempts < maxAttempts) {
        attempts++;

        const side = Math.random() > 0.5 ? 1 : -1;
        const x = side * (60 + Math.random() * 40);
        const z = PATH_START - 15 + Math.random() * (PATH_END - PATH_START + 70);

        if (Math.abs(x) < 55) continue;

        const tooClose = isTooCloseToPath(x, z, minDistanceFromPath);

        if (!tooClose) {
            const gold = goldModel.clone();
            gold.userData.isResource = true;
            gold.position.set(x, 0, z);

            const scale = 0.6 + Math.random() * 2;
            gold.scale.set(scale, scale, scale);
            gold.rotation.y = Math.random() * Math.PI * 2;
            gold.castShadow = true;
            scene.add(gold);
            goldPlaced++;
        }
    }

    console.log(`Placed ${goldPlaced} gold resources`);
}

// Add logs randomly
export function addLogs(scene: THREE.Scene) {
    if (!logModel || cachedCurvePoints.length === 0) return;

    let logsPlaced = 0;
    const maxLogs = 30;
    const minDistanceFromPath = PATH_WIDTH + 5;
    const maxAttempts = 200;
    let attempts = 0;

    while (logsPlaced < maxLogs && attempts < maxAttempts) {
        attempts++;

        const side = Math.random() > 0.5 ? 1 : -1;
        const x = side * (50 + Math.random() * 50);
        const z = PATH_START - 10 + Math.random() * (PATH_END - PATH_START + 60);

        if (Math.abs(x) < 45) continue;

        const tooClose = isTooCloseToPath(x, z, minDistanceFromPath);

        if (!tooClose) {
            const log = logModel.clone();
            log.userData.isResource = true;
            log.position.set(x, 0, z);

            const scale = 0.6 + Math.random() * 2;
            log.scale.set(scale, scale, scale);
            log.rotation.y = Math.random() * Math.PI * 2;
            log.castShadow = true;
            scene.add(log);
            logsPlaced++;
        }
    }

    console.log(`Placed ${logsPlaced} logs`);
}

// Add all resources together
export function addAllResources(scene: THREE.Scene) {
    addRocks(scene);
    addGoldResources(scene);
    addLogs(scene);
}

// Helper function to clear all resources
export function clearResources(scene: THREE.Scene) {
    if (!scene) return;

    const toRemove: THREE.Object3D[] = [];
    scene.traverse((object) => {
        if (object.userData.isResource) {
            toRemove.push(object);
        }
    });

    toRemove.forEach(obj => {
        if (obj.parent) {
            obj.parent.remove(obj);
        }
    });
}