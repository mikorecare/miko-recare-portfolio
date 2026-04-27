import * as THREE from "three";
import { AnimatedMonster } from "./types";

export class MonsterMover {
    private playerRef?: THREE.Object3D;
    private lastDebugTime = 0;

    setPlayer(player: THREE.Object3D) {
        this.playerRef = player;
    }

    getPlayer(): THREE.Object3D | undefined {
        return this.playerRef;
    }

    move(monster: AnimatedMonster, deltaTime: number) {
        const config = monster.config;
        const speed = config.movementParams?.speed || 2;

        switch (config.movement) {
            case "patrol": this.movePatrol(monster, deltaTime, speed); break;
            case "patrol-fly": this.movePatrolFly(monster, deltaTime, speed); break;
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

        if (distanceToTarget < 0.5) {
            monster.currentPatrolIndex = (monster.currentPatrolIndex + 1) % points.length;
            monster.moveDirection.set(0, 0, 0);
        } else {
            direction.normalize();
            const moveAmount = speed * deltaTime;

            monster.model.position.x += direction.x * moveAmount;
            monster.model.position.z += direction.z * moveAmount;

            const angle = Math.atan2(direction.x, direction.z);
            monster.model.rotation.y = angle;
            monster.moveDirection = direction;

            monster.walkCycle += deltaTime * speed * 0.8;
        }
    }

    private movePatrolFly(monster: AnimatedMonster, deltaTime: number, speed: number) {
        const points = monster.config.movementParams?.patrolPoints;
        if (!points?.length) return;

        const flyHeight = monster.config.movementParams?.flyHeight || 2.5;
        const hoverSpeed = monster.config.movementParams?.hoverSpeed || 2;

        const target = points[monster.currentPatrolIndex];
        const direction = new THREE.Vector3().subVectors(target, monster.model.position);
        const distanceToTarget = direction.length();

        // Adjust height to flying level
        this.adjustHeight(monster, flyHeight);

        // Add hovering/bobbing motion
        const hoverBob = Math.sin(Date.now() * 0.002 * hoverSpeed) * 0.15;
        monster.model.position.y += hoverBob * deltaTime;

        if (distanceToTarget < 0.8) {
            monster.currentPatrolIndex = (monster.currentPatrolIndex + 1) % points.length;
            monster.moveDirection.set(0, 0, 0);
        } else {
            direction.normalize();
            const moveAmount = speed * deltaTime;

            monster.model.position.x += direction.x * moveAmount;
            monster.model.position.z += direction.z * moveAmount;

            // Calculate angle for Y rotation (facing direction)
            const angle = Math.atan2(direction.x, direction.z);

            // ONLY update Y rotation, preserve X and Z rotations
            monster.model.rotation.y = angle;
            // monster.model.rotation.x stays as set in the constructor (-0.5)
            // monster.model.rotation.z stays as is

            monster.moveDirection = direction;

            // Wing flap animation
            monster.flyCycle += deltaTime * 4;
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

        const followDist = monster.config.movementParams?.followDistance ?? 6;
        const stopDist = monster.config.movementParams?.stopDistance ?? 4;

        const direction = new THREE.Vector3().subVectors(target.position, monster.model.position);
        const dist = direction.length();

        direction.y = 0;

        if (dist > followDist) {
            this.moveToward(monster, direction, deltaTime, speed);
            monster.walkCycle += deltaTime * speed * 5;
        } else if (dist < stopDist) {
            this.moveAway(monster, direction, deltaTime, speed);
            monster.walkCycle += deltaTime * speed * 4;
        } else {
            this.faceTarget(monster, direction);
            monster.moveDirection.set(0, 0, 0);
        }
    }

    private moveFlee(monster: AnimatedMonster, deltaTime: number, speed: number) {
        const threat = monster.config.movementParams?.fleeFrom || this.playerRef;
        if (!threat) return;

        const bounds = {
            minX: -12,
            maxX: 12,
            minZ: -80,
            maxZ: 80
        };

        const currentPos = monster.model.position;
        const threatPos = threat.position;

        let fleeDir = new THREE.Vector3().subVectors(currentPos, threatPos);

        let adjusted = false;

        if (currentPos.x < bounds.minX + 3) {
            fleeDir.x = Math.abs(fleeDir.x);
            adjusted = true;
        } else if (currentPos.x > bounds.maxX - 3) {
            fleeDir.x = -Math.abs(fleeDir.x);
            adjusted = true;
        }

        if (currentPos.z < bounds.minZ + 5) {
            fleeDir.z = Math.abs(fleeDir.z);
            adjusted = true;
        } else if (currentPos.z > bounds.maxZ - 5) {
            fleeDir.z = -Math.abs(fleeDir.z);
            adjusted = true;
        }

        if (!adjusted && fleeDir.length() < 1) {
            fleeDir = new THREE.Vector3(1, 0, 0);
        }

        fleeDir.normalize();

        monster.model.position.x += fleeDir.x * speed * deltaTime;
        monster.model.position.z += fleeDir.z * speed * deltaTime;

        const angle = Math.atan2(fleeDir.x, fleeDir.z);
        monster.model.rotation.y = angle;
        monster.moveDirection = fleeDir;
        monster.walkCycle += deltaTime * speed * 50;
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