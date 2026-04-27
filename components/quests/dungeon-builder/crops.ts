import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PATH_WIDTH } from "./index";

let cropModel: THREE.Group | null = null;
let cachedCurvePoints: THREE.Vector3[] = [];

export async function loadCropModel(loader: GLTFLoader) {
    return new Promise<THREE.Group>((resolve) => {
        loader.load("/medieval-village/Crops.glb", (gltf) => {
            cropModel = gltf.scene;
            resolve(cropModel);
        });
    });
}

export function setCurvePointsForCrops(points: THREE.Vector3[]) {
    cachedCurvePoints = points;
}

export function addCropsNearPath(scene: THREE.Scene) {
    if (!cropModel || cachedCurvePoints.length === 0) return;

    let cropsPlaced = 0;
    const maxCrops = 60;

    // Place crops along the curve points
    for (let i = 0; i < cachedCurvePoints.length; i += 10) {
        if (cropsPlaced >= maxCrops) break;

        const point = cachedCurvePoints[i];

        // Calculate tangent direction
        const nextPoint = cachedCurvePoints[Math.min(i + 1, cachedCurvePoints.length - 1)];
        const dx = nextPoint.x - point.x;
        const dz = nextPoint.z - point.z;
        const angle = Math.atan2(dz, dx);
        const perpendicular = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));

        // Place crops on both sides of the path
        const offsets = [-PATH_WIDTH - 3, PATH_WIDTH + 3];

        for (const offset of offsets) {
            if (cropsPlaced >= maxCrops) break;

            const cropX = point.x + perpendicular.x * offset;
            const cropZ = point.z + perpendicular.z * offset;

            // Add small cluster of crops
            const clusterSize = 1 + Math.floor(Math.random() * 2);
            for (let c = 0; c < clusterSize; c++) {
                if (cropsPlaced >= maxCrops) break;

                const finalX = cropX + (Math.random() - 0.5) * 1.0;
                const finalZ = cropZ + (Math.random() - 0.5) * 1.0;

                const crop = cropModel.clone();
                crop.userData.isVegetation = true;
                crop.position.set(finalX, 0, finalZ);
                const scale = 0.6 + Math.random() * 0.7;
                crop.scale.set(scale, scale, scale);
                crop.rotation.y = Math.random() * Math.PI * 2;
                crop.castShadow = true;
                scene.add(crop);
                cropsPlaced++;
            }
        }
    }

    console.log(`Placed ${cropsPlaced} crops`);
}

export function clearCrops(scene: THREE.Scene) {
    if (!scene) return;

    const toRemove: THREE.Object3D[] = [];
    scene.traverse((object) => {
        if (object.userData.isVegetation && object.userData.isCrop) {
            toRemove.push(object);
        }
    });

    toRemove.forEach(obj => {
        if (obj.parent) {
            obj.parent.remove(obj);
        }
    });
}