import * as THREE from "three";
import { MonsterConfig } from "./types";
import { Monster } from "./monster";
import { MonsterLoader } from "./monster-loader";
import { MonsterMover } from "./monster-mover";
import { NinjaMonster } from "@/ninja_modules/ninja-monster";

export class MonsterController {
    private monsters: Monster[] = [];
    private ninjaMonsters: NinjaMonster[] = [];
    private loader: MonsterLoader;
    private mover: MonsterMover;
    private scene: THREE.Scene;
    private actionIntervals: Map<Monster, NodeJS.Timeout> = new Map();
    private playerRef?: THREE.Object3D;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.loader = new MonsterLoader();
        this.mover = new MonsterMover();
    }

    setPlayer(player: THREE.Object3D) {
        this.playerRef = player;
        this.mover.setPlayer(player);
        // Set player for ninja monsters too
        for (const ninja of this.ninjaMonsters) {
            ninja.setPlayer(player);
        }
    }

    async spawnMonster(config: MonsterConfig): Promise<Monster | NinjaMonster> {
        const { model, animations } = await this.loader.loadModel(config.modelPath, config.scale);
        const bodyParts = this.loader.detectBodyParts(model);

        // Check if this is a ninja monster
        if (config.isNinja) {
            const ninjaMonster = new NinjaMonster(model, config, bodyParts, animations);
            if (this.playerRef) {
                ninjaMonster.setPlayer(this.playerRef);
            }
            this.scene.add(ninjaMonster.model);
            this.ninjaMonsters.push(ninjaMonster);
            console.log(`✅ Summoned Ninja at position:`, config.position);
            return ninjaMonster;
        }

        // Regular monster
        const monster = new Monster(model, config, bodyParts, animations);
        this.scene.add(monster.model);
        this.monsters.push(monster);
        this.startRandomActions(monster);

        return monster;
    }

    async spawnMultiple(configs: MonsterConfig[]): Promise<(Monster | NinjaMonster)[]> {
        const promises = configs.map(config => this.spawnMonster(config));
        return Promise.all(promises);
    }

    private startRandomActions(monster: Monster) {
        // Clear existing interval if any
        this.stopRandomActions(monster);

        // Schedule random actions every 3-8 seconds for variety
        const scheduleNext = () => {
            const interval = 3000 + Math.random() * 5000; // 3-8 seconds
            const timeout = setTimeout(() => {
                if (monster.model.parent) { // Monster is still in scene
                    this.playRandomAction(monster);
                    scheduleNext(); // Schedule next action
                }
            }, interval);

            // Store timeout for cleanup
            (monster as any)._actionTimeout = timeout;
            this.actionIntervals.set(monster, timeout as any);
        };

        scheduleNext();
    }

    private stopRandomActions(monster: Monster) {
        const timeout = this.actionIntervals.get(monster);
        if (timeout) {
            clearTimeout(timeout);
            this.actionIntervals.delete(monster);
        }
        if ((monster as any)._actionTimeout) {
            clearTimeout((monster as any)._actionTimeout);
        }
    }

    private playRandomAction(monster: Monster) {
        const monsterType = monster.config.name.toLowerCase();

        // Define available actions based on monster type
        let availableActions: Array<'wave' | 'yes' | 'no' | 'jump' | 'attack'> = ['wave', 'yes', 'no'];

        if (monsterType.includes('dragon') || monsterType.includes('demon') || monsterType.includes('goleling')) {
            availableActions = ['wave', 'yes', 'no', 'attack'];
        } else if (monsterType.includes('orc') || monsterType.includes('tribal')) {
            availableActions = ['wave', 'yes', 'no', 'jump', 'attack'];
        } else if (monsterType.includes('yeti') || monsterType.includes('wizard')) {
            availableActions = ['wave', 'yes', 'no'];
        } else if (monsterType.includes('alien')) {
            availableActions = ['wave', 'yes', 'no', 'attack'];
        } else if (monsterType.includes('chicken')) {
            availableActions = ['wave', 'yes', 'no', 'jump'];
        }

        // Randomly select an action
        const randomAction = availableActions[Math.floor(Math.random() * availableActions.length)];

        // Play the action
        switch (randomAction) {
            case 'wave':
                monster.playWave();
                break;
            case 'yes':
                monster.playYes();
                break;
            case 'no':
                monster.playNo();
                break;
            case 'jump':
                monster.playJump();
                break;
            case 'attack':
                monster.playAttack();
                break;
        }
    }

    playNearestMonsterAction(action: 'jump' | 'attack' | 'death' | 'hit' | 'yes' | 'no' | 'wave', playerPosition: THREE.Vector3, range: number = 5) {
        let nearestMonster: Monster | null = null;
        let nearestDistance = range;

        for (const monster of this.monsters) {
            const distance = playerPosition.distanceTo(monster.model.position);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestMonster = monster;
            }
        }

        if (nearestMonster) {
            switch (action) {
                case 'jump': nearestMonster.playJump(); break;
                case 'attack': nearestMonster.playAttack(); break;
                case 'death': nearestMonster.playDeath(); break;
                case 'hit': nearestMonster.playHit(); break;
                case 'yes': nearestMonster.playYes(); break;
                case 'no': nearestMonster.playNo(); break;
                case 'wave': nearestMonster.playWave(); break;
            }
        }
    }

    getMonsters(): Monster[] {
        return this.monsters;
    }

    getNinjaMonsters(): NinjaMonster[] {
        return this.ninjaMonsters;
    }

    removeMonster(monster: Monster) {
        this.stopRandomActions(monster);
        this.scene.remove(monster.model);
        const index = this.monsters.indexOf(monster);
        if (index > -1) this.monsters.splice(index, 1);
    }

    removeNinjaMonster(ninja: NinjaMonster) {
        this.scene.remove(ninja.model);
        const index = this.ninjaMonsters.indexOf(ninja);
        if (index > -1) this.ninjaMonsters.splice(index, 1);
    }

    update(deltaTime: number) {
        const safeDelta = Math.min(deltaTime, 0.033);

        // Update regular monsters
        for (const monster of this.monsters) {
            const animated = monster.toAnimated();
            this.mover.move(animated, safeDelta);

            const isMoving = animated.moveDirection.length() > 0.1;
            const isFlying = monster.config.movement === "fly" || monster.config.movement === "patrol-fly";
            const isRunning = isMoving && (animated.moveDirection.length() > 0.5);

            monster.setMovement(isMoving, isRunning, isFlying);
            monster.update(safeDelta);

            monster.moveDirection = animated.moveDirection;
            monster.walkCycle = animated.walkCycle;
            monster.flyCycle = animated.flyCycle;
            monster.currentPatrolIndex = animated.currentPatrolIndex;
        }

        // Update ninja monsters
        for (const ninja of this.ninjaMonsters) {
            ninja.update(safeDelta);
        }
    }

    cleanup() {
        // Clear all intervals
        for (const monster of this.monsters) {
            this.stopRandomActions(monster);
        }
        this.actionIntervals.clear();

        // Remove and dispose regular monsters
        for (const monster of this.monsters) {
            this.scene.remove(monster.model);

            // Dispose geometries and materials
            monster.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(m => m.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                }
            });
        }

        // Remove ninja monsters
        for (const ninja of this.ninjaMonsters) {
            this.scene.remove(ninja.model);
        }

        this.monsters = [];
        this.ninjaMonsters = [];
    }
}