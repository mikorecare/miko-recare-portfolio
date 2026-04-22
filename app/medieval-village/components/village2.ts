import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    VILLAGE2_BUILDINGS,
    VILLAGE2_DECORATIONS,
    VILLAGE2_FENCE_POSITIONS,
} from '../data/village2';

export function loadVillage2(
    scene: THREE.Scene,
    collisionObjects: { x: number; z: number; radius: number }[]
): void {
    const loader = new GLTFLoader();

    // Load Village 2 buildings
    VILLAGE2_BUILDINGS.forEach((building) => {
        loader.load(
            `/medieval-village-2/${building.path}`,
            (gltf) => {
                const model = gltf.scene;
                model.position.set(building.x, building.yOffset || -0.2, building.z);
                model.scale.set(building.scale * 2, building.scale * 2, building.scale * 2);
                if (building.rotation) model.rotation.y = building.rotation;
                model.castShadow = true;
                scene.add(model);
                if (building.collisionRadius) {
                    collisionObjects.push({
                        x: building.x,
                        z: building.z,
                        radius: building.collisionRadius,
                    });
                }
            },
            undefined,
            (error) => console.error(`Failed to load ${building.path}:`, error)
        );
    });

    // Load Village 2 decorations
    VILLAGE2_DECORATIONS.forEach((decoration) => {
        loader.load(
            `/medieval-village-2/${decoration.path}`,
            (gltf) => {
                const model = gltf.scene;
                model.position.set(decoration.x, decoration.yOffset || -0.2, decoration.z);
                model.scale.set(decoration.scale, decoration.scale, decoration.scale);
                if (decoration.rotation) model.rotation.y = decoration.rotation;
                model.castShadow = true;
                scene.add(model);
            },
            undefined,
            (error) => console.error(`Failed to load ${decoration.path}:`, error)
        );
    });

    // Load Village 2 fences
    VILLAGE2_FENCE_POSITIONS.forEach((pos) => {
        loader.load(
            "/medieval-village-2/Fence.glb",
            (gltf) => {
                const fence = gltf.scene;
                fence.position.set(pos.x, 0, pos.z);
                const angle = Math.atan2(60 - pos.z, 80 - pos.x);
                fence.rotation.y = angle;
                fence.scale.set(0.8, 0.8, 0.8);
                fence.castShadow = true;
                scene.add(fence);
                collisionObjects.push({ x: pos.x, z: pos.z, radius: 0.6 });
            },
            undefined,
            (error) => console.error("Failed to load fence:", error)
        );
    });
}