import { MonsterConfig } from "@/monsters_modules";
import * as THREE from "three";

export const demonConfigs: MonsterConfig[] = [
    {
        name: "Demon",
        modelPath: "/monsters/Demon.glb",
        position: new THREE.Vector3(35, 0, -10),
        scale: 0.3,
        movement: "fly",
        movementParams: {
            speed: 1.5,
            flyHeight: 5,
        },
    },
    {
        name: "Blue Demon",
        modelPath: "/monsters/Blue Demon.glb",
        position: new THREE.Vector3(35, 0, -10),
        scale: 0.3,
        movement: "patrol",
        movementParams: {
            patrolPoints: [
                new THREE.Vector3(35, 0, -10),   // Start
                new THREE.Vector3(50, 0, -30),   // Far southeast
                new THREE.Vector3(60, 0, -20),   // Far east
                new THREE.Vector3(55, 0, 0),     // Northeast
                new THREE.Vector3(40, 0, 15),    // North
                new THREE.Vector3(20, 0, 10),    // Northwest
                new THREE.Vector3(10, 0, -5),    // Far west
                new THREE.Vector3(15, 0, -25),   // Southwest
                new THREE.Vector3(25, 0, -35),   // South
                new THREE.Vector3(45, 0, -25),   // Southeast
                new THREE.Vector3(35, 0, -10),   // Return to start
            ],
            speed: 6.0,  // Ultra fast running speed
        },
    },
    {
        name: "Flying Demon",
        modelPath: "/monsters/Demon.glb",
        position: new THREE.Vector3(-40, -0.18, -20),
        scale: 0.4,
        movement: "patrol-fly",
        movementParams: {
            patrolPoints: [
                new THREE.Vector3(-40, 5, -20),     // Start
                new THREE.Vector3(-120, 5, -80),    // Far left-south (-120, -80)
                new THREE.Vector3(-100, 5, -30),    // Far left-center (-100, -30)
                new THREE.Vector3(-80, 5, 30),      // Left-north (-80, 30)
                new THREE.Vector3(-40, 5, 60),      // Center-north (-40, 60)
                new THREE.Vector3(0, 5, 80),        // Right-north (0, 80)
                new THREE.Vector3(50, 5, 50),       // Far right-north (50, 50)
                new THREE.Vector3(80, 5, 10),       // Far right-center (80, 10)
                new THREE.Vector3(60, 5, -40),      // Right-south (60, -40)
                new THREE.Vector3(20, 5, -70),      // Center-south (20, -70)
                new THREE.Vector3(-30, 5, -90),     // Left-south (-30, -90)
                new THREE.Vector3(-70, 5, -100),    // Far left-south (-70, -100)
                new THREE.Vector3(-100, 5, -60),    // Far left-south (-100, -60)
                new THREE.Vector3(-40, 5, -20),     // Return
            ],
            speed: 20.0,        // Ultra fast for ±150 range
            flyHeight: 5,
            hoverSpeed: 7,
        },
    },
];