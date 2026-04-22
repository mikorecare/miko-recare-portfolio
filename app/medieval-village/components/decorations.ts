import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DECORATIONS } from '../data/decorations';

const GLOBAL_DECORATION_SCALE = 2;

export interface DecorationInfo {
    x: number;
    z: number;
    type: string;
}

let kulaongTexture: THREE.Texture | null = null;

if (typeof window !== 'undefined') {
    const textureLoader = new THREE.TextureLoader();
    kulaongTexture = textureLoader.load('/kulaong.png');
}

export function loadDecorations(scene: THREE.Scene): DecorationInfo[] {
    const decorationInfos: DecorationInfo[] = [];
    const loader = new GLTFLoader();

    DECORATIONS.forEach((decoration) => {
        loader.load(`/medieval-village/${decoration.path}`,
            (gltf) => {
                const model = gltf.scene;
                model.position.set(decoration.x, decoration.yOffset || -0.2, decoration.z);
                const finalScale = decoration.scale * GLOBAL_DECORATION_SCALE;
                model.scale.set(finalScale, finalScale, finalScale);
                if (decoration.rotation) model.rotation.y = decoration.rotation;
                model.castShadow = true;

                // If this is a Wooden Sign, add the texture as a separate plane on top of the board
                if (decoration.path === 'Wooden Sign.glb' && kulaongTexture) {
                    // Create a new plane with the texture
                    const texturePlane = new THREE.Mesh(
                        new THREE.PlaneGeometry(1.2, 0.6),
                        new THREE.MeshStandardMaterial({
                            map: kulaongTexture,
                            color: 0xffffff,
                            side: THREE.DoubleSide,
                            transparent: true
                        })
                    );
                    // Adjust these values to position the texture on the board
                    // y: vertical position (increase to move up, decrease to move down)
                    // z: depth (positive moves forward/closer to camera)
                    texturePlane.position.set(0, 1.65, 0.05);
                    texturePlane.scale.set(2, 2, 1);
                    model.add(texturePlane);

                    console.log('Added texture plane to sign at', decoration.x, decoration.z);
                }

                scene.add(model);
                console.log(`Loaded: ${decoration.path} at (${decoration.x}, ${decoration.z})`);

                decorationInfos.push({
                    x: decoration.x,
                    z: decoration.z,
                    type: decoration.path.replace('.glb', '')
                });
            },
            undefined,
            (error) => console.error(`Failed to load ${decoration.path}:`, error)
        );
    });

    return decorationInfos;
}