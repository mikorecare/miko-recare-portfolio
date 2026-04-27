import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { BodyParts } from "./types";

export class MonsterLoader {
    private loader: GLTFLoader;

    constructor() {
        this.loader = new GLTFLoader();
    }

    async loadModel(path: string, scale: number = 1.2): Promise<{ model: THREE.Object3D; animations: THREE.AnimationClip[] }> {
        return new Promise((resolve, reject) => {
            this.loader.load(path,
                (gltf) => {
                    const model = gltf.scene;
                    model.scale.set(scale, scale, scale);

                    model.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    // Store animations in the model's userData for easy access
                    model.userData = {
                        ...model.userData,
                        animations: gltf.animations,
                        animationNames: gltf.animations.map((a: any) => a.name)
                    };

                    console.log(`Loaded model ${path} with ${gltf.animations.length} animations:`,
                        gltf.animations.map((a: any) => a.name));

                    resolve({ model, animations: gltf.animations });
                },
                undefined,
                reject
            );
        });
    }

    // Simplified body parts detection - only for basic animations
    detectBodyParts(model: THREE.Object3D): BodyParts {
        const parts: BodyParts = {};

        // Simple detection for basic body parts (optional, for legacy animations)
        model.traverse((child) => {
            const name = child.name.toLowerCase();

            if (name.includes("body") || name.includes("torso")) {
                parts.body = child;
            }
        });

        return parts;
    }
}