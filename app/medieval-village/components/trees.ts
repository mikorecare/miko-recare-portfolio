import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CONFIG } from '../data/config';

export function createTrees(
    scene: THREE.Scene,
    collisionObjects: { x: number; z: number; radius: number }[]
): { x: number; z: number }[] {
    const treePositions: { x: number; z: number }[] = [];
    const loader = new GLTFLoader();

    const isInRestrictedArea = (x: number, z: number): boolean => {
        // Water area
        if (x > -35 && x < 5 && z > 5 && z < 40) return true;
        // Port land area
        if (x > -20 && x < -5 && z > 15 && z < 30) return true;
        // Village center
        if (Math.abs(x) < 14 && Math.abs(z) < 14) return true;
        // Second village area
        if (x > 60 && x < 100 && z > 40 && z < 80) return true;
        // Path area from start to village (keep path clear)
        if (x > -110 && x < 10 && z > -10 && z < 40) return true;
        return false;
    };

    loader.load('/medieval-village/Pine Trees.glb',
        (gltf) => {
            let placed = 0;
            let attempts = 0;
            const maxAttempts = 600;

            while (placed < CONFIG.trees.count && attempts < maxAttempts) {
                const angle = Math.random() * Math.PI * 2;
                const radius = CONFIG.trees.minRadius + Math.random() * CONFIG.trees.maxRadius;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                if (!isInRestrictedArea(x, z)) {
                    const tree = gltf.scene.clone();
                    tree.position.set(x, 0, z);
                    const scale = 2.5 + Math.random() * 1.5;
                    tree.scale.set(scale, scale, scale);
                    tree.castShadow = true;
                    scene.add(tree);
                    collisionObjects.push({ x, z, radius: 1.0 });
                    treePositions.push({ x, z });
                    placed++;
                }
                attempts++;
            }
        },
        undefined,
        (error) => {
            console.error('Failed to load Pine Trees:', error);
            // Fallback trees
            const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
            const treeTopMat = new THREE.MeshStandardMaterial({ color: 0x3A7D2C });

            let placed = 0;
            let attempts = 0;
            const maxAttempts = 600;

            while (placed < CONFIG.trees.count && attempts < maxAttempts) {
                const angle = Math.random() * Math.PI * 2;
                const radius = CONFIG.trees.minRadius + Math.random() * CONFIG.trees.maxRadius;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                if (!isInRestrictedArea(x, z)) {
                    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 3.0, 6), treeTrunkMat);
                    trunk.position.set(x, 0, z);
                    trunk.castShadow = true;
                    scene.add(trunk);
                    collisionObjects.push({ x, z, radius: 0.8 });

                    const top = new THREE.Mesh(new THREE.ConeGeometry(1.0, 2.5, 8), treeTopMat);
                    top.position.set(x, 1.8, z);
                    top.castShadow = true;
                    scene.add(top);
                    treePositions.push({ x, z });
                    placed++;
                }
                attempts++;
            }
        }
    );

    return treePositions;
}