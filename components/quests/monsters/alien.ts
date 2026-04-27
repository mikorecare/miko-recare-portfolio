import { MonsterConfig } from "@/monsters_modules";
import * as THREE from "three";

export const alienConfigs: MonsterConfig[] = [
    {
        name: "Alien",
        modelPath: "/monsters/Alien.glb",
        position: new THREE.Vector3(28, -0.18, 30),
        scale: 0.5,
        movement: "circle",
        movementParams: {
            radius: 18,
            speed: 0.7,
        },
    },
    {
        name: "Alien-King",
        modelPath: "/monsters/Alien-RRliSQBP7r.glb",
        position: new THREE.Vector3(28, -0.18, 30),
        scale: 0.5,
        movement: "patrol",
        movementParams: {
            patrolPoints: [
                new THREE.Vector3(28, -0.18, 30),  // Center
                new THREE.Vector3(30, -0.18, 32),  // Northeast
                new THREE.Vector3(32, -0.18, 30),  // East
                new THREE.Vector3(30, -0.18, 28),  // Southeast
                new THREE.Vector3(28, -0.18, 26),  // South
                new THREE.Vector3(26, -0.18, 28),  // Southwest
                new THREE.Vector3(24, -0.18, 30),  // West
                new THREE.Vector3(26, -0.18, 32),  // Northwest
                new THREE.Vector3(28, -0.18, 34),  // North
                new THREE.Vector3(28, -0.18, 30),  // Return to center
            ],
            speed: 2.5,
        },
    },
];


