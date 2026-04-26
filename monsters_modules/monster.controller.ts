import * as THREE from "three";
import { MonsterConfig } from "./types";
import { Monster } from "./monster";
import { MonsterAnimator } from "./monster-animator";
import { MonsterLoader } from "./monster-loader";
import { MonsterMover } from "./monster-mover";

export class MonsterController {
    private monsters: Monster[] = [];
    private loader: MonsterLoader;
    private animator: MonsterAnimator;
    private mover: MonsterMover;
    private scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.loader = new MonsterLoader();
        this.animator = new MonsterAnimator();
        this.mover = new MonsterMover();
    }

    setPlayer(player: THREE.Object3D) {
        this.mover.setPlayer(player);
    }

    async spawnMonster(config: MonsterConfig): Promise<Monster> {
        const model = await this.loader.loadModel(config.modelPath, config.scale);
        const bodyParts = this.loader.detectBodyParts(model);

        this.loader.logBodyParts(config.name, bodyParts);

        const monster = new Monster(model, config, bodyParts);
        this.scene.add(monster.model);
        this.monsters.push(monster);

        return monster;
    }

    async spawnMultiple(configs: MonsterConfig[]): Promise<Monster[]> {
        const promises = configs.map(config => this.spawnMonster(config));
        return Promise.all(promises);
    }

    // MonsterController.ts - Fix the update method
    update(deltaTime: number) {
        const safeDelta = Math.min(deltaTime, 0.033);

        for (const monster of this.monsters) {
            // Store original position before animation
            const originalPos = monster.model.position.clone();

            const animated = monster.toAnimated();

            // Move the monster
            this.mover.move(animated, safeDelta);

            // Apply animations
            this.animator.animate(animated, safeDelta);

            // CRITICAL: Sync back the position and rotation to the actual model
            monster.model.position.copy(animated.model.position);
            monster.model.rotation.copy(animated.model.rotation);

            // Sync back body part rotations
            if (monster.bodyParts.leftArm && animated.bodyParts.leftArm) {
                monster.bodyParts.leftArm.rotation.copy(animated.bodyParts.leftArm.rotation);
            }
            if (monster.bodyParts.rightArm && animated.bodyParts.rightArm) {
                monster.bodyParts.rightArm.rotation.copy(animated.bodyParts.rightArm.rotation);
            }
            if (monster.bodyParts.leftLeg && animated.bodyParts.leftLeg) {
                monster.bodyParts.leftLeg.rotation.copy(animated.bodyParts.leftLeg.rotation);
            }
            if (monster.bodyParts.rightLeg && animated.bodyParts.rightLeg) {
                monster.bodyParts.rightLeg.rotation.copy(animated.bodyParts.rightLeg.rotation);
            }
            if (monster.bodyParts.leftWings && animated.bodyParts.leftWings) {
                monster.bodyParts.leftWings.forEach((wing, i) => {
                    if (animated.bodyParts.leftWings?.[i]) {
                        wing.rotation.copy(animated.bodyParts.leftWings[i].rotation);
                    }
                });
            }
            if (monster.bodyParts.rightWings && animated.bodyParts.rightWings) {
                monster.bodyParts.rightWings.forEach((wing, i) => {
                    if (animated.bodyParts.rightWings?.[i]) {
                        wing.rotation.copy(animated.bodyParts.rightWings[i].rotation);
                    }
                });
            }

            // Sync state
            monster.moveDirection = animated.moveDirection;
            monster.walkCycle = animated.walkCycle;
            monster.flyCycle = animated.flyCycle;
            monster.currentPatrolIndex = animated.currentPatrolIndex;
        }
    }

    getMonsters(): Monster[] {
        return this.monsters;
    }

    removeMonster(monster: Monster) {
        this.scene.remove(monster.model);
        const index = this.monsters.indexOf(monster);
        if (index > -1) this.monsters.splice(index, 1);
    }
}