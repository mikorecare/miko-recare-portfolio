import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BUILDINGS } from '../data/buildings';

const GLOBAL_BUILDING_SCALE = 2;

export interface BuildingInfo {
    x: number;
    z: number;
    radius: number;
    name: string;
}

export function loadBuildings(
    scene: THREE.Scene,
    collisionObjects: { x: number; z: number; radius: number }[]
): BuildingInfo[] {
    const buildingInfos: BuildingInfo[] = [];
    const loader = new GLTFLoader();

    BUILDINGS.forEach((building) => {
        loader.load(`/medieval-village/${building.path}`,
            (gltf) => {
                const model = gltf.scene;
                model.position.set(building.x, building.yOffset || -0.2, building.z);
                const finalScale = building.scale * GLOBAL_BUILDING_SCALE;
                model.scale.set(finalScale, finalScale, finalScale);
                if (building.rotation) model.rotation.y = building.rotation;
                model.castShadow = true;
                scene.add(model);

                const finalRadius = building.collisionRadius * GLOBAL_BUILDING_SCALE;
                if (building.collisionRadius) {
                    collisionObjects.push({
                        x: building.x,
                        z: building.z,
                        radius: finalRadius
                    });
                }

                buildingInfos.push({
                    x: building.x,
                    z: building.z,
                    radius: finalRadius,
                    name: building.path.replace('.glb', '')
                });
            },
            undefined,
            (error) => console.error(`Failed to load ${building.path}:`, error)
        );
    });

    return buildingInfos;
}