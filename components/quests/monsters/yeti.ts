import { MonsterConfig } from "@/monsters_modules";
import * as THREE from "three";

export const yetiConfigs: MonsterConfig[] = [
    {
        name: "Yeti",
        modelPath: "/monsters/Yeti-ceRHrn8HHE.glb",
        position: new THREE.Vector3(-32, -0.18, 50),
        scale: 0.5,
        movement: "patrol",
        movementParams: {
            patrolPoints: [
                new THREE.Vector3(-32, -0.18, 50),
                new THREE.Vector3(-25, -0.18, 62),
                new THREE.Vector3(-35, -0.18, 68),
                new THREE.Vector3(-38, -0.18, 55),
                new THREE.Vector3(-32, -0.18, 50),
            ],
            speed: 1.0,
        },
    },
];