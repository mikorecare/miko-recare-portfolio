import * as THREE from 'three';
import { CONFIG } from '../data/config';

export function createGround(scene: THREE.Scene): void {
    // Main grass ground
    const groundGeometry = new THREE.PlaneGeometry(CONFIG.ground.size, CONFIG.ground.size);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: CONFIG.ground.color,
        roughness: 0.9,
        metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = CONFIG.ground.yPosition;
    ground.receiveShadow = true;
    scene.add(ground);

    // Function to check if position is in water area
    const isInWaterArea = (x: number, z: number): boolean => {
        // Water area is around port: x between -35 and 5, z between 5 and 40
        return (x > -35 && x < 5 && z > 5 && z < 40);
    };

    // Grass patches - only on land, away from water
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x6B8E23 });
    let placed = 0;
    let attempts = 0;
    const maxGrass = 400;

    while (placed < maxGrass && attempts < 1000) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 10 + Math.random() * 40;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        // Skip water area
        if (!isInWaterArea(x, z) && Math.abs(x) < 45 && Math.abs(z) < 45) {
            const grass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.1), grassMat);
            grass.position.set(x, -0.18, z);
            grass.castShadow = true;
            scene.add(grass);
            placed++;
        }
        attempts++;
    }
}