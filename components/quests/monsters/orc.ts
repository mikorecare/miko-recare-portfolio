import { MonsterConfig } from "@/monsters_modules";
import * as THREE from "three";

export const orcConfigs: MonsterConfig[] = [
    {
        name: "Orc",
        modelPath: "/monsters/Orc.glb",
        position: new THREE.Vector3(30, -0.18, -50),
        scale: 0.5,
        movement: "patrol",
        movementParams: {
            patrolPoints: [
                new THREE.Vector3(30, -0.18, -50),
                new THREE.Vector3(40, -0.18, -65),
                new THREE.Vector3(35, -0.18, -75),
                new THREE.Vector3(25, -0.18, -60),
                new THREE.Vector3(30, -0.18, -50),
            ],
            speed: 1.5,
        },
    },
];