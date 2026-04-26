import * as THREE from "three";
import { MutableRefObject } from "react";

export function setupControls(camera: THREE.PerspectiveCamera, isActiveRef: MutableRefObject<boolean>) {
  let moveForward = false;
  let moveBackward = false;
  let moveLeft = false;
  let moveRight = false;
  let yaw = 0;
  let pitch = 0;
  let pointerLocked = false;

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW": moveForward = true; break;
      case "KeyS": moveBackward = true; break;
      case "KeyA": moveLeft = true; break;
      case "KeyD": moveRight = true; break;
    }
  };
  
  const handleKeyUp = (e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW": moveForward = false; break;
      case "KeyS": moveBackward = false; break;
      case "KeyA": moveLeft = false; break;
      case "KeyD": moveRight = false; break;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!pointerLocked) return;
    yaw -= e.movementX * 0.002;
    pitch -= e.movementY * 0.002;
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
  };

  const handlePointerLockChange = () => {
    pointerLocked = document.pointerLockElement !== null;
    if (pointerLocked) {
      yaw = camera.rotation.y;
      pitch = camera.rotation.x;
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("pointerlockchange", handlePointerLockChange);

  const speed = 12;
  let lastTime = performance.now();

  function update(delta: number) {
    if (!isActiveRef.current || !pointerLocked) return;

    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    const forward = new THREE.Vector3(0, 0, -1);
    const right = new THREE.Vector3(1, 0, 0);
    
    forward.applyQuaternion(camera.quaternion);
    right.applyQuaternion(camera.quaternion);
    
    forward.y = 0;
    forward.normalize();
    right.y = 0;
    right.normalize();

    let moveX = 0;
    let moveZ = 0;
    
    if (moveForward) {
      moveX += forward.x;
      moveZ += forward.z;
    }
    if (moveBackward) {
      moveX -= forward.x;
      moveZ -= forward.z;
    }
    if (moveRight) {
      moveX += right.x;
      moveZ += right.z;
    }
    if (moveLeft) {
      moveX -= right.x;
      moveZ -= right.z;
    }
    
    const len = Math.hypot(moveX, moveZ);
    if (len > 0) {
      moveX /= len;
      moveZ /= len;
    }
    
    const moveSpeed = speed * delta;
    
    camera.position.x += moveX * moveSpeed;
    camera.position.z += moveZ * moveSpeed;
    
    camera.position.x = Math.max(-4, Math.min(4, camera.position.x));
    camera.position.z = Math.max(-92, Math.min(92, camera.position.z));

    camera.position.y = 1.6
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