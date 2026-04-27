import { MonsterConfig } from "@/monsters_modules";
import * as THREE from "three";

export const wizardConfigs: MonsterConfig[] = [
  {
    name: "Wizard",
    modelPath: "/monsters/Wizard.glb",
    position: new THREE.Vector3(-30, -0.18, -20),
    scale: 0.5,
    movement: "circle",
    movementParams: {
      radius: 15,
      speed: 0.8,
    },
  },
];