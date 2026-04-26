import * as THREE from "three";

export type MonsterConfig = {
    name: string;
    modelPath: string;
    position: THREE.Vector3;
    scale?: number;
    movement: "patrol" | "follow" | "flee" | "idle" | "fly" | "circle";
    movementParams?: {
        patrolPoints?: THREE.Vector3[];
        followTarget?: THREE.Object3D;
        followDistance?: number;
        stopDistance?: number;
        fleeFrom?: THREE.Object3D;
        speed?: number;
        radius?: number;
        flyHeight?: number;
        groundHeight?: number;
        hoverSpeed?: number;
    };
}

export type BodyParts = {
    leftLeg?: THREE.Bone | THREE.Object3D;
    rightLeg?: THREE.Bone | THREE.Object3D;
    leftArm?: THREE.Bone | THREE.Object3D;
    rightArm?: THREE.Bone | THREE.Object3D;
    body?: THREE.Bone | THREE.Object3D;
    leftWings?: THREE.Bone[];
    rightWings?: THREE.Bone[];
}

export type AnimatedMonster = {
    model: THREE.Object3D;
    config: MonsterConfig;
    moveDirection: THREE.Vector3;
    walkCycle: number;
    flyCycle: number;
    currentPatrolIndex: number;
    bodyParts: BodyParts;
}