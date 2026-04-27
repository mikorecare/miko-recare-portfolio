import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PATH_START, PATH_END, PATH_WIDTH } from "./index";

let treeModel: THREE.Group | null = null;
let pineTreeModel: THREE.Group | null = null;

let cachedCurvePoints: THREE.Vector3[] = [];
let spatialGrid: Map<string, THREE.Vector3[]> = new Map();
const GRID_CELL_SIZE = 20;

export async function loadTreeModels(loader: GLTFLoader) {
    return Promise.all([
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
    ]);
}

function buildSpatialGrid(points: THREE.Vector3[]) {
    spatialGrid.clear();
    for (const point of points) {
        const gridX = Math.floor(point.x / GRID_CELL_SIZE);
        const gridZ = Math.floor(point.z / GRID_CELL_SIZE);
        const key = `${gridX},${gridZ}`;
        if (!spatialGrid.has(key)) {
            spatialGrid.set(key, []);
        }
        spatialGrid.get(key)!.push(point);
    }
}

function isTooCloseToPath(x: number, z: number, minDistance: number): boolean {
    const gridX = Math.floor(x / GRID_CELL_SIZE);
    const gridZ = Math.floor(z / GRID_CELL_SIZE);

    for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
            const key = `${gridX + dx},${gridZ + dz}`;
            const cellPoints = spatialGrid.get(key);
            if (cellPoints) {
                for (const point of cellPoints) {
                    const dist = Math.hypot(x - point.x, z - point.z);
                    if (dist < minDistance) return true;
                }
            }
        }
    }
    return false;
}


export function setCurvePoints(points: THREE.Vector3[]) {
    cachedCurvePoints = points;
    buildSpatialGrid(points);
}

export function addDistantTrees(scene: THREE.Scene) {
    if (!treeModel || cachedCurvePoints.length === 0) return;

    let treesPlaced = 0;
    const maxTrees = 30;
    const minDistanceFromPath = PATH_WIDTH + 3.5;
    const maxAttempts = 300;
    let attempts = 0;

    while (treesPlaced < maxTrees && attempts < maxAttempts) {
        attempts++;

        const side = Math.random() > 0.5 ? 1 : -1;
        const x = side * (40 + Math.random() * 50);
        const z = PATH_START + 20 + Math.random() * (PATH_END - PATH_START - 40);

        if (Math.abs(x) < 35) continue;

        const tooClose = isTooCloseToPath(x, z, minDistanceFromPath);

        if (!tooClose) {
            const tree = treeModel.clone();
            tree.userData.isVegetation = true;
            tree.position.set(x, -0.2, z);  // Changed Y to -0.2 to match ground level
            const scale = (0.8 + Math.random() * 0.7) * 8;
            tree.scale.set(scale, scale, scale);
            tree.rotation.y = Math.random() * Math.PI * 2;

            // Enable shadows for all parts of the tree
            tree.castShadow = true;
            tree.receiveShadow = true;

            // Ensure all children also cast/receive shadows
            tree.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(tree);
            treesPlaced++;
        }
    }

    console.log(`Placed ${treesPlaced} distant trees`);
}

export function addPineTrees(scene: THREE.Scene) {
    if (!pineTreeModel || cachedCurvePoints.length === 0) return;

    let treesPlaced = 0;
    const maxTrees = 25;
    const minDistanceFromPath = PATH_WIDTH + 3.5;
    const maxAttempts = 250;
    let attempts = 0;

    while (treesPlaced < maxTrees && attempts < maxAttempts) {
        attempts++;

        const side = Math.random() > 0.5 ? 1 : -1;
        const x = side * (45 + Math.random() * 55);
        const z = PATH_START + Math.random() * (PATH_END - PATH_START + 60);

        if (Math.abs(x) < 40) continue;

        const tooClose = isTooCloseToPath(x, z, minDistanceFromPath);

        if (!tooClose) {
            const tree = pineTreeModel.clone();
            tree.userData.isVegetation = true;
            tree.position.set(x, -0.2, z);  // Changed Y to -0.2 to match ground level
            const scale = (0.7 + Math.random() * 0.6) * 8;
            tree.scale.set(scale, scale, scale);
            tree.rotation.y = Math.random() * Math.PI * 2;

            // Enable shadows for all parts of the tree
            tree.castShadow = true;
            tree.receiveShadow = true;

            // Ensure all children also cast/receive shadows
            tree.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(tree);
            treesPlaced++;
        }
    }

    console.log(`Placed ${treesPlaced} pine trees`);
}

export function clearVegetation(scene: THREE.Scene) {
    if (!scene) return;

    const toRemove: THREE.Object3D[] = [];
    scene.traverse((object) => {
        if (object.userData.isVegetation) {
            toRemove.push(object);
        }
    });

    toRemove.forEach(obj => {
        if (obj.parent) {
            obj.parent.remove(obj);
        }
    });
}