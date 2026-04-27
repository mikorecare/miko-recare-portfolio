import { MonsterConfig } from "@/monsters_modules";
import * as THREE from "three";

export const dragonConfigs: MonsterConfig[] = [
    {
        name: "Dragon",
        modelPath: "/monsters/Dragon.glb",
        position: new THREE.Vector3(-35, -0.18, -70),
        scale: 0.3,
        movement: "fly",
        movementParams: {
            speed: 1.5,
            flyHeight: 4,
        },
    },
    {
        name: "Dragon King",
        modelPath: "/monsters/Dragon Evolved.glb",
        position: new THREE.Vector3(-35, -0.18, -70),
        scale: 2,  // Keeping your scale at 10
        rotation: new THREE.Euler(-0.5, 0, 0),
        movement: "patrol-fly",
        movementParams: {
            patrolPoints: [
                new THREE.Vector3(-35, 30, -70),     // 1: Start (Y=30)
                new THREE.Vector3(-100, 30, -120),   // 2: Southwest (Y=30)
                new THREE.Vector3(-150, 30, -160),   // 3: Far southwest (Y=30)
                new THREE.Vector3(-200, 30, -100),   // 4: Max west-south (Y=30)
                new THREE.Vector3(-200, 30, 0),      // 5: Max west (Y=30)
                new THREE.Vector3(-150, 30, 80),     // 6: West-north (Y=30)
                new THREE.Vector3(-100, 30, 150),    // 7: Northwest (Y=30)
                new THREE.Vector3(-50, 30, 200),     // 8: Max north (Y=30)
                new THREE.Vector3(0, 30, 180),       // 9: North-center (Y=30)
                new THREE.Vector3(50, 30, 150),      // 10: Northeast (Y=30)
                new THREE.Vector3(100, 30, 200),     // 11: Max north-east (Y=30)
                new THREE.Vector3(150, 30, 150),     // 12: East-north (Y=30)
                new THREE.Vector3(200, 30, 100),     // 13: Max east (Y=30)
                new THREE.Vector3(200, 30, 0),       // 14: Max east-center (Y=30)
                new THREE.Vector3(150, 30, -80),     // 15: East-south (Y=30)
                new THREE.Vector3(100, 30, -150),    // 16: Southeast (Y=30)
                new THREE.Vector3(50, 30, -200),     // 17: Max south (Y=30)
                new THREE.Vector3(0, 30, -180),      // 18: South-center (Y=30)
                new THREE.Vector3(-50, 30, -150),    // 19: Southwest (Y=30)
                new THREE.Vector3(-35, 30, -70),     // 20: Return to start (Y=30)
            ],
            speed: 8,
            flyHeight: 30,     // Matches Y in patrol points
            hoverSpeed: 8,
        },
    },
];