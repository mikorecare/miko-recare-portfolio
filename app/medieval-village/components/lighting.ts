import * as THREE from 'three';
import { CONFIG } from '../data/config';

export function setupLighting(scene: THREE.Scene): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x8CB4D6, CONFIG.lighting.ambientIntensity);
    scene.add(ambientLight);

    // Sun light
    const sunLight = new THREE.DirectionalLight(0xFFF5E6, CONFIG.lighting.sunIntensity);
    sunLight.position.set(20, 25, -10);
    sunLight.castShadow = true;
    sunLight.receiveShadow = true;
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;
    scene.add(sunLight);

    // Fill light
    const fillLight = new THREE.PointLight(0x8CB4D6, CONFIG.lighting.fillIntensity);
    fillLight.position.set(0, -2, 0);
    scene.add(fillLight);

    // Back light
    const backLight = new THREE.PointLight(0xFFAA66, CONFIG.lighting.backIntensity);
    backLight.position.set(-5, 5, -8);
    scene.add(backLight);

    // Sky light
    const skyLight = new THREE.HemisphereLight(0x8CB4D6, 0x5C6E3A, 0.5);
    scene.add(skyLight);
}