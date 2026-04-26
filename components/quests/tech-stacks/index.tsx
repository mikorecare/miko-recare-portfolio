import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { techStackBuildings } from "./data";

// Function to create a floating icon sprite from actual image URL - MUCH LARGER
function createFloatingIconSprite(
  iconUrl: string,
  name: string,
  color: string,
  invert: boolean = false,
): Promise<THREE.Sprite> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Draw circular background
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(256, 256, 230, 0, 2 * Math.PI);
    ctx.fill();

    // Draw border
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(256, 256, 230, 0, 2 * Math.PI);
    ctx.stroke();

    // Load and draw the actual icon image
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      // Clear the center for the icon
      ctx.save();
      ctx.beginPath();
      ctx.arc(256, 256, 180, 0, 2 * Math.PI);
      ctx.clip();

      // Draw the icon
      ctx.drawImage(img, 76, 76, 360, 360);
      ctx.restore();

      // Draw name below - MUCH LARGER font
      ctx.font = 'bold 64px "Georgia"'; // Increased from 48px
      ctx.fillStyle = "#f8fafc";
      ctx.textAlign = "center";

      // Wrap text if too long
      let displayName = name;
      if (name.length > 12) {
        displayName = name.substring(0, 10) + "..";
      }
      ctx.fillText(displayName, 256, 440); // Adjusted Y position

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        depthTest: true,
      });
      const sprite = new THREE.Sprite(material);
      sprite.userData = { name, originalScale: 0.4 };
      sprite.scale.set(1.2, 1.2, 1.2); // Increased from 1.2
      resolve(sprite);
    };

    img.onerror = () => {
      // Fallback to text if image fails to load
      ctx.fillStyle = color;
      ctx.font = 'bold 200px "Georgia"'; // Increased from 160px
      ctx.fillText(name.substring(0, 2), 256, 300);
      ctx.font = 'bold 56px "Georgia"'; // Increased from 40px
      ctx.fillStyle = "#f8fafc";

      let displayName = name;
      if (name.length > 12) {
        displayName = name.substring(0, 10) + "..";
      }
      ctx.fillText(displayName, 256, 440);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        depthTest: true,
      });
      const sprite = new THREE.Sprite(material);
      sprite.userData = { name, originalScale: 0.4 };
      sprite.scale.set(1.5, 1.5, 1.5); // Increased from 1.2
      resolve(sprite);
    };

    img.src = iconUrl;
  });
}

export async function loadTechStackFloatingBuildings(
  scene: THREE.Scene,
  signPosition: { x: number; y: number; z: number },
): Promise<void> {
  const loader = new GLTFLoader();

  for (const building of techStackBuildings) {
    loader.load(
      building.building,
      async (gltf) => {
        const model = gltf.scene;

        model.position.set(
          signPosition.x + building.position.x,
          signPosition.y + building.position.y,
          signPosition.z + building.position.z,
        );

        // Apply rotation if specified
        if (building.rotationY !== undefined) {
          model.rotation.y = building.rotationY;
        }

        model.scale.set(building.scale, building.scale, building.scale);

        // Floating animation data for building
        const startY = model.position.y;
        model.userData = {
          floatSpeed: 0.3 + Math.random() * 0.3,
          floatHeight: 0.3,
          startY: startY,
          time: Math.random() * Math.PI * 2,
        };

        model.castShadow = true;
        model.receiveShadow = false;
        scene.add(model);

        // Add glowing aura - larger
        const auraGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const auraMaterial = new THREE.MeshStandardMaterial({
          color: building.color,
          emissive: building.color,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.25,
        });
        const aura = new THREE.Mesh(auraGeometry, auraMaterial);
        aura.position.y = 0.8;
        model.add(aura);

        // Create floating icons arranged in a circle around the building
        const iconCount = building.icons.length;
        const radius = 3; // Wider circle

        for (let i = 0; i < iconCount; i++) {
          const icon = building.icons[i];
          const sprite = await createFloatingIconSprite(
            icon.icon,
            icon.name,
            building.color,
            icon.invert,
          );

          // Arrange in a circle with higher Y offsets to prevent underground
          const angle = (i / iconCount) * Math.PI * 2;
          const ring = Math.floor(i / 6); // 0 = bottom ring, 1 = top ring

          // INCREASED Y offsets - minimum 1.5 units above ground
          const yOffset = ring === 0 ? 1.5 : 3.5; // Was -0.5 and 1.5
          const r = radius + ring * 1.0;

          sprite.position.set(
            Math.cos(angle) * r,
            yOffset + Math.sin(angle * 2) * 0.5,
            Math.sin(angle) * r,
          );

          // Add floating animation for each icon with higher base position
          sprite.userData = {
            floatSpeed: 0.5 + Math.random() * 0.3,
            floatHeight: 0.35, // Increased float height
            startY: sprite.position.y,
            time: Math.random() * Math.PI * 2,
            angle: angle,
            radius: r,
            ring: ring,
          };

          model.add(sprite);
        }
      },
      undefined,
      (error) => {
        console.error(`Error loading ${building.category} building:`, error);
      },
    );
  }
}

// Update animation to handle both buildings and icons
export function animateFloatingObjects(
  scene: THREE.Scene,
  deltaTime: number,
): void {
  scene.traverse((child) => {
    if (child.userData && child.userData.floatSpeed) {
      child.userData.time += deltaTime;

      // Check if it's a Mesh (has geometry property)
      if ("geometry" in child && child.userData.startY !== undefined) {
        const offsetY =
          Math.sin(child.userData.time * child.userData.floatSpeed) *
          child.userData.floatHeight;
        child.position.y = child.userData.startY + offsetY;
      }

      // Check if it's a Sprite (has material but no geometry)
      if (!("geometry" in child) && child.userData.radius !== undefined) {
        const offsetY =
          Math.sin(child.userData.time * child.userData.floatSpeed) *
          child.userData.floatHeight;
        child.position.y = child.userData.startY + offsetY;

        const newAngle = child.userData.angle + deltaTime * 0.3; // Slower rotation
        child.userData.angle = newAngle;
        child.position.x = Math.cos(newAngle) * child.userData.radius;
        child.position.z = Math.sin(newAngle) * child.userData.radius;
      }
    }
  });
}
