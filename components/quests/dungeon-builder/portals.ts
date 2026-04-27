import * as THREE from "three";
import { PATH_START, PATH_END } from "./index";

export let startPortal: THREE.Mesh | null = null;
export let endPortal: THREE.Mesh | null = null;

function createPortalRing(color: number, emissive: number, radius: number, width: number, rotationSpeed: number) {
    const geometry = new THREE.TorusGeometry(radius, width, 64, 128);
    const material = new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 1.2, metalness: 0.8, roughness: 0.2 });
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI / 2;
    ring.userData = { rotationSpeed };
    return ring;
}

function createParticleSystem(color: number, emissive: number, count: number) {
    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < count; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 6, 6),
            new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 0.6 })
        );
        particle.userData = {
            angle: Math.random() * Math.PI * 2,
            radius: 0.5 + Math.random() * 2.5,
            speed: 0.5 + Math.random() * 2,
            yOffset: (Math.random() - 0.5) * 3,
            verticalSpeed: 0.5 + Math.random() * 1,
        };
        particles.push(particle);
    }
    return particles;
}

function createPortal(z: number, x: number, type: "start" | "end", imagePath: string) {
    const portalGroup = new THREE.Group();
    portalGroup.position.set(x, 0, z);

    const isStart = type === "start";
    const colors = isStart
        ? { outer: 0x44ff88, inner: 0x88ffaa, middle: 0xaaffcc, core: 0x44ff88, innerCore: 0xaaffaa, rune: 0xaaffaa, particle: 0x88ff88, orb: 0xaaffaa }
        : { outer: 0xff6644, inner: 0xff8844, middle: 0xffaa44, core: 0xff4400, innerCore: 0xff8844, rune: 0xffaa66, particle: 0xff8844, orb: 0xffaa44 };

    // Rings
    const outerRing = createPortalRing(colors.outer, isStart ? 0x22cc44 : 0xcc4411, 1.8, 0.08, 0.5);
    const innerRing = createPortalRing(colors.inner, isStart ? 0x44ff88 : 0xff6633, 1.4, 0.06, -0.7);
    const middleRing = createPortalRing(colors.middle, isStart ? 0x66ffaa : 0xff8844, 1.6, 0.05, 0.3);
    middleRing.rotation.x = Math.PI / 3;
    middleRing.rotation.z = Math.PI / 4;

    portalGroup.add(outerRing, innerRing, middleRing);

    // Core glow
    const coreGlow = new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 64, 64),
        new THREE.MeshStandardMaterial({ color: colors.core, emissive: isStart ? 0x22cc55 : 0xcc3300, emissiveIntensity: 0.8, transparent: true, opacity: 0.7 })
    );
    const innerCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: colors.innerCore, emissiveIntensity: 1.5, transparent: true, opacity: 0.9 })
    );
    portalGroup.add(coreGlow, innerCore);

    // Runes
    const runes: THREE.Mesh[] = [];
    for (let i = 0; i < 12; i++) {
        const rune = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: colors.rune, emissive: isStart ? 0x44ff66 : 0xff6622, emissiveIntensity: 0.8 }));
        const angle = (i / 12) * Math.PI * 2;
        rune.position.set(Math.cos(angle) * 2.0, Math.sin(angle) * 2.0, 0);
        rune.userData = { angle, radius: 2.0, speed: 0.5 };
        portalGroup.add(rune);
        runes.push(rune);
    }

    // Particles
    const particles = createParticleSystem(colors.particle, isStart ? 0x44ff44 : 0xff4422, 200);
    particles.forEach(p => portalGroup.add(p));

    // Orbs
    const orbs: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), new THREE.MeshStandardMaterial({ color: colors.orb, emissive: isStart ? 0x66ff66 : 0xff5522, emissiveIntensity: 1.0, transparent: true, opacity: 0.8 }));
        orb.userData = { angle: (i / 8) * Math.PI * 2, radius: 2.2, speed: 0.8 };
        portalGroup.add(orb);
        orbs.push(orb);
    }

    portalGroup.userData = { particles, runes, orbs, outerRing, innerRing, middleRing, coreGlow, innerCore, time: 0 };

    return portalGroup;
}

function createPortalSign(scene: THREE.Scene, x: number, z: number, imagePath: string, yOffset: number = 2.8) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.position.set(x, yOffset, z);
        const aspect = img.width / img.height;
        sprite.scale.set(1.5 * aspect, 1.5, 1);
        scene.add(sprite);
    };
    img.src = imagePath;
}

export function createStartPortal(scene: THREE.Scene) {
    // Start portal at the beginning of the path
    const portal = createPortal(-118, -21, "start", "/buttons/enter-the-keep.png");
    scene.add(portal);
    startPortal = portal as unknown as THREE.Mesh;
    createPortalSign(scene, -21, -118, "/buttons/enter-the-keep.png", 2.8);
}

export function createEndPortal(scene: THREE.Scene) {
    // End portal placed near the start portal (to the right side)
    // Positioned at x = 15, z = -118 (right side of the start portal)
    const portal = createPortal(-118, 15, "end", "/buttons/explore-the-village.png");
    scene.add(portal);
    endPortal = portal as unknown as THREE.Mesh;
    createPortalSign(scene, 15, -118, "/buttons/explore-the-village.png", 2.8);
}

export function animatePortals(deltaTime: number) {
    const animateGroup = (portal: any) => {
        if (!portal) return;
        portal.userData.time = (portal.userData.time || 0) + deltaTime;
        const t = portal.userData.time;

        portal.userData.particles?.forEach((particle: THREE.Mesh) => {
            const angle = particle.userData.angle + t * particle.userData.speed;
            particle.position.x = Math.cos(angle) * particle.userData.radius;
            particle.position.z = Math.sin(angle) * particle.userData.radius;
            particle.position.y = particle.userData.yOffset;
        });

        portal.userData.runes?.forEach((rune: THREE.Mesh) => {
            const angle = rune.userData.angle + t * rune.userData.speed;
            rune.position.x = Math.cos(angle) * rune.userData.radius;
            rune.position.y = Math.sin(angle) * rune.userData.radius;
        });

        portal.userData.orbs?.forEach((orb: THREE.Mesh) => {
            const angle = orb.userData.angle + t * orb.userData.speed;
            orb.position.x = Math.cos(angle) * orb.userData.radius;
            orb.position.z = Math.sin(angle) * orb.userData.radius;
        });

        if (portal.userData.outerRing) portal.userData.outerRing.rotation.z += deltaTime * 0.5;
        if (portal.userData.innerRing) portal.userData.innerRing.rotation.z -= deltaTime * 0.7;
        if (portal.userData.middleRing) portal.userData.middleRing.rotation.z += deltaTime * 0.3;

        if (portal.userData.coreGlow) {
            const scale = 1 + Math.sin(t * 3) * 0.05;
            portal.userData.coreGlow.scale.set(scale, scale, scale);
        }
        if (portal.userData.innerCore) {
            const scale = 1 + Math.sin(t * 5) * 0.08;
            portal.userData.innerCore.scale.set(scale, scale, scale);
        }
    };

    animateGroup(startPortal);
    animateGroup(endPortal);
}

export function checkPortalWarp(
    playerPosition: THREE.Vector3,
    onStartWarp: () => void,
    onEndWarp: () => void
): boolean {
    if (!startPortal || !endPortal) return false;

    const distToStart = playerPosition.distanceTo(startPortal.position);
    const distToEnd = playerPosition.distanceTo(endPortal.position);

    if (distToStart < 1.5) { onStartWarp(); return true; }
    if (distToEnd < 1.5) { onEndWarp(); return true; }
    return false;
}