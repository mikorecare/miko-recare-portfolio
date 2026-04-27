import * as THREE from "three";
import { MutableRefObject } from "react";
import { CharacterLoader } from "./character-loader";

export function setupControls(
    camera: THREE.PerspectiveCamera,
    playerRef: MutableRefObject<THREE.Object3D | null>,
    characterLoaderRef: MutableRefObject<CharacterLoader | null>,
    isActiveRef: MutableRefObject<boolean>,
    onActionKey?: (action: string) => void // Add callback for action keys
) {
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let pointerLocked = false;
    let isGrounded = true;
    let verticalVelocity = 0;
    const gravity = 15;
    const jumpPower = 6;

    // Free camera mode
    let freeCamMode = false;
    let freeCamYaw = 0;
    let freeCamPitch = 0;
    let freeCamDistance = 8;
    let freeCamHeight = 3;

    // Action states
    let isJumping = false;
    let isDucking = false;
    let isAttacking = false;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isActiveRef.current) return;

        // Toggle free camera with V key
        if (e.code === "KeyV") {
            freeCamMode = !freeCamMode;
            if (freeCamMode) {
                // Store current camera position when entering free cam
                freeCamYaw = camera.rotation.y;
                freeCamPitch = camera.rotation.x;
            }
            return;
        }

        switch (e.code) {
            case "KeyW": moveForward = true; break;
            case "KeyS": moveBackward = true; break;
            case "KeyA": moveLeft = true; break;
            case "KeyD": moveRight = true; break;

            case "Space":
                if (characterLoaderRef.current && !isJumping && isGrounded) {
                    isJumping = true;
                    isGrounded = false;
                    playerRef.current!.position.y = -0.15;
                    verticalVelocity = jumpPower;
                    characterLoaderRef.current.playJump();
                    setTimeout(() => { isJumping = false; }, 500);
                }
                break;
            case "KeyC":
                if (characterLoaderRef.current) {
                    isDucking = !isDucking;
                    characterLoaderRef.current.playDuck();
                    // Trigger action callback for tech sign/monster interaction
                    if (onActionKey) onActionKey("duck");
                }
                break;
            case "KeyF":
                if (characterLoaderRef.current && !isAttacking) {
                    isAttacking = true;
                    characterLoaderRef.current.playAttack();
                    setTimeout(() => { isAttacking = false; }, 800);
                    // Trigger action callback for tech sign/monster interaction
                    if (onActionKey) onActionKey("attack");
                }
                break;
            case "KeyE":
                if (characterLoaderRef.current) {
                    characterLoaderRef.current.playWave();
                    if (onActionKey) onActionKey("wave");
                }
                break;
            case "KeyR":
                if (characterLoaderRef.current) {
                    characterLoaderRef.current.playYes();
                    if (onActionKey) onActionKey("yes");
                }
                break;
            case "KeyT":
                if (characterLoaderRef.current) {
                    characterLoaderRef.current.playNo();
                    if (onActionKey) onActionKey("no");
                }
                break;
            case "KeyG":
                if (characterLoaderRef.current) {
                    characterLoaderRef.current.playDeath();
                    if (onActionKey) onActionKey("death");
                }
                break;
        }

        const isMoving = moveForward || moveBackward || moveLeft || moveRight;
        const isRunning = moveForward && (moveLeft || moveRight);
        if (characterLoaderRef.current && !isJumping && !isAttacking) {
            characterLoaderRef.current.setMovement(isMoving, isRunning);
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        switch (e.code) {
            case "KeyW": moveForward = false; break;
            case "KeyS": moveBackward = false; break;
            case "KeyA": moveLeft = false; break;
            case "KeyD": moveRight = false; break;
        }

        const isMoving = moveForward || moveBackward || moveLeft || moveRight;
        if (characterLoaderRef.current && !isJumping && !isAttacking) {
            characterLoaderRef.current.setMovement(isMoving, false);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!pointerLocked) return;

        if (freeCamMode) {
            // Control free camera with mouse
            freeCamYaw -= e.movementX * 0.003;
            freeCamPitch -= e.movementY * 0.003;
            freeCamPitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, freeCamPitch));
        } else {
            // Normal mode: rotate rabbit
            if (playerRef.current) {
                playerRef.current.rotation.y -= e.movementX * 0.003;
            }
        }
    };

    const handlePointerLockChange = () => {
        pointerLocked = document.pointerLockElement !== null;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    const speed = 6;

    function update(delta: number) {
        if (!isActiveRef.current || !pointerLocked) return;
        if (!playerRef.current) return;

        // GRAVITY AND JUMP PHYSICS
        if (!isGrounded) {
            verticalVelocity -= gravity * delta;
            playerRef.current.position.y += verticalVelocity * delta;

            if (playerRef.current.position.y <= -0.15) {
                playerRef.current.position.y = -0.15;
                isGrounded = true;
                verticalVelocity = 0;
            }
        }

        // Get camera forward and right directions for movement calculation
        const cameraForward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        const cameraRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

        cameraForward.y = 0;
        cameraForward.normalize();
        cameraRight.y = 0;
        cameraRight.normalize();

        let moveDirection = new THREE.Vector3(0, 0, 0);

        if (moveForward) {
            moveDirection.x += cameraForward.x;
            moveDirection.z += cameraForward.z;
        }
        if (moveBackward) {
            moveDirection.x -= cameraForward.x;
            moveDirection.z -= cameraForward.z;
        }
        if (moveRight) {
            moveDirection.x += cameraRight.x;
            moveDirection.z += cameraRight.z;
        }
        if (moveLeft) {
            moveDirection.x -= cameraRight.x;
            moveDirection.z -= cameraRight.z;
        }

        const len = Math.hypot(moveDirection.x, moveDirection.z);
        if (len > 0) {
            moveDirection.x /= len;
            moveDirection.z /= len;

            // ALWAYS rotate rabbit to face movement direction
            const angle = Math.atan2(moveDirection.x, moveDirection.z);
            playerRef.current.rotation.y = angle;
        }

        // Move the rabbit
        playerRef.current.position.x += moveDirection.x * speed * delta;
        playerRef.current.position.z += moveDirection.z * speed * delta;

        // CAMERA CONTROL
        if (freeCamMode) {
            // Free camera - orbits around rabbit
            const x = Math.sin(freeCamYaw) * freeCamDistance;
            const z = Math.cos(freeCamYaw) * freeCamDistance;
            camera.position.x = playerRef.current.position.x + x;
            camera.position.z = playerRef.current.position.z + z;
            camera.position.y = playerRef.current.position.y + freeCamHeight + Math.sin(freeCamPitch) * 2;
            camera.lookAt(playerRef.current.position);
        } else {
            // Normal follow camera
            const cameraOffset = new THREE.Vector3(0, 3, -5);
            camera.position.copy(playerRef.current.position.clone().add(cameraOffset));
            camera.lookAt(playerRef.current.position);
        }

        if (characterLoaderRef.current) {
            characterLoaderRef.current.update(delta);
        }
    }

    const requestPointerLock = (canvas: HTMLCanvasElement) => {
        canvas.requestPointerLock();
    };

    return {
        update,
        requestPointerLock,
        cleanup: () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("pointerlockchange", handlePointerLockChange);
        }
    };
}