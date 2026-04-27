import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let sunModelRef: THREE.Object3D | null = null;

export function addSun(scene: THREE.Scene) {
    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    sunLight.position.set(20, 30, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x88aaff, 0.5);
    scene.add(ambientLight);

    const groundFill = new THREE.PointLight(0xccaa66, 0.3);
    groundFill.position.set(0, -1, 0);
    scene.add(groundFill);

    const loader = new GLTFLoader();
    loader.load(
        "/medieval-village/Sun With Island.glb",
        (gltf) => {
            sunModelRef = gltf.scene;
            sunModelRef.position.set(18, 100, -25);
            sunModelRef.scale.set(0.1, 0.1, 0.1);

            const glowGeometry = new THREE.SphereGeometry(2.2, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0xffaa66,
                transparent: true,
                opacity: 0.15,
                side: THREE.BackSide,
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            sunModelRef.add(glow);
            scene.add(sunModelRef);
        },
        undefined,
        (error) => {
            console.error("Error loading Sun With Island model:", error);
            const sunMat = new THREE.MeshStandardMaterial({ color: 0xffdd88, emissive: 0xffaa44 });
            const sunDisk = new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 16), sunMat);
            sunDisk.position.set(18, 28, -25);
            scene.add(sunDisk);
        }
    );
}

export function animateSun(deltaTime: number) {
    if (sunModelRef) {
        sunModelRef.rotation.y += deltaTime * 0.1;
    }
}