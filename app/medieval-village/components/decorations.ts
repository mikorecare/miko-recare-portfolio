import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DECORATIONS } from '../data/decorations';

const GLOBAL_DECORATION_SCALE = 2;

export interface DecorationInfo {
    x: number;
    z: number;
    type: string;
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
                scene.add(model);

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