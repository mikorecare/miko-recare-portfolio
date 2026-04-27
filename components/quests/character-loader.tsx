// character-loader.ts
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export interface CharacterAnimations {
  idle?: THREE.AnimationAction;
  walk?: THREE.AnimationAction;
  run?: THREE.AnimationAction;
  jump?: THREE.AnimationAction;
  death?: THREE.AnimationAction;
  wave?: THREE.AnimationAction;
  duck?: THREE.AnimationAction;
  attack?: THREE.AnimationAction;
  yes?: THREE.AnimationAction;
  no?: THREE.AnimationAction;
}

export class CharacterLoader {
  private loader: GLTFLoader;
  private mixer: THREE.AnimationMixer | null = null;
  private animations: CharacterAnimations = {};
  private currentAction: THREE.AnimationAction | null = null;
  private isActionPlaying: boolean = false;

  constructor() {
    this.loader = new GLTFLoader();
  }

  async loadCharacter(
    path: string,
    scene: THREE.Scene,
    scale: number = 0.3,
  ): Promise<THREE.Object3D> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => {
          const character = gltf.scene;
          character.scale.set(scale, scale, scale);

          character.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          if (gltf.animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(character);

            gltf.animations.forEach((clip) => {
              const name = clip.name.toLowerCase();

              if (name.includes("idle")) {
                this.animations.idle = this.mixer!.clipAction(clip);
              } else if (name.includes("walk") && !name.includes("run")) {
                this.animations.walk = this.mixer!.clipAction(clip);
              } else if (name.includes("run")) {
                this.animations.run = this.mixer!.clipAction(clip);
              } else if (name.includes("jump") && !name.includes("idle")) {
                this.animations.jump = this.mixer!.clipAction(clip);
              } else if (name.includes("death")) {
                this.animations.death = this.mixer!.clipAction(clip);
              } else if (name.includes("wave")) {
                this.animations.wave = this.mixer!.clipAction(clip);
              } else if (name.includes("duck")) {
                this.animations.duck = this.mixer!.clipAction(clip);
              } else if (
                name.includes("punch") ||
                name.includes("attack") ||
                name.includes("chop")
              ) {
                this.animations.attack = this.mixer!.clipAction(clip);
              } else if (name.includes("yes")) {
                this.animations.yes = this.mixer!.clipAction(clip);
              } else if (name.includes("no")) {
                this.animations.no = this.mixer!.clipAction(clip);
              }
            });

            this.playAnimation("idle");
          }

          scene.add(character);
          resolve(character);
        },
        undefined,
        (error) => {
          console.error("Error loading character:", error);
          reject(error);
        },
      );
    });
  }

  playAnimation(
    animationName: keyof CharacterAnimations,
    crossFadeTime: number = 0.2,
    loop: boolean = true,
  ) {
    const newAction = this.animations[animationName];
    if (!newAction || newAction === this.currentAction) return;

    // Set loop mode
    if (loop) {
      newAction.setLoop(THREE.LoopRepeat, Infinity);
    } else {
      newAction.setLoop(THREE.LoopOnce, 1);
      newAction.clampWhenFinished = true;
    }

    if (this.currentAction) {
      this.currentAction.crossFadeTo(newAction, crossFadeTime, true);
    }
    newAction.reset().play();
    this.currentAction = newAction;
  }

  setMovement(isMoving: boolean, isRunning: boolean = false) {
    if (this.isActionPlaying) return;

    if (isMoving) {
      if (isRunning && this.animations.run) {
        this.playAnimation("run");
      } else if (this.animations.walk) {
        this.playAnimation("walk");
      }
    } else {
      this.playAnimation("idle");
    }
  }

  update(deltaTime: number) {
    if (this.mixer) {
      this.mixer.update(deltaTime);
    }
  }

  private playActionAnimation(
    animationName: keyof CharacterAnimations,
    duration: number,
    loop: boolean = false,
  ) {
    if (!this.animations[animationName]) return;

    this.isActionPlaying = true;
    this.playAnimation(animationName, 0.2, loop);

    setTimeout(() => {
      this.isActionPlaying = false;
      if (this.currentAction === this.animations[animationName]) {
        this.playAnimation("idle");
      }
    }, duration);
  }

  playWave() {
    this.playActionAnimation("wave", 1000);
  }

  playJump() {
    this.playActionAnimation("jump", 500);
  }

  playDuck() {
    this.playActionAnimation("duck", 1000);
  }

  playAttack() {
    this.playActionAnimation("attack", 800);
  }

  playYes() {
    this.playActionAnimation("yes", 1000);
  }

  playNo() {
    this.playActionAnimation("no", 1000);
  }

  playDeath() {
    this.playActionAnimation("death", 2000, false);
  }

  dispose() {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer = null;
    }
  }
}
