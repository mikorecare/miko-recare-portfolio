import * as THREE from "three";
import { AnimatedMonster } from "@/monsters_modules/types";

export class NinjaMover {
    private playerRef?: THREE.Object3D;
    private isActionPlaying: boolean = false;
    private actionCooldown: number = 0;

    private ninjaState: {
        state: "idle" | "appearing" | "attacking" | "fleeing" | "disappearing";
        appearPosition: THREE.Vector3;
        attackTimer: number;
        fleeTimer: number;
        lastAppearTime: number;
        lastAttackTime: number;
    } = {
            state: "idle",
            appearPosition: new THREE.Vector3(),
            attackTimer: 0,
            fleeTimer: 0,
            lastAppearTime: 0,
            lastAttackTime: 0
        };

    setPlayer(player: THREE.Object3D) {
        this.playerRef = player;
    }

    move(monster: AnimatedMonster, deltaTime: number) {
        const now = Date.now();

        // Update action cooldown
        if (this.actionCooldown > 0) {
            this.actionCooldown -= deltaTime;
        } else {
            this.isActionPlaying = false;
        }

        switch (this.ninjaState.state) {
            case "idle":
                monster.model.visible = false;

                if (now - this.ninjaState.lastAppearTime > 5000 && this.playerRef) {
                    this.appearNearPlayer(monster);
                }
                break;

            case "appearing":
                monster.model.visible = true;
                this.ninjaState.state = "attacking";
                this.ninjaState.attackTimer = 0;
                break;

            case "attacking":
                this.ninjaState.attackTimer += deltaTime;

                if (this.ninjaState.attackTimer > 6 + Math.random() * 2) {
                    this.ninjaState.state = "fleeing";
                    this.ninjaState.fleeTimer = 0;
                } else {
                    // Only perform attack if not already playing an action
                    if (!this.isActionPlaying && now - this.ninjaState.lastAttackTime > 1500) {
                        this.performRandomAttack(monster);
                        this.ninjaState.lastAttackTime = now;
                        this.isActionPlaying = true;
                        this.actionCooldown = 1.0;
                    }
                }
                break;

            case "fleeing":
                this.ninjaState.fleeTimer += deltaTime;

                if (this.playerRef) {
                    this.fleeFromPlayer(monster, deltaTime);
                }

                if (this.ninjaState.fleeTimer > 6 + Math.random() * 2) {
                    this.ninjaState.state = "disappearing";
                }
                break;

            case "disappearing":
                monster.model.visible = false;
                this.ninjaState.state = "idle";
                this.ninjaState.lastAppearTime = now;
                break;
        }
    }

    private appearNearPlayer(monster: AnimatedMonster) {
        if (!this.playerRef) return;

        const angle = Math.random() * Math.PI * 2;
        const distance = 8 + Math.random() * 10;
        const x = this.playerRef.position.x + Math.cos(angle) * distance;
        const z = this.playerRef.position.z + Math.sin(angle) * distance;

        monster.model.position.set(x, -0.18, z);
        this.ninjaState.appearPosition = monster.model.position.clone();
        this.ninjaState.state = "appearing";

        // Play jump animation when appearing
        this.isActionPlaying = true;
        this.actionCooldown = 1.0;
        monster.playJump();

        // Reset action flag after animation duration
        setTimeout(() => {
            this.isActionPlaying = false;
            this.actionCooldown = 0;
        }, 1000);
    }

    private performRandomAttack(monster: AnimatedMonster) {
        const attacks = ["attack", "wave", "yes", "no", "jump", "weapon"];
        const randomAttack = attacks[Math.floor(Math.random() * attacks.length)];

        // Play the attack
        switch (randomAttack) {
            case "attack":
                monster.playAttack();
                // Attack animation takes ~800ms
                setTimeout(() => {
                    this.isActionPlaying = false;
                    this.actionCooldown = 0;
                }, 800);
                break;
            case "wave":
                monster.playWave();
                setTimeout(() => {
                    this.isActionPlaying = false;
                    this.actionCooldown = 0;
                }, 1000);
                break;
            case "yes":
                monster.playYes();
                setTimeout(() => {
                    this.isActionPlaying = false;
                    this.actionCooldown = 0;
                }, 1000);
                break;
            case "no":
                monster.playNo();
                setTimeout(() => {
                    this.isActionPlaying = false;
                    this.actionCooldown = 0;
                }, 1000);
                break;
            case "jump":
                monster.playJump();
                setTimeout(() => {
                    this.isActionPlaying = false;
                    this.actionCooldown = 0;
                }, 1000);
                break;
            case "weapon":
                if (monster.playWeapon) {
                    monster.playWeapon();
                    setTimeout(() => {
                        this.isActionPlaying = false;
                        this.actionCooldown = 0;
                    }, 800);
                }
                break;
        }

        // Face the player during attack
        if (this.playerRef) {
            const direction = new THREE.Vector3().subVectors(
                this.playerRef.position,
                monster.model.position
            );
            const angle = Math.atan2(direction.x, direction.z);
            monster.model.rotation.y = angle;
        }
    }

    private fleeFromPlayer(monster: AnimatedMonster, deltaTime: number) {
        if (!this.playerRef) return;

        const fleeDir = new THREE.Vector3().subVectors(
            monster.model.position,
            this.playerRef.position
        ).normalize();

        const speed = 12.0;
        monster.model.position.x += fleeDir.x * speed * deltaTime;
        monster.model.position.z += fleeDir.z * speed * deltaTime;

        monster.setMovement(true, true, false);

        const angle = Math.atan2(fleeDir.x, fleeDir.z);
        monster.model.rotation.y = angle;
    }
}