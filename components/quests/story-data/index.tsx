import { MonsterConfig } from "@/monsters_modules";
import { MonsterController } from "@/monsters_modules/monster.controller";
import * as THREE from "three";
import { storyDialogs, MONSTER_POSITIONS, getMonsterModel } from "./data";

export interface StoryMonster {
  model: THREE.Object3D;
  dialog: (typeof storyDialogs)[0];
  chapter: number;
  interactionRange: number;
  hasBeenTriggered: boolean;
  monsterId: string;
}

const storyMonsters: StoryMonster[] = [];

export async function loadStoryMonsters(
  scene: THREE.Scene,
  monsterController: MonsterController,
): Promise<StoryMonster[]> {
  const loadedMonsters: StoryMonster[] = [];

  for (const pos of MONSTER_POSITIONS) {
    const dialog = storyDialogs.find((d) => d.chapter === pos.chapter);
    if (!dialog) continue;

    const monsterInfo = getMonsterModel(pos.monsterType);

    // Create config for MonsterController
    const config: MonsterConfig = {
      name: dialog.name,
      modelPath: monsterInfo.path,
      position: new THREE.Vector3(pos.x, 0, pos.z),
      scale: monsterInfo.scale,
      movement: monsterInfo.movement,
      movementParams: {
        speed: 25, // Idle movement only (bobbing)
      },
    };

    // Spawn the monster through the controller so it gets proper animation
    const monster = await monsterController.spawnMonster(config);

    // Rotate to face the path
    if (pos.direction === "left") {
      monster.model.rotation.y = Math.PI / 2;
    } else {
      monster.model.rotation.y = -Math.PI / 2;
    }

    // Store dialog data on the model's userData
    monster.model.userData = {
      ...monster.model.userData,
      dialog: dialog,
      isStoryMonster: true,
      chapter: pos.chapter,
      direction: pos.direction,
      floatSpeed: 0.5 + Math.random() * 0.5,
      floatHeight: 0.15,
      startY: monster.model.position.y,
      time: Math.random() * Math.PI * 2,
    };

    const storyMonster: StoryMonster = {
      model: monster.model,
      dialog,
      chapter: pos.chapter,
      interactionRange: 5,
      hasBeenTriggered: false,
      monsterId: `story_${pos.chapter}`,
    };

    storyMonsters.push(storyMonster);
    loadedMonsters.push(storyMonster);
    console.log(
      `📖 Loaded story monster: ${dialog.name} at chapter ${pos.chapter}`,
    );
  }

  return loadedMonsters;
}

// Check which monster the player is close to
export function getNearbyStoryMonster(
  playerPosition: THREE.Vector3,
  interactionDistance: number = 6,
): StoryMonster | null {
  let closestMonster: StoryMonster | null = null;
  let closestDistance = interactionDistance;

  for (const monster of storyMonsters) {
    const distance = playerPosition.distanceTo(monster.model.position);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestMonster = monster;
    }
  }

  return closestMonster;
}

// Get dialog for a monster (formatted for your DialogBox)
export function getDialogForMonster(
  monster: StoryMonster | null,
): { name: string; dialog: string } | null {
  if (!monster) return null;
  return {
    name: monster.dialog.name,
    dialog: monster.dialog.dialog,
  };
}

// Mark monster as triggered (optional, for one-time dialogs)
export function markMonsterTriggered(monster: StoryMonster): void {
  monster.hasBeenTriggered = true;
}

// Reset all monsters (for testing)
export function resetStoryMonsters(): void {
  storyMonsters.forEach((monster) => {
    monster.hasBeenTriggered = false;
  });
}

// Clean up function to remove monsters
export function removeStoryMonsters(scene: THREE.Scene): void {
  storyMonsters.forEach((monster) => {
    scene.remove(monster.model);
  });
  storyMonsters.length = 0;
}
