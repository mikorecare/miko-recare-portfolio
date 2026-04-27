// monster-animation-loader.ts
import * as THREE from "three";

export interface MonsterAnimations {
    // Movement
    idle?: THREE.AnimationAction;
    walk?: THREE.AnimationAction;
    run?: THREE.AnimationAction;
    fly?: THREE.AnimationAction;
    flyIdle?: THREE.AnimationAction;

    // Actions
    jump?: THREE.AnimationAction;
    attack?: THREE.AnimationAction;
    death?: THREE.AnimationAction;
    hit?: THREE.AnimationAction;
    duck?: THREE.AnimationAction;

    // Emotes
    yes?: THREE.AnimationAction;
    no?: THREE.AnimationAction;
    wave?: THREE.AnimationAction;
    dance?: THREE.AnimationAction;

    // Special
    weapon?: THREE.AnimationAction;
    headbutt?: THREE.AnimationAction;
    bite?: THREE.AnimationAction;
}

export class MonsterAnimationLoader {
    private mixer: THREE.AnimationMixer | null = null;
    private animations: MonsterAnimations = {};
    private currentAction: THREE.AnimationAction | null = null;
    private isActionPlaying: boolean = false;

    setupAnimations(model: THREE.Object3D, animationClips: THREE.AnimationClip[]): void {
        if (animationClips.length === 0) {
            return;
        }

        this.mixer = new THREE.AnimationMixer(model);

        animationClips.forEach((clip) => {
            const name = clip.name.toLowerCase();

            // Movement
            if (name.includes("idle") && !name.includes("fly")) this.animations.idle = this.mixer!.clipAction(clip);
            else if (name.includes("walk")) this.animations.walk = this.mixer!.clipAction(clip);
            else if (name.includes("run")) this.animations.run = this.mixer!.clipAction(clip);
            else if (name.includes("fast_flying")) this.animations.fly = this.mixer!.clipAction(clip);
            else if (name.includes("flying_idle")) this.animations.flyIdle = this.mixer!.clipAction(clip);

            // Actions
            else if (name.includes("jump")) this.animations.jump = this.mixer!.clipAction(clip);
            else if (name.includes("punch") || name.includes("headbutt")) this.animations.attack = this.mixer!.clipAction(clip);
            else if (name.includes("death")) this.animations.death = this.mixer!.clipAction(clip);
            else if (name.includes("hit")) this.animations.hit = this.mixer!.clipAction(clip);
            else if (name.includes("duck")) this.animations.duck = this.mixer!.clipAction(clip);

            // Emotes
            else if (name.includes("yes")) this.animations.yes = this.mixer!.clipAction(clip);
            else if (name.includes("no")) this.animations.no = this.mixer!.clipAction(clip);
            else if (name.includes("wave")) this.animations.wave = this.mixer!.clipAction(clip);
            else if (name.includes("dance")) this.animations.dance = this.mixer!.clipAction(clip);

            // Special
            else if (name.includes("weapon")) this.animations.weapon = this.mixer!.clipAction(clip);
            else if (name.includes("bite")) this.animations.bite = this.mixer!.clipAction(clip);
        });

        this.playAnimation("idle");
    }

    playAnimation(animationName: keyof MonsterAnimations, crossFadeTime: number = 0.2, loop: boolean = true) {
        const newAction = this.animations[animationName];
        if (!newAction || newAction === this.currentAction) return;

        newAction.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
        if (!loop) newAction.clampWhenFinished = true;

        if (this.currentAction) {
            this.currentAction.crossFadeTo(newAction, crossFadeTime, true);
        }
        newAction.reset().play();
        this.currentAction = newAction;
    }

    setMovement(isMoving: boolean, isRunning: boolean = false, isFlying: boolean = false) {
        if (this.isActionPlaying) return;

        if (isFlying && this.animations.fly) {
            this.playAnimation("fly");
        } else if (isMoving) {
            if (isRunning && this.animations.run) {
                this.playAnimation("run");
            } else if (this.animations.walk) {
                this.playAnimation("walk");
            }
        } else {
            if (isFlying && this.animations.flyIdle) {
                this.playAnimation("flyIdle");
            } else if (this.animations.idle) {
                this.playAnimation("idle");
            }
        }
    }

    private playActionAnimation(animationName: keyof MonsterAnimations, duration: number) {
        if (!this.animations[animationName]) return;

        this.isActionPlaying = true;
        this.playAnimation(animationName, 0.2, false);

        setTimeout(() => {
            this.isActionPlaying = false;
            if (this.currentAction === this.animations[animationName]) {
                this.playAnimation("idle");
            }
        }, duration);
    }

    playJump() { this.playActionAnimation("jump", 1000); }
    playAttack() { this.playActionAnimation("attack", 800); }
    playDeath() { this.playActionAnimation("death", 1500); }
    playHit() { this.playActionAnimation("hit", 500); }
    playYes() { this.playActionAnimation("yes", 1000); }
    playNo() { this.playActionAnimation("no", 1000); }
    playWave() { this.playActionAnimation("wave", 1000); }
    playDance() { this.playActionAnimation("dance", 2000); }
    playWeapon() { this.playActionAnimation("weapon", 800); }

    update(deltaTime: number) {
        if (this.mixer) {
            this.mixer.update(deltaTime);
        }
    }

    dispose() {
        if (this.mixer) {
            this.mixer.stopAllAction();
            this.mixer = null;
        }
    }
}