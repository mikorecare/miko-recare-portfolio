import * as THREE from "three";
import { MonsterConfig, BodyParts, AnimatedMonster } from "./types";

export class Monster {
    public model: THREE.Object3D;
    public config: MonsterConfig;
    public moveDirection: THREE.Vector3;
    public walkCycle: number;
    public flyCycle: number;
    public currentPatrolIndex: number;
    public bodyParts: BodyParts;

    constructor(model: THREE.Object3D, config: MonsterConfig, bodyParts: BodyParts) {
        this.model = model;
        this.config = config;
        this.bodyParts = bodyParts;
        this.moveDirection = new THREE.Vector3(0, 0, 0);
        this.walkCycle = Math.random() * Math.PI * 2;
        this.flyCycle = Math.random() * Math.PI * 2;
        this.currentPatrolIndex = 0;

        this.model.position.copy(config.position);
    }

    toAnimated(): AnimatedMonster {
        return {
            model: this.model,
            config: this.config,
            moveDirection: this.moveDirection,
            walkCycle: this.walkCycle,
            flyCycle: this.flyCycle,
            currentPatrolIndex: this.currentPatrolIndex,
            bodyParts: this.bodyParts
        };
    }
}