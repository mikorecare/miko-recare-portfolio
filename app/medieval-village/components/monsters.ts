import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Monster, MONSTERS } from '../data/monsters';

// Store animation data for each monster
interface AnimatedMonster {
    model: THREE.Object3D;
    mixer: THREE.AnimationMixer | null;
    time: number;
    speed: number;
    originalScale: THREE.Vector3;
    nameTag: THREE.Sprite | null;
    nameTagOffset: number;
    podium: THREE.Mesh | null;
}

const animatedMonsters: AnimatedMonster[] = [];

// Create a visible name tag that always faces the camera
function createNameTag(name: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    if (ctx) {
        // Background with rounded corners effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Border
        ctx.strokeStyle = '#ffaa66';
        ctx.lineWidth = 3;
        ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

        // Monster name
        ctx.fillStyle = '#ffaa66';
        ctx.font = 'Bold 32px "Segoe UI", Arial';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, 45);

        // Subtitle
        ctx.fillStyle = '#aaffaa';
        ctx.font = '20px "Segoe UI", Arial';
        ctx.fillText('Click to talk', canvas.width / 2, 85);

        // Decorative line
        ctx.strokeStyle = '#ffaa66';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(100, 60);
        ctx.lineTo(canvas.width - 100, 60);
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(2.0, 0.5, 1);

    return sprite;
}

// Get name tag offset - FIXED: Always above the monster's highest point
function getNameTagOffset(modelName: string, scale: number): number {
    // These are the heights ABOVE the monster's base position (y=0)
    // Tags are placed at the top of the monster + extra space
    const monsterHeights: Record<string, number> = {
        'Dragon.glb': 2.5,
        'Dragon Evolved.glb': 2.8,
        'Wizard.glb': 1.8,
        'Orc.glb': 1.6,
        'Orc Enemy.glb': 1.6,
        'Frog.glb': 1.2,
        'Ghost.glb': 1.5,
        'Demon.glb': 2.0,
        'Dino.glb': 1.5,
        'Fish.glb': 1.0,
        'Yeti.glb': 2.2,
        'Ninja.glb': 1.6,
        'Cat.glb': 1.0,
        'Chicken.glb': 0.9,
        'Bunny.glb': 0.8,
        'Alien.glb': 1.8,
        'Squidle.glb': 1.3,
        'Pink Blob.glb': 0.9,
        'Green Blob.glb': 0.9,
        'Blue Demon.glb': 1.9,
        'Birb.glb': 1.0,
        'Tribal.glb': 1.6,
    };

    const height = monsterHeights[modelName] || 1.8;
    // Tag floats above the monster (add 0.5 for the tag itself)
    return height + 0.8;
}

// Create a podium for short monsters so they're more visible
function createPodium(modelName: string, scale: number): THREE.Mesh | null {
    const shortMonsters = ['Frog.glb', 'Fish.glb', 'Cat.glb', 'Chicken.glb', 'Bunny.glb', 'Pink Blob.glb', 'Green Blob.glb', 'Birb.glb'];

    if (shortMonsters.includes(modelName)) {
        const podiumGeometry = new THREE.CylinderGeometry(0.8, 1.0, 0.3, 8);
        const podiumMaterial = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.7, metalness: 0.2 });
        const podium = new THREE.Mesh(podiumGeometry, podiumMaterial);
        podium.position.y = -0.2;
        podium.castShadow = true;
        podium.receiveShadow = true;
        return podium;
    }
    return null;
}

export function loadMonsters(
    scene: THREE.Scene,
    collisionObjects: { x: number; z: number; radius: number }[],
    onMonsterClick: (monster: Monster) => void
): THREE.Object3D[] {
    const loader = new GLTFLoader();
    const monsterObjects: THREE.Object3D[] = [];

    MONSTERS.forEach((monster) => {
        loader.load(
            `/monsters/${monster.model}`,
            (gltf) => {
                const model = gltf.scene;
                model.position.set(monster.position.x, 0, monster.position.z);
                model.scale.set(monster.scale, monster.scale, monster.scale);
                if (monster.rotation) model.rotation.y = monster.rotation;
                model.castShadow = true;
                model.userData = { isMonster: true, monsterData: monster };

                let mixer: THREE.AnimationMixer | null = null;

                // Play animation if available
                if (gltf.animations.length > 0) {
                    mixer = new THREE.AnimationMixer(model);
                    const action = mixer.clipAction(gltf.animations[0]);
                    action.play();
                    console.log(`🎬 Playing animation for ${monster.name}: ${gltf.animations[0].name}`);
                }

                // Add podium for short monsters
                const podium = createPodium(monster.model, monster.scale);
                if (podium) {
                    scene.add(podium);
                }

                // Create name tag with offset ABOVE the monster
                const nameTag = createNameTag(monster.name);
                const nameTagOffset = getNameTagOffset(monster.model, monster.scale);
                nameTag.position.set(0, nameTagOffset, 0);
                model.add(nameTag);

                scene.add(model);
                monsterObjects.push(model);

                // Store for idle animation
                animatedMonsters.push({
                    model,
                    mixer,
                    time: Math.random() * Math.PI * 2,
                    speed: 0.5 + Math.random() * 0.5,
                    originalScale: model.scale.clone(),
                    nameTag,
                    nameTagOffset,
                    podium,
                });

                // Add invisible collider for easier clicking (larger for better detection)
                const colliderGeometry = new THREE.SphereGeometry(1.2, 16, 16);
                const colliderMaterial = new THREE.MeshStandardMaterial({
                    transparent: true,
                    opacity: 0,
                    visible: true
                });
                const collider = new THREE.Mesh(colliderGeometry, colliderMaterial);
                collider.userData = { isMonster: true, monsterData: monster };
                model.add(collider);

                collisionObjects.push({
                    x: monster.position.x,
                    z: monster.position.z,
                    radius: 1.0,
                });

                console.log(`✅ Monster loaded: ${monster.name} (${monster.model}) - name tag at height ${nameTagOffset.toFixed(1)}`);
            },
            (progress) => {
                console.log(`Loading ${monster.model}: ${Math.round(progress.loaded / progress.total * 100)}%`);
            },
            (error) => {
                console.error(`Failed to load monster ${monster.model}:`, error);
                // Create a fallback visible cube if model fails to load
                const fallback = new THREE.Mesh(
                    new THREE.BoxGeometry(1.0, 1.0, 1.0),
                    new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0x442200 })
                );
                fallback.position.set(monster.position.x, 0, monster.position.z);
                fallback.userData = { isMonster: true, monsterData: monster };
                scene.add(fallback);
                monsterObjects.push(fallback);

                const nameTag = createNameTag(monster.name);
                const nameTagOffset = 1.8;
                nameTag.position.set(0, nameTagOffset, 0);
                fallback.add(nameTag);

                animatedMonsters.push({
                    model: fallback,
                    mixer: null,
                    time: Math.random() * Math.PI * 2,
                    speed: 0.5 + Math.random() * 0.5,
                    originalScale: new THREE.Vector3(1, 1, 1),
                    nameTag,
                    nameTagOffset,
                    podium: null,
                });
            }
        );
    });

    return monsterObjects;
}

// Call this in your animation loop - makes monsters look ALIVE
export function updateMonsterAnimations(deltaTime: number, globalTime: number): void {
    animatedMonsters.forEach((animated) => {
        // Update animation mixer for GLTF animations
        if (animated.mixer) {
            animated.mixer.update(deltaTime);
        }

        // Idle floating animation (bobbing up and down)
        if (animated.model) {
            // Bob up and down
            const bobY = Math.sin(globalTime * animated.speed + animated.time) * 0.08;
            animated.model.position.y = bobY;

            // Gentle rotation
            animated.model.rotation.y = Math.sin(globalTime * 0.5 + animated.time) * 0.1;

            // Slight scale breathing effect
            const breath = 1 + Math.sin(globalTime * 1.5 + animated.time) * 0.02;
            animated.model.scale.x = animated.originalScale.x * breath;
            animated.model.scale.z = animated.originalScale.z * breath;

            // Keep name tag floating above the monster (follows bobbing)
            if (animated.nameTag) {
                animated.nameTag.position.y = animated.nameTagOffset + bobY;
            }
        }
    });
}