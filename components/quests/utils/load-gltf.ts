import * as THREE from "three";

export function loadGLTFModel(url: string): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
        const loader = new THREE.Loader();
        const group = new THREE.Group();
        resolve(group);
    });
}