import * as THREE from "three";

export function createMeadow(scene: THREE.Scene) {
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.FogExp2(0x87ceeb, 0.0008);

    const grassMat = new THREE.MeshStandardMaterial({ color: 0x5a9c3a, roughness: 0.9 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 500), grassMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = ground.position.y = -0.05;
    ground.receiveShadow = true;
    scene.add(ground);
}