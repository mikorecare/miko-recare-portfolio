import { MonsterController } from "@/monsters_modules/monster.controller";
import * as THREE from "three";
import { dragonConfigs } from "./dragon";
import { orcConfigs } from "./orc";
import { wizardConfigs } from "./wizard";
import { demonConfigs } from "./demon";
import { chickenConfigs } from "./chicken";
import { alienConfigs } from "./alien";
import { yetiConfigs } from "./yeti";
import { golelingConfigs } from "./goleling";
import { mushNubConfigs } from "./mushnub";
import { tribalConfigs } from "./tribal";
import { ninjaConfigs } from "./ninja"; // Import ninja

export const ALL_MONSTER_CONFIGS = [
  ...dragonConfigs,
  ...orcConfigs,
  ...wizardConfigs,
  ...demonConfigs,
  ...chickenConfigs,
  ...alienConfigs,
  ...yetiConfigs,
  ...golelingConfigs,
  ...mushNubConfigs,
  ...tribalConfigs,
  ...ninjaConfigs, // Add ninja to the list
];

export function setupMonsters(
  scene: THREE.Scene,
  camera: THREE.Camera,
): MonsterController {
  const monsterController = new MonsterController(scene);
  monsterController.setPlayer(camera);

  ALL_MONSTER_CONFIGS.forEach((config) => {
    monsterController.spawnMonster(config);
  });

  return monsterController;
}
