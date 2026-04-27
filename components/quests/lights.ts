import * as THREE from "three";

export function setupLighting(scene: THREE.Scene) {
  // Ambient light - soft morning blue
  const ambient = new THREE.AmbientLight(0x88aaff, 0.6);
  scene.add(ambient);

  // Main sunlight - warm morning sun
  const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
  sunLight.position.set(20, 30, 15);
  sunLight.castShadow = true;

  // High quality shadows
  sunLight.shadow.mapSize.width = 4096;
  sunLight.shadow.mapSize.height = 4096;

  // CRITICAL: Cover full ±150 range
  sunLight.shadow.camera.left = -160;
  sunLight.shadow.camera.right = 160;
  sunLight.shadow.camera.top = 160;
  sunLight.shadow.camera.bottom = -160;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 200;

  // Shadow settings to reduce artifacts
  sunLight.shadow.bias = -0.0001;
  sunLight.shadow.normalBias = 0.05;

  scene.add(sunLight);

  // Secondary fill light from opposite direction
  const fillLight = new THREE.DirectionalLight(0xaaccff, 0.4);
  fillLight.position.set(-15, 20, -10);
  scene.add(fillLight);

  // Hemisphere light for better outdoor lighting
  const hemiLight = new THREE.HemisphereLight(0x88aaff, 0xccaa66, 0.4);
  scene.add(hemiLight);

  // Fill light from sky
  const skyFill = new THREE.PointLight(0xaaccff, 0.3);
  skyFill.position.set(0, 20, 0);
  scene.add(skyFill);

  // Warm fill from ground reflection
  const groundFill = new THREE.PointLight(0xccaa66, 0.3);
  groundFill.position.set(0, 2, 0);
  scene.add(groundFill);

  // Back rim light to highlight edges
  const rimLight = new THREE.PointLight(0xffaa88, 0.4);
  rimLight.position.set(0, 5, -20);
  scene.add(rimLight);

  // Optional: Debug helper to visualize shadow camera bounds
  // const shadowHelper = new THREE.CameraHelper(sunLight.shadow.camera);
  // scene.add(shadowHelper);
}