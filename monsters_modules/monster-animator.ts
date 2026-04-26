import * as THREE from "three";
import { AnimatedMonster } from "./types";

export class MonsterAnimator {

    animate(monster: AnimatedMonster, deltaTime: number) {
        const isMoving = monster.moveDirection.length() > 0.1;

        if (monster.config.movement === "fly") {
            this.animateFlying(monster, deltaTime);
        } else if (isMoving) {
            this.animateWalking(monster);
        } else {
            this.animateIdle(monster);
        }
    }

    private animateFlying(monster: AnimatedMonster, deltaTime: number) {
        monster.flyCycle += deltaTime * 4;

        const isNearGround = monster.model.position.y < 1.5;
        const isMoving = monster.moveDirection.length() > 0.1;

        let flapSpeed = 0.1, flapAmp = 0.8;
        if (isNearGround) { flapSpeed = 0.05; flapAmp = 0.4; }
        else if (!isMoving) { flapSpeed = 0.07; flapAmp = 0.5; }

        monster.flyCycle += flapSpeed;
        const flapAngle = Math.sin(monster.flyCycle) * flapAmp;
        const slowSwing = Math.sin(monster.flyCycle * 0.5) * 0.3;

        // Wings
        this.animateWings(monster.bodyParts, flapAngle);

        // Arms (if they exist)
        if (monster.bodyParts.leftArm && monster.bodyParts.rightArm) {
            this.animateFlyingArms(monster.bodyParts, isNearGround, isMoving, slowSwing);
        }

        // Dangling legs
        if (monster.bodyParts.leftLeg) {
            monster.bodyParts.leftLeg.rotation.x = Math.sin(monster.flyCycle * 2) * 0.2;
            monster.bodyParts.rightLeg!.rotation.x = Math.sin(monster.flyCycle * 2) * 0.2;
        }
    }

    private animateWings(parts: any, flapAngle: number) {
        if (parts.leftWings) {
            parts.leftWings.forEach((wing: THREE.Bone, i: number) => {
                const f = 1 - i * 0.2;
                wing.rotation.z = flapAngle * f;
                wing.rotation.x = Math.sin(Date.now() * 0.01) * 0.1 * f;
            });
        }
        if (parts.rightWings) {
            parts.rightWings.forEach((wing: THREE.Bone, i: number) => {
                const f = 1 - i * 0.2;
                wing.rotation.z = -flapAngle * f;
                wing.rotation.x = -Math.sin(Date.now() * 0.01) * 0.1 * f;
            });
        }
    }

    private animateFlyingArms(parts: any, isNearGround: boolean, isMoving: boolean, swing: number) {
        if (isNearGround) {
            parts.leftArm.rotation.x = swing * 0.5;
            parts.rightArm.rotation.x = -swing * 0.5;
        } else if (isMoving) {
            parts.leftArm.rotation.x = swing * 0.4;
            parts.rightArm.rotation.x = -swing * 0.4;
            parts.leftArm.rotation.z = -0.2;
            parts.rightArm.rotation.z = -0.2;
        } else {
            parts.leftArm.rotation.x = swing * 0.6;
            parts.rightArm.rotation.x = -swing * 0.6;
        }
    }

    private animateWalking(monster: AnimatedMonster) {
        if (monster.moveDirection.length() === 0) {
            this.resetArms(monster.bodyParts);
            return;
        }

        monster.walkCycle += 0.1;
        const armSwing = Math.sin(monster.walkCycle) * 0.8;
        const legSwing = Math.sin(monster.walkCycle) * 0.6;

        if (monster.bodyParts.leftArm) {
            monster.bodyParts.leftArm.rotation.x = -armSwing;
            monster.bodyParts.rightArm!.rotation.x = armSwing;
        }
        if (monster.bodyParts.leftLeg) {
            monster.bodyParts.leftLeg.rotation.x = legSwing;
            monster.bodyParts.rightLeg!.rotation.x = -legSwing;
        }
    }

    private animateIdle(monster: AnimatedMonster) {
        // Breathing - keep slow
        if (monster.bodyParts.body) {
            const breath = Math.sin(Date.now() * 0.002) * 0.05;
            monster.bodyParts.body.scale.y = 1 + breath;
        }

        // Idle wing flutter - FASTER (was 0.001, now 0.003)
        if (monster.bodyParts.leftWings) {
            const cycle = (Date.now() * 0.003) % (Math.PI * 2);  // 3x faster
            const angle = Math.sin(cycle) * 0.5;  // Larger amplitude (was 0.3)

            monster.bodyParts.leftWings.forEach((wing, index) => {
                const segmentFactor = 1 - (index * 0.15);
                wing.rotation.z = angle * segmentFactor;
                // Add slight x rotation for more natural look
                wing.rotation.x = Math.sin(cycle * 1.5) * 0.1 * segmentFactor;
            });

            monster.bodyParts.rightWings?.forEach((wing, index) => {
                const segmentFactor = 1 - (index * 0.15);
                wing.rotation.z = -angle * segmentFactor;
                wing.rotation.x = -Math.sin(cycle * 1.5) * 0.1 * segmentFactor;
            });
        }

        // Idle arm sway - FASTER (was 0.0015, now 0.003)
        if (monster.bodyParts.leftArm && !monster.bodyParts.leftWings?.length) {
            const cycle = (Date.now() * 0.003) % (Math.PI * 2);  // 2x faster
            const swing = Math.sin(cycle) * 0.25;  // Larger swing (was 0.15)

            monster.bodyParts.leftArm.rotation.x = swing;
            monster.bodyParts.rightArm!.rotation.x = -swing;

            // Add slight z rotation for more natural movement
            monster.bodyParts.leftArm.rotation.z = Math.sin(cycle * 2) * 0.05;
            monster.bodyParts.rightArm!.rotation.z = -Math.sin(cycle * 2) * 0.05;
        }

        // Gentle leg movement - slightly faster
        if (monster.bodyParts.leftLeg) {
            const cycle = (Date.now() * 0.002) % (Math.PI * 2);
            const legSwing = Math.sin(cycle) * 0.08;
            monster.bodyParts.leftLeg.rotation.x = legSwing;
            monster.bodyParts.rightLeg!.rotation.x = -legSwing;
        }
    }
    private resetArms(parts: any) {
        if (parts.leftArm) {
            parts.leftArm.rotation.x = 0;
            parts.leftArm.rotation.z = 0;
            parts.rightArm!.rotation.x = 0;
            parts.rightArm!.rotation.z = 0;
        }
        if (parts.leftLeg) {
            parts.leftLeg.rotation.x = 0;
            parts.rightLeg!.rotation.x = 0;
        }
    }
}