import { MonsterConfig } from "@/monsters_modules";
import * as THREE from "three";

export const chickenConfigs: MonsterConfig[] = [
  {
    name: "Chicken",
    modelPath: "/monsters/Chicken.glb",
    position: new THREE.Vector3(-25, -0.2, 10),
    scale: 0.3,
    movement: "flee",
    movementParams: {
      speed: 2.0,
    },
  },
];