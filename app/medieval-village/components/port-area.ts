import * as THREE from 'three';

export function createPortArea(scene: THREE.Scene): void {
    // Port landmass - at edge of water
    const landMaterial = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.7 });

    // Main port land
    const portLand = new THREE.Mesh(new THREE.PlaneGeometry(20, 18), landMaterial);
    portLand.rotation.x = -Math.PI / 2;
    portLand.position.set(-12, -0.1, 18);
    portLand.receiveShadow = true;
    scene.add(portLand);

    // Dock platform
    const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, roughness: 0.6 });
    const dockPlatform = new THREE.Mesh(new THREE.BoxGeometry(10, 0.2, 5), woodMaterial);
    dockPlatform.position.set(-12, 0, 21);
    dockPlatform.castShadow = true;
    dockPlatform.receiveShadow = true;
    scene.add(dockPlatform);

    // Dock extension (pier)
    const pier = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 7), woodMaterial);
    pier.position.set(-12, 0, 26);
    pier.castShadow = true;
    scene.add(pier);

    // Dock posts
    const postMaterial = new THREE.MeshStandardMaterial({ color: 0x6B3A1B, roughness: 0.5 });
    for (let i = -17; i <= -7; i += 2) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 1.8, 6), postMaterial);
        post.position.set(i, -0.1, 20);
        post.castShadow = true;
        scene.add(post);
    }

    for (let i = 22; i <= 30; i += 2) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 1.8, 6), postMaterial);
        post.position.set(-12, -0.1, i);
        post.castShadow = true;
        scene.add(post);
    }

    // Dock railings
    const railingMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D });
    for (let x = -16; x <= -8; x += 1.5) {
        const railingPost = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.15), railingMaterial);
        railingPost.position.set(x, 0.35, 19.5);
        railingPost.castShadow = true;
        scene.add(railingPost);
    }

    // Small boats
    const boatMaterial = new THREE.MeshStandardMaterial({ color: 0xCD853F, roughness: 0.6 });
    const boatPositions = [
        { x: -15, z: 28, rotation: 0.5 },
        { x: -9, z: 29, rotation: -0.3 },
        { x: -17, z: 26, rotation: 0.8 },
        { x: -6, z: 27, rotation: -0.6 },
    ];

    boatPositions.forEach(boat => {
        const boatHull = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.3, 1.6), boatMaterial);
        boatHull.position.set(boat.x, -0.1, boat.z);
        boatHull.rotation.y = boat.rotation;
        boatHull.castShadow = true;
        scene.add(boatHull);

        const boatMast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.9, 4), woodMaterial);
        boatMast.position.set(boat.x, 0.35, boat.z);
        boatMast.castShadow = true;
        scene.add(boatMast);
    });

    // Crates and barrels
    const crateMaterial = new THREE.MeshStandardMaterial({ color: 0xCD853F });
    const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });

    const dockItems = [
        { type: 'crate', x: -14, z: 20.5, scale: 0.5 },
        { type: 'crate', x: -13.5, z: 20.8, scale: 0.5 },
        { type: 'barrel', x: -10, z: 20.5, scale: 0.5 },
        { type: 'barrel', x: -9.5, z: 20.8, scale: 0.5 },
        { type: 'crate', x: -15, z: 21, scale: 0.5 },
        { type: 'barrel', x: -11, z: 21.2, scale: 0.5 },
    ];

    dockItems.forEach(item => {
        let mesh;
        if (item.type === 'crate') {
            mesh = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), crateMaterial);
            mesh.position.set(item.x, 0.15, item.z);
        } else {
            mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.45, 0.6, 8), barrelMaterial);
            mesh.position.set(item.x, 0.15, item.z);
        }
        mesh.scale.set(item.scale, item.scale, item.scale);
        mesh.castShadow = true;
        scene.add(mesh);
    });
}