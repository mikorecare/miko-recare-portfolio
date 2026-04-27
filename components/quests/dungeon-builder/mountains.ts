import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let mountainModel: THREE.Group | null = null;

export async function loadMountainModel(loader: GLTFLoader) {
    return new Promise<THREE.Group>((resolve) => {
        loader.load("/medieval-village/Mountain.glb", (gltf) => {
            mountainModel = gltf.scene;
            resolve(mountainModel);
        });
    });
}

export function addFarMountains(scene: THREE.Scene) {
    if (!mountainModel) return;

    const mountainPositions = [
        { x: -180, z: -220, scale: 8 }, { x: -150, z: -180, scale: 10 },
        { x: -200, z: -140, scale: 7 }, { x: -170, z: -100, scale: 9 },
        { x: -220, z: -60, scale: 8 }, { x: -190, z: -20, scale: 11 },
        { x: -210, z: 20, scale: 7 }, { x: -160, z: 60, scale: 10 },
        { x: -200, z: 100, scale: 8 }, { x: -180, z: 140, scale: 9 },
        { x: -220, z: 180, scale: 12 }, { x: -170, z: 220, scale: 8 },
        { x: 180, z: -230, scale: 9 }, { x: 150, z: -190, scale: 8 },
        { x: 200, z: -150, scale: 11 }, { x: 170, z: -110, scale: 7 },
        { x: 220, z: -70, scale: 10 }, { x: 190, z: -30, scale: 8 },
        { x: 210, z: 10, scale: 12 }, { x: 160, z: 50, scale: 9 },
        { x: 200, z: 90, scale: 7 }, { x: 180, z: 130, scale: 10 },
        { x: 220, z: 170, scale: 8 }, { x: 170, z: 210, scale: 11 },
        { x: -80, z: -280, scale: 6 }, { x: 0, z: -300, scale: 8 },
        { x: 80, z: -290, scale: 7 }, { x: -100, z: 290, scale: 9 },
        { x: 0, z: 310, scale: 8 }, { x: 100, z: 300, scale: 7 },
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