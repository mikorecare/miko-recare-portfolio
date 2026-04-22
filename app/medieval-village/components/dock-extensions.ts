import * as THREE from 'three';

export function addDockDetails(scene: THREE.Scene): void {
    const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, roughness: 0.7 });
    const postMaterial = new THREE.MeshStandardMaterial({ color: 0x6B3A1B, roughness: 0.5 });

    // Add dock posts (pilings) in the water
    for (let i = -22; i <= -14; i += 2) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 1.8, 6), postMaterial);
        post.position.set(i, -0.1, 15);
        post.castShadow = true;
        scene.add(post);
    }

    // Dock platform
    const dockPlatform = new THREE.Mesh(new THREE.BoxGeometry(10, 0.2, 4), woodMaterial);
    dockPlatform.position.set(-18, -0.05, 14);
    dockPlatform.castShadow = true;
    dockPlatform.receiveShadow = true;
    scene.add(dockPlatform);

    // Add small boats
    const boatMaterial = new THREE.MeshStandardMaterial({ color: 0xCD853F, roughness: 0.6 });
    const boatPositions = [
        { x: -20, z: 16.5, rotation: 0.5 },
        { x: -16, z: 17, rotation: -0.3 },
        { x: -22, z: 15.5, rotation: 0.8 },
    ];

    boatPositions.forEach(boat => {
        const boatHull = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 1.5), boatMaterial);
        boatHull.position.set(boat.x, 0, boat.z);
        boatHull.rotation.y = boat.rotation;
        boatHull.castShadow = true;
        scene.add(boatHull);

        const boatMast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.8, 4), woodMaterial);
        boatMast.position.set(boat.x, 0.4, boat.z);
        boatMast.castShadow = true;
        scene.add(boatMast);
    });

    // Dock railings
    const railingMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D });
    for (let x = -23; x <= -13; x += 1.5) {
        const railingPost = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.8, 0.15), railingMaterial);
        railingPost.position.set(x, 0.3, 12.5);
        railingPost.castShadow = true;
        scene.add(railingPost);
    }
}