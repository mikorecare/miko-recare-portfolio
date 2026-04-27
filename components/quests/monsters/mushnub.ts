import { MonsterConfig } from "@/monsters_modules";
import * as THREE from "three";

export const mushNubConfigs: MonsterConfig[] = [
    {
        name: "Mushnub",
        modelPath: "/monsters/Mushnub.glb",
        position: new THREE.Vector3(-28, -0.18, 85),
        scale: 0.5,
        movement: "idle",
        movementParams: {
            speed: 0,
        },
    },
];