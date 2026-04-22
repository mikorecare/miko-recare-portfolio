import * as THREE from 'three';

export function createWater(scene: THREE.Scene): void {
    // Deep water layer - positioned at edge of village
    const deepWaterGeometry = new THREE.PlaneGeometry(50, 40);
    const deepWaterMaterial = new THREE.MeshStandardMaterial({
        color: 0x1A3A5C,
        roughness: 0.1,
        metalness: 0.98,
        emissive: 0x0A2A4C,
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.95
    });

    const deepWater = new THREE.Mesh(deepWaterGeometry, deepWaterMaterial);
    deepWater.rotation.x = -Math.PI / 2;
    deepWater.position.set(-15, -0.35, 22);
    deepWater.receiveShadow = true;
    scene.add(deepWater);

    // Surface water layer
    const surfaceGeometry = new THREE.PlaneGeometry(48, 38);
    const surfaceMaterial = new THREE.MeshStandardMaterial({
        color: 0x4B8BBe,
        roughness: 0.2,
        metalness: 0.92,
        transparent: true,
        opacity: 0.8,
        emissive: 0x2A6A9E,
        emissiveIntensity: 0.05
    });

    const surfaceWater = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    surfaceWater.rotation.x = -Math.PI / 2;
    surfaceWater.position.set(-15, -0.3, 22);
    surfaceWater.receiveShadow = true;
    scene.add(surfaceWater);

    // Water ripples (floating particles) - these are fine, they're in water
    const rippleMaterial = new THREE.MeshStandardMaterial({
        color: 0x6BAFDE,
        emissive: 0x3A8ABE,
        emissiveIntensity: 0.15,
        transparent: true,
        opacity: 0.6
    });

    for (let i = 0; i < 200; i++) {
        const ripple = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), rippleMaterial);
        const x = -15 + (Math.random() - 0.5) * 45;
        const z = 22 + (Math.random() - 0.5) * 35;
        ripple.position.set(x, -0.28, z);
        ripple.castShadow = false;
        scene.add(ripple);
    }
}