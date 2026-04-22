import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadWoodenSigns(
    scene: THREE.Scene,
    positions: { x: number; z: number; rotation: number; direction: string }[]
): void {
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    // Load the kulaong image texture
    const kulaongTexture = textureLoader.load('/kulaong.png');

    positions.forEach((pos) => {
        loader.load(
            '/medieval-village/Wooden Sign.glb',
            (gltf) => {
                const sign = gltf.scene;
                sign.position.set(pos.x, 0, pos.z);
                sign.scale.set(0.8, 0.8, 0.8);
                sign.rotation.y = pos.rotation;
                sign.castShadow = true;

                // Find the sign board mesh and apply texture
                sign.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;
                        // Assuming the sign board is the largest mesh or has a specific name
                        if (mesh.geometry.boundingSphere?.radius &&
                            mesh.geometry.boundingSphere.radius > 0.3) {
                            // Create new material with texture
                            const material = new THREE.MeshStandardMaterial({
                                map: kulaongTexture,
                                color: 0xffffff,
                                side: THREE.DoubleSide
                            });
                            mesh.material = material;
                        }
                    }
                });

                scene.add(sign);

                // Add floating text label above sign
                const canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 64;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = 'rgba(0,0,0,0.7)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#ffaa66';
                    ctx.font = 'Bold 16px Arial';
                    ctx.fillText(pos.direction, 10, 30);
                    ctx.fillStyle = '#aaffaa';
                    ctx.font = '12px Arial';
                    ctx.fillText('Beyond the mountains', 10, 50);
                }
                const texture = new THREE.CanvasTexture(canvas);
                const material = new THREE.SpriteMaterial({ map: texture });
                const sprite = new THREE.Sprite(material);
                sprite.scale.set(1.5, 0.4, 1);
                sprite.position.set(0, 1.2, 0);
                sign.add(sprite);
            },
            undefined,
            (error) => console.error('Failed to load Wooden Sign:', error)
        );
    });
}