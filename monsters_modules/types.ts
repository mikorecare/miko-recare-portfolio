import * as THREE from "three";

export interface MonsterAnimations {
    idle?: THREE.AnimationAction;
    walk?: THREE.AnimationAction;
    run?: THREE.AnimationAction;
    jump?: THREE.AnimationAction;
    death?: THREE.AnimationAction;
    hit?: THREE.AnimationAction;
    attack?: THREE.AnimationAction;
    fly?: THREE.AnimationAction;
    flyIdle?: THREE.AnimationAction;
    yes?: THREE.AnimationAction;
    no?: THREE.AnimationAction;
    wave?: THREE.AnimationAction;
    duck?: THREE.AnimationAction;
    weapon?: THREE.AnimationAction;
}

export interface MonsterConfig {
    name: string;
    displayName?: string;
    modelPath: string;
    position: THREE.Vector3;
    scale?: number;
    rotation?: THREE.Euler;
    movement: "patrol" | "follow" | "flee" | "idle" | "fly" | "circle" | "patrol-fly" | "ninja";
    movementParams?: {
        patrolPoints?: THREE.Vector3[];
        followTarget?: THREE.Object3D;
        followDistance?: number;
        stopDistance?: number;
        minDistance?: number;
        fleeFrom?: THREE.Object3D;
        speed?: number;
        radius?: number;
        flyHeight?: number;
        groundHeight?: number;
        hoverSpeed?: number;
    };
    isStoryMonster?: boolean;
    isNinja?: boolean;
    storyChapter?: number;
    dialog?: string;
    title?: string;
    experience?: string;
}

export interface AnimatedMonster {
    model: THREE.Object3D;
    config: MonsterConfig;
    moveDirection: THREE.Vector3;
    walkCycle: number;
    flyCycle: number;
    currentPatrolIndex: number;
    bodyParts: BodyParts;
    // Animation methods
    playJump: () => void;
    playAttack: () => void;
    playDeath: () => void;
    playHit: () => void;
    playYes: () => void;
    playNo: () => void;
    playWave: () => void;
    playWeapon?: () => void;
    setMovement: (isMoving: boolean, isRunning: boolean, isFlying: boolean) => void;
}

export interface BodyParts {
    body?: THREE.Object3D;
}