import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { CONFIG } from '../data/config';

export function useFirstPersonControls(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    collisionObjects: { x: number; z: number; radius: number }[],
    setIsPointerLock: (locked: boolean) => void
) {
    const keyState = useRef({ w: false, a: false, s: false, d: false });
    const mouseState = useRef({ x: 0, y: 0 });
    const rotationState = useRef({ yaw: -Math.PI / 2, pitch: 0 });
    const lastTime = useRef(performance.now());
    const bobTime = useRef(0);

    const checkCollision = (newX: number, newZ: number): boolean => {
        for (const obj of collisionObjects) {
            const dx = newX - obj.x;
            const dz = newZ - obj.z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            if (distance < obj.radius + CONFIG.movement.playerRadius) return true;
        }
        return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'KeyW': keyState.current.w = true; break;
            case 'KeyA': keyState.current.a = true; break;
            case 'KeyS': keyState.current.s = true; break;
            case 'KeyD': keyState.current.d = true; break;
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'KeyW': keyState.current.w = false; break;
            case 'KeyA': keyState.current.a = false; break;
            case 'KeyS': keyState.current.s = false; break;
            case 'KeyD': keyState.current.d = false; break;
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (document.pointerLockElement === renderer.domElement) {
            mouseState.current.x += e.movementX * CONFIG.camera.mouseSpeed;
            mouseState.current.y += e.movementY * CONFIG.camera.mouseSpeed;
            mouseState.current.y = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, mouseState.current.y));
            rotationState.current.yaw = mouseState.current.x;
            rotationState.current.pitch = mouseState.current.y;
            camera.rotation.order = 'YXZ';
            camera.rotation.y = rotationState.current.yaw;
            camera.rotation.x = rotationState.current.pitch;
        }
    };

    const handleClick = () => {
        renderer.domElement.requestPointerLock();
        setIsPointerLock(true);
    };

    const handlePointerLockChange = () => {
        if (document.pointerLockElement !== renderer.domElement) {
            setIsPointerLock(false);
        }
    };

    useEffect(() => {
        renderer.domElement.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('pointerlockchange', handlePointerLockChange);

        return () => {
            renderer.domElement.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
        };
    }, []);

    const updateMovement = () => {
        const now = performance.now();
        let delta = Math.min(0.033, (now - lastTime.current) / 1000);
        lastTime.current = now;

        const actualSpeed = CONFIG.movement.speed * delta;
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();

        camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        right.crossVectors(new THREE.Vector3(0, 1, 0), forward);
        right.normalize();

        let moveDelta = new THREE.Vector3(0, 0, 0);
        const isMoving = keyState.current.w || keyState.current.s || keyState.current.a || keyState.current.d;

        if (keyState.current.w) moveDelta.add(forward);
        if (keyState.current.s) moveDelta.sub(forward);
        if (keyState.current.d) moveDelta.sub(right);
        if (keyState.current.a) moveDelta.add(right);

        if (moveDelta.length() > 0) {
            moveDelta.normalize();
            moveDelta.multiplyScalar(actualSpeed);

            let newX = camera.position.x + moveDelta.x;
            if (!checkCollision(newX, camera.position.z)) camera.position.x = newX;

            let newZ = camera.position.z + moveDelta.z;
            if (!checkCollision(camera.position.x, newZ)) camera.position.z = newZ;
        }

        // Camera bob
        if (isMoving) {
            bobTime.current += delta * 10;
            camera.position.y = CONFIG.camera.height + Math.sin(bobTime.current) * CONFIG.camera.bobAmount;
        } else {
            bobTime.current = 0;
            camera.position.y = CONFIG.camera.height;
        }
    };

    return { updateMovement };
}