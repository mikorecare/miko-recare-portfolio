import * as THREE from "three";
import { MonsterConfig, BodyParts, AnimatedMonster } from "@/monsters_modules/types";
import { MonsterAnimationLoader } from "@/monsters_modules/monster-animation-loader";
import { NinjaMover } from "./ninja-mover";

export class NinjaMonster implements AnimatedMonster {
    public model: THREE.Object3D;
    public config: MonsterConfig;
    public moveDirection: THREE.Vector3;
    public walkCycle: number;
    public flyCycle: number;
    public currentPatrolIndex: number;
    public bodyParts: BodyParts;

    private mover: NinjaMover;
    private animationLoader: MonsterAnimationLoader;

    constructor(model: THREE.Object3D, config: MonsterConfig, bodyParts: BodyParts, animations: THREE.AnimationClip[]) {
        this.model = model;
        this.config = config;
        this.bodyParts = bodyParts;
        this.moveDirection = new THREE.Vector3();
        this.walkCycle = 0;
        this.flyCycle = 0;
        this.currentPatrolIndex = 0;

        this.mover = new NinjaMover();
        this.animationLoader = new MonsterAnimationLoader();

        this.model.position.copy(config.position);
        this.animationLoader.setupAnimations(this.model, animations);

        this.model.visible = false;

        this.model.userData = {
            ...this.model.userData,
            isStoryMonster: config.isStoryMonster || false,
            displayName: config.displayName || config.name,
        };
    }

    setPlayer(player: THREE.Object3D) {
        this.mover.setPlayer(player);
    }

    update(deltaTime: number) {
        this.mover.move(this, deltaTime);
        this.animationLoader.update(deltaTime);
    }

    // Animation methods
    playJump() { this.animationLoader.playJump(); }
    playAttack() { this.animationLoader.playAttack(); }
    playDeath() { this.animationLoader.playDeath(); }
    playHit() { this.animationLoader.playHit(); }
    playYes() { this.animationLoader.playYes(); }
    playNo() { this.animationLoader.playNo(); }
    playWave() { this.animationLoader.playWave(); }
    playWeapon() { if (this.animationLoader.playWeapon) this.animationLoader.playWeapon(); }

    setMovement(isMoving: boolean, isRunning: boolean, isFlying: boolean) {
        this.animationLoader.setMovement(isMoving, isRunning, isFlying);
    }

    toAnimated(): AnimatedMonster {
        return {
            model: this.model,
            config: this.config,
            moveDirection: this.moveDirection,
            walkCycle: this.walkCycle,
            flyCycle: this.flyCycle,
            currentPatrolIndex: this.currentPatrolIndex,
            bodyParts: this.bodyParts,
            playJump: () => this.playJump(),
            playAttack: () => this.playAttack(),
            playDeath: () => this.playDeath(),
            playHit: () => this.playHit(),
            playYes: () => this.playYes(),
            playNo: () => this.playNo(),
            playWave: () => this.playWave(),
            playWeapon: () => this.playWeapon(),
            setMovement: (isMoving: boolean, isRunning: boolean, isFlying: boolean) =>
                this.setMovement(isMoving, isRunning, isFlying),
        };
    }
}