import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let castleModel: THREE.Group | null = null;
let houseModel: THREE.Group | null = null;
let towerModel: THREE.Group | null = null;
let farmModel: THREE.Group | null = null;

export async function loadBuildingModels(loader: GLTFLoader) {
    return Promise.all([
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
    ]);
}

const BASE_BUILDING_CLUSTERS = [
    { type: "castle", x: -95, z: -70, scale: 6 }, { type: "tower", x: -85, z: -65, scale: 5.5 },
    { type: "tower", x: -105, z: -62, scale: 5.5 }, { type: "house", x: -90, z: -55, scale: 5 },
    { type: "house", x: -100, z: -50, scale: 4.8 }, { type: "farm", x: -110, z: -10, scale: 3.5 },
    { type: "house", x: -100, z: -5, scale: 5 }, { type: "house", x: -115, z: 0, scale: 4.8 },
    { type: "tower", x: -105, z: 5, scale: 5 }, { type: "castle", x: -90, z: 50, scale: 5.5 },
    { type: "house", x: -80, z: 55, scale: 5 }, { type: "house", x: -95, z: 60, scale: 3.8 },
    { type: "tower", x: -85, z: 65, scale: 5.2 }, { type: "house", x: -100, z: 45, scale: 3.5 },
    { type: "farm", x: -120, z: 110, scale: 5.2 }, { type: "house", x: -110, z: 115, scale: 5 },
    { type: "tower", x: -125, z: 108, scale: 5.5 }, { type: "house", x: -115, z: 125, scale: 4.8 },
    { type: "castle", x: 95, z: -80, scale: 6.5 }, { type: "tower", x: 85, z: -75, scale: 5.8 },
    { type: "tower", x: 105, z: -72, scale: 5.5 }, { type: "house", x: 90, z: -65, scale: 5.2 },
    { type: "house", x: 100, z: -60, scale: 5 }, { type: "farm", x: 110, z: -20, scale: 5.5 },
    { type: "house", x: 100, z: -15, scale: 5 }, { type: "house", x: 115, z: -10, scale: 4.8 },
    { type: "tower", x: 105, z: -5, scale: 5.2 }, { type: "house", x: 120, z: -25, scale: 4.5 },
    { type: "castle", x: 90, z: 40, scale: 6 }, { type: "house", x: 80, z: 45, scale: 5 },
    { type: "house", x: 95, z: 50, scale: 4.8 }, { type: "tower", x: 85, z: 55, scale: 5.5 },
    { type: "farm", x: 100, z: 35, scale: 5.2 }, { type: "farm", x: 120, z: 100, scale: 5.2 },
    { type: "house", x: 110, z: 105, scale: 5 }, { type: "tower", x: 125, z: 98, scale: 5.5 },
    { type: "house", x: 115, z: 115, scale: 4.8 }, { type: "house", x: 130, z: 110, scale: 4.5 },
    { type: "castle", x: -40, z: -140, scale: 5 }, { type: "tower", x: 0, z: -145, scale: 5.5 },
    { type: "castle", x: 40, z: -138, scale: 5.2 }, { type: "house", x: -30, z: 150, scale: 5 },
    { type: "tower", x: 0, z: 155, scale: 5.5 }, { type: "house", x: 35, z: 152, scale: 4.8 },
];

const BUILDING_CLUSTERS = BASE_BUILDING_CLUSTERS.map(building => ({
    ...building,
    scale: building.scale + 2.5
}));

export function addFarBuildings(scene: THREE.Scene) {
    if (!castleModel || !houseModel || !towerModel || !farmModel) return;

    BUILDING_CLUSTERS.forEach((building) => {
        let model: THREE.Group | null = null;
        switch (building.type) {
            case "castle": model = castleModel!.clone(); break;
            case "house": model = houseModel!.clone(); break;
            case "tower": model = towerModel!.clone(); break;
            case "farm": model = farmModel!.clone(); break;
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