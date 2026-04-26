import * as THREE from "three";

export function setupLighting(scene: THREE.Scene) {
  // Ambient light - soft morning blue
  const ambient = new THREE.AmbientLight(0x88aaff, 0.5);
  scene.add(ambient);

  // Main sunlight - warm morning sun
  const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
  sunLight.position.set(15, 20, 10);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.left = -20;
  sunLight.shadow.camera.right = 20;
  sunLight.shadow.camera.top = 20;
  sunLight.shadow.camera.bottom = -20;
  scene.add(sunLight);

  // Fill light from sky
  const skyFill = new THREE.PointLight(0xaaccff, 0.4);
  skyFill.position.set(0, 10, 0);
  scene.add(skyFill);

  // Warm fill from ground reflection
  const groundFill = new THREE.PointLight(0xccaa66, 0.3);
  groundFill.position.set(0, 1, 0);
  scene.add(groundFill);

  // Back rim light to highlight edges
  const rimLight = new THREE.PointLight(0xffaa88, 0.3);
  rimLight.position.set(0, 2, -5);
  scene.add(rimLight);
}