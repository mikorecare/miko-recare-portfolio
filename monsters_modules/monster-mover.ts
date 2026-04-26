import * as THREE from "three";
import { AnimatedMonster } from "./types";

export class MonsterMover {
    private playerRef?: THREE.Object3D;
    private lastDebugTime = 0;

    setPlayer(player: THREE.Object3D) {
        this.playerRef = player;
    }

    move(monster: AnimatedMonster, deltaTime: number) {
        const config = monster.config;
        const speed = config.movementParams?.speed || 2;

        switch (config.movement) {
            case "patrol": this.movePatrol(monster, deltaTime, speed); break;
            case "follow": this.moveFollow(monster, deltaTime, speed); break;
            case "flee": this.moveFlee(monster, deltaTime, speed); break;
            case "circle": this.moveCircle(monster, deltaTime, speed); break;
            case "fly": this.moveFly(monster, deltaTime, speed); break;
            default: this.moveIdle(monster);
        }
    }

    private movePatrol(monster: AnimatedMonster, deltaTime: number, speed: number) {
        const points = monster.config.movementParams?.patrolPoints;
        if (!points?.length) return;

        const target = points[monster.currentPatrolIndex];
        const direction = new THREE.Vector3().subVectors(target, monster.model.position);
        const distanceToTarget = direction.length();


        if (distanceToTarget < 0.5) {  // Reduced threshold from 1 to 0.5
            monster.currentPatrolIndex = (monster.currentPatrolIndex + 1) % points.length;
            monster.moveDirection.set(0, 0, 0);
        } else {
            // Force movement even if deltaTime is small
            direction.normalize();
            const moveAmount = speed * deltaTime;

            if (moveAmount > 0) {
                monster.model.position.x += direction.x * moveAmount;
                monster.model.position.z += direction.z * moveAmount;
            }

            const angle = Math.atan2(direction.x, direction.z);
            monster.model.rotation.y = angle;
            monster.moveDirection = direction;
            monster.walkCycle += deltaTime * speed * 5;
        }
    }
    private moveToward(monster: AnimatedMonster, direction: THREE.Vector3, deltaTime: number, speed: number) {
        direction.normalize();
        monster.model.position.x += direction.x * speed * deltaTime;
        monster.model.position.z += direction.z * speed * deltaTime;
        this.faceDirection(monster, direction);
        monster.moveDirection = direction;
    }

    private moveAway(monster: AnimatedMonster, direction: THREE.Vector3, deltaTime: number, speed: number) {
        direction.normalize();
        monster.model.position.x -= direction.x * speed * deltaTime * 0.5;
        monster.model.position.z -= direction.z * speed * deltaTime * 0.5;
        this.faceDirection(monster, direction);
        monster.moveDirection = direction;
    }

    private moveFollow(monster: AnimatedMonster, deltaTime: number, speed: number) {
        const target = monster.config.movementParams?.followTarget || this.playerRef;
        if (!target) return;

        const followDist = monster.config.movementParams?.followDistance || 5;
        const stopDist = monster.config.movementParams?.stopDistance || 3;
        const direction = new THREE.Vector3().subVectors(target.position, monster.model.position);
        const dist = direction.length();

        if (dist > followDist) {
            this.moveToward(monster, direction, deltaTime, speed);
            monster.walkCycle += deltaTime * speed * 5;
        } else if (dist < stopDist) {
            this.moveAway(monster, direction, deltaTime, speed);
        } else {
            this.faceTarget(monster, direction);
            monster.moveDirection.set(0, 0, 0);
        }
    }

    private moveFlee(monster: AnimatedMonster, deltaTime: number, speed: number) {
        const threat = monster.config.movementParams?.fleeFrom || this.playerRef;
        if (!threat) return;

        const direction = new THREE.Vector3().subVectors(monster.model.position, threat.position);
        this.moveToward(monster, direction, deltaTime, speed);
        monster.walkCycle += deltaTime * speed * 6;
    }

    private moveCircle(monster: AnimatedMonster, deltaTime: number, speed: number) {
        const radius = monster.config.movementParams?.radius || 5;
        const center = monster.config.position;
        const angle = (performance.now() * 0.001 * speed) % (Math.PI * 2);

        monster.model.position.x = center.x + Math.cos(angle) * radius;
        monster.model.position.z = center.z + Math.sin(angle) * radius;

        const direction = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
        this.faceDirection(monster, direction);
        monster.moveDirection = direction;
        monster.walkCycle += deltaTime * speed * 3;
    }

    private moveFly(monster: AnimatedMonster, deltaTime: number, speed: number) {
        const target = monster.config.movementParams?.followTarget || this.playerRef;
        const flyHeight = monster.config.movementParams?.flyHeight || 2.5;
        const groundHeight = monster.config.movementParams?.groundHeight || 0.5;

        if (target) {
            const direction = new THREE.Vector3().subVectors(target.position, monster.model.position);
            const dist = direction.length();
            const moveThreshold = 3;

            if (dist > moveThreshold) {
                this.moveToward(monster, direction, deltaTime, speed);
                this.adjustHeight(monster, flyHeight);
            } else {
                this.adjustHeight(monster, groundHeight);
                if (dist > 1.5) {
                    this.moveToward(monster, direction, deltaTime, speed * 0.3);
                } else {
                    monster.moveDirection.set(0, 0, 0);
                }
            }
        } else {
            this.adjustHeight(monster, flyHeight);
        }

        // Hover bob
        if (monster.model.position.y > 1) {
            monster.model.position.y += Math.sin(performance.now() * 0.003) * 0.02;
        }

        monster.flyCycle += deltaTime * 4;
    }

    private faceTarget(monster: AnimatedMonster, direction: THREE.Vector3) {
        const angle = Math.atan2(direction.x, direction.z);
        monster.model.rotation.y = angle;
    }

    private faceDirection(monster: AnimatedMonster, direction: THREE.Vector3) {
        const angle = Math.atan2(direction.x, direction.z);
        monster.model.rotation.y = angle;
    }

    private adjustHeight(monster: AnimatedMonster, targetHeight: number) {
        const targetY = (monster.config.position.y || 0) + targetHeight;
        monster.model.position.y += (targetY - monster.model.position.y) * 0.1;
    }

    private moveIdle(monster: AnimatedMonster) {
        monster.moveDirection.set(0, 0, 0);
    }
}