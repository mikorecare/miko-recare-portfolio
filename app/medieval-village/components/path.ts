import * as THREE from 'three';
import { CONFIG } from '../data/config';

export function createPath(scene: THREE.Scene): void {
  const pathMaterial = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.8 });
  for (let z = CONFIG.path.startZ; z <= CONFIG.path.endZ; z += CONFIG.path.segmentLength) {
    const pathPiece = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.path.width, 2), pathMaterial);
    pathPiece.rotation.x = -Math.PI / 2;
    pathPiece.position.set(0, -0.15, -z);
    pathPiece.receiveShadow = true;
    scene.add(pathPiece);
  }
}