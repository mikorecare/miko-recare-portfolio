import { MonsterConfig } from "@/monsters_modules";
import * as THREE from "three";

export const tribalConfigs: MonsterConfig[] = [
    {
        name: "Tribal",
        modelPath: "/monsters/Tribal.glb",
        position: new THREE.Vector3(15, -0.18, -70),
        scale: 0.5,
        movement: "follow",
        movementParams: {
            patrolPoints: [
                new THREE.Vector3(15, -0.18, -70),
                new THREE.Vector3(25, -0.18, -77),
                new THREE.Vector3(20, -0.18, -85),
                new THREE.Vector3(20, -0.18, -65),
                new THREE.Vector3(15, -0.18, -55),
            ],
            speed: 1.0,
        },
    },
];