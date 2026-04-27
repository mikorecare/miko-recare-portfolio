import { MonsterConfig } from "@/monsters_modules";
import { MonsterController } from "@/monsters_modules/monster.controller";
import * as THREE from "three";
import { storyDialogs, MONSTER_POSITIONS, getMonsterModel } from "./data";
import { createNameTag } from "./create-name-tag";

export interface StoryMonster {
  model: THREE.Object3D;
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

    // Generate dynamic patrol points for each monster
    let patrolPoints: THREE.Vector3[] | undefined = undefined;

    if (
      monsterInfo.movement === "patrol" ||
      monsterInfo.movement === "patrol-fly"
    ) {
      const patrolRadius = 10;
      const numPoints = 7;
      patrolPoints = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const seed = pos.chapter * 100;
        const randomXOffset =
          Math.sin(angle + seed) * patrolRadius * (0.5 + Math.random() * 0.5);
        const randomZOffset =
          Math.cos(angle + seed) * patrolRadius * (0.5 + Math.random() * 0.5);

        patrolPoints.push(
          new THREE.Vector3(
            pos.x + randomXOffset,
            monsterInfo.movement === "patrol-fly" ? 2.5 : -0.18,
            pos.z + randomZOffset,
          ),
        );
      }

      patrolPoints = patrolPoints.map((point) => ({
        ...point,
        x: point.x + (Math.random() - 0.5) * 2,
        z: point.z + (Math.random() - 0.5) * 2,
      })) as THREE.Vector3[];

      const firstPoint = patrolPoints[0];
      const lastPoint = patrolPoints[patrolPoints.length - 1];
      if (firstPoint && lastPoint) {
        patrolPoints.push(
          new THREE.Vector3(
            (firstPoint.x + lastPoint.x) / 2,
            firstPoint.y,
            (firstPoint.z + lastPoint.z) / 2,
          ),
        );
      }
    }

    const config: MonsterConfig = {
      name: pos.monsterType,
      displayName: dialog.displayName || dialog.name,
      modelPath: monsterInfo.path,
      position: new THREE.Vector3(pos.x, -0.18, pos.z),
      scale: monsterInfo.scale,
      movement: monsterInfo.movement,
      isStoryMonster: true,
      storyChapter: dialog.chapter,
      dialog: dialog.dialog,
      title: dialog.title,
      experience: dialog.experience,
      movementParams: {
        speed: monsterInfo.movement === "patrol-fly" ? 3 : 1.5,
        ...(patrolPoints && { patrolPoints }),
        ...(monsterInfo.movement === "patrol-fly" && {
          flyHeight: 2.5,
          hoverSpeed: 2,
        }),
      },
    };

    const monster = await monsterController.spawnMonster(config);

    // Rotate to face the path
    monster.model.rotation.y =
      pos.direction === "left" ? Math.PI / 2 : -Math.PI / 2;

    // ADD NAME TAG
    const nameTag = createNameTag(dialog.displayName || dialog.name);
    nameTag.position.set(0, 3.5, 0);
    monster.model.add(nameTag);

    // Store dialog data for interaction
    monster.model.userData = {
      ...monster.model.userData,
      dialog,
      isStoryMonster: true,
      chapter: pos.chapter,
      displayName: dialog.displayName || dialog.name,
      monsterType: pos.monsterType,
    };

    const storyMonster: StoryMonster = {
      model: monster.model,
      chapter: pos.chapter,
      interactionRange: 5,
      hasBeenTriggered: false,
      monsterId: `story_${pos.chapter}`,
    };

    storyMonsters.push(storyMonster);
    loadedMonsters.push(storyMonster);
  }

  console.log(`Loaded ${loadedMonsters.length} story monsters`);
  return loadedMonsters;
}

export function getNearbyStoryMonster(
  playerPosition: THREE.Vector3,
  interactionDistance: number = 6,
): StoryMonster | null {
  let closest: StoryMonster | null = null;
  let closestDist = interactionDistance;

  for (const monster of storyMonsters) {
    const dist = playerPosition.distanceTo(monster.model.position);
    if (dist < closestDist) {
      closestDist = dist;
      closest = monster;
    }
  }
  return closest;
}

export function getDialogForMonster(
  monster: StoryMonster | null,
): { name: string; dialog: string } | null {
  if (!monster) return null;
  const data = monster.model.userData;
  return {
    name: data.displayName,
    dialog: data.dialog.dialog,
  };
}

export function markMonsterTriggered(monster: StoryMonster): void {
  monster.hasBeenTriggered = true;
}

export function resetStoryMonsters(): void {
  storyMonsters.forEach((m) => {
    m.hasBeenTriggered = false;
  });
}

export function removeStoryMonsters(scene: THREE.Scene): void {
  storyMonsters.forEach((m) => {
    scene.remove(m.model);
  });
  storyMonsters.length = 0;
}
