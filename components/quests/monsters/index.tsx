import { MonsterConfig } from "@/monsters_modules";
import { MonsterController } from "@/monsters_modules/monster.controller";
import * as THREE from "three";

export function setupMonsters(
  scene: THREE.Scene,
  camera: THREE.Camera,
): MonsterController {
  const monsterController = new MonsterController(scene);
  monsterController.setPlayer(camera);

  const monstersToSpawn: MonsterConfig[] = [
    {
      name: "Dragon",
      modelPath: "/monsters/Dragon.glb",
      position: new THREE.Vector3(-35, 0, -70),
      scale: 1.0,
      movement: "fly",
      movementParams: {
        speed: 1.5,
        flyHeight: 4,
      },
    },
    {
      name: "Orc",
      modelPath: "/monsters/Orc.glb",
      position: new THREE.Vector3(30, 0, -50),
      scale: 0.9,
      movement: "patrol",
      movementParams: {
        patrolPoints: [
          new THREE.Vector3(30, 0, -50), // Start
          new THREE.Vector3(40, 0, -65), // Move to x=40, z=-65
          new THREE.Vector3(35, 0, -75), // Move to z=-75
          new THREE.Vector3(25, 0, -60), // Move to x=25, z=-60
          new THREE.Vector3(30, 0, -50), // Return to start
        ],
        speed: 1.5,
      },
    },
    {
      name: "Wizard",
      modelPath: "/monsters/Wizard.glb",
      position: new THREE.Vector3(-30, 0, -20),
      scale: 0.9,
      movement: "circle",
      movementParams: {
        radius: 15, // Increased from 12
        speed: 0.8, // Increased from 0.5
      },
    },
    {
      name: "Demon",
      modelPath: "/monsters/Demon.glb",
      position: new THREE.Vector3(35, 0, -10),
      scale: 1.0,
      movement: "fly",
      movementParams: {
        speed: 1.5, // Increased from 1.2
        flyHeight: 5,
      },
    },
    {
      name: "Chicken",
      modelPath: "/monsters/Chicken.glb",
      position: new THREE.Vector3(-25, 0, 10),
      scale: 0.6,
      movement: "flee",
      movementParams: {
        speed: 2.0, // Increased from 1.5
      },
    },
    {
      name: "Alien",
      modelPath: "/monsters/Alien.glb",
      position: new THREE.Vector3(28, 0, 30),
      scale: 0.8,
      movement: "circle",
      movementParams: {
        radius: 18, // Increased from 15
        speed: 0.7, // Increased from 0.4
      },
    },
    {
      name: "Yeti",
      modelPath: "/monsters/Yeti.glb",
      position: new THREE.Vector3(-32, 0, 50),
      scale: 1.0,
      movement: "patrol",
      movementParams: {
        patrolPoints: [
          new THREE.Vector3(-32, 0, 50), // Current position
          new THREE.Vector3(-25, 0, 62), // Different point
          new THREE.Vector3(-35, 0, 68),
          new THREE.Vector3(-38, 0, 55),
          new THREE.Vector3(-32, 0, 50), // Return
        ],
        speed: 1.0,
      },
    },
    {
      name: "Goleling",
      modelPath: "/monsters/Goleling.glb",
      position: new THREE.Vector3(32, 0, 70),
      scale: 0.9,
      movement: "idle",
      movementParams: {
        speed: 0,
      },
    },
    {
      name: "Mushnub",
      modelPath: "/monsters/Mushnub.glb",
      position: new THREE.Vector3(-28, 0, 85),
      scale: 0.7,
      movement: "idle",
      movementParams: {
        speed: 0,
      },
    },
    {
      name: "Tribal",
      modelPath: "/monsters/Tribal.glb",
      position: new THREE.Vector3(30, 0, -85),
      scale: 0.8,
      movement: "patrol",
      movementParams: {
        patrolPoints: [
          new THREE.Vector3(30, 0, -85),
          new THREE.Vector3(40, 0, -92),
          new THREE.Vector3(35, 0, -100),
          new THREE.Vector3(25, 0, -90),
          new THREE.Vector3(30, 0, -85),
        ],
        speed: 1.0,
      },
    },
  ];

  monstersToSpawn.forEach((config) => {
    monsterController.spawnMonster(config);
  });

  return monsterController;
}
