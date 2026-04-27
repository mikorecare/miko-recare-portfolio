import * as THREE from "three";
import { techIconsByCategory } from "./data";
import { MONSTER_POSITIONS } from "../story-data/data";

// Store the curve for inside/outside detection
let cachedCurve: THREE.CatmullRomCurve3 | null = null;
const START_POINT = { x: -90, z: -120 }; // Starting point of the path

// Store all tech signs with their positions and dialog data
export const techSigns: { 
  position: THREE.Vector3; 
  icon: { name: string; icon: string; invert: boolean; description: string };
  signGroup: THREE.Group;
  hasBeenTriggered: boolean;
}[] = [];

export function setTechStackCurve(curve: THREE.CatmullRomCurve3) {
    cachedCurve = curve;
}

// Check if a point is too close to any monster position
function isTooCloseToMonster(x: number, z: number, minDistance: number = 5): boolean {
    for (const monster of MONSTER_POSITIONS) {
        const dist = Math.hypot(x - monster.x, z - monster.z);
        if (dist < minDistance) {
            return true;
        }
    }
    return false;
}

// Check if a point is inside the curved path area
function isPointInsideCurve(x: number, z: number, curve: THREE.CatmullRomCurve3): boolean {
    const points = curve.getPoints(100);

    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i].x, zi = points[i].z;
        const xj = points[j].x, zj = points[j].z;
        const intersect = ((zi > z) != (zj > z)) &&
            (x < (xj - xi) * (z - zi) / (zj - zi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Calculate angle to face the starting point
function calculateAngleToStart(x: number, z: number): number {
    const dx = START_POINT.x - x;
    const dz = START_POINT.z - z;
    return Math.atan2(dz, dx);
}

// Get nearby tech sign for dialog
export function getNearbyTechSign(playerPosition: THREE.Vector3, range: number = 4): typeof techSigns[0] | null {
    for (const sign of techSigns) {
        const dist = playerPosition.distanceTo(sign.position);
        if (dist < range && !sign.hasBeenTriggered) {
            return sign;
        }
    }
    return null;
}

// Get dialog for tech sign
export function getDialogForTechSign(sign: typeof techSigns[0]): { name: string; dialog: string } {
    return {
        name: `📜 ${sign.icon.name}`,
        dialog: sign.icon.description
    };
}

// Mark tech sign as triggered
export function markTechSignTriggered(sign: typeof techSigns[0]) {
    sign.hasBeenTriggered = true;
}

export function createTechStacksAlongPath(scene: THREE.Scene, points: THREE.Vector3[], pathWidth: number, curve?: THREE.CatmullRomCurve3) {
    if (!curve && cachedCurve) curve = cachedCurve;
    if (!curve) {
        console.warn("No curve provided for tech stack placement");
        return;
    }

    const allIcons: { name: string; icon: string; invert: boolean; description: string }[] = [];
    Object.values(techIconsByCategory).forEach(category => {
        allIcons.push(...category);
    });

    const signCount = Math.min(30, allIcons.length); // Use all icons
    const placedPositions: { x: number; z: number }[] = [];
    const minDistance = 5.5; // Minimum distance between signs
    const minDistanceFromMonster = 6;

    // Clear existing tech signs
    techSigns.length = 0;

    for (let i = 0; i < signCount; i++) {
        let attempts = 0;
        let placed = false;

        while (!placed && attempts < 100) {
            attempts++;

            const bounds = getCurveBounds(curve);
            const x = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
            const z = bounds.minZ + Math.random() * (bounds.maxZ - bounds.minZ);

            const isInside = isPointInsideCurve(x, z, curve);

            let tooCloseToPath = false;
            for (const point of points) {
                const dist = Math.hypot(x - point.x, z - point.z);
                if (dist < pathWidth + 2) {
                    tooCloseToPath = true;
                    break;
                }
            }

            const tooCloseToMonster = isTooCloseToMonster(x, z, minDistanceFromMonster);

            let tooCloseToSign = false;
            for (const placed of placedPositions) {
                const dist = Math.hypot(x - placed.x, z - placed.z);
                if (dist < minDistance) {
                    tooCloseToSign = true;
                    break;
                }
            }

            if (isInside && !tooCloseToPath && !tooCloseToMonster && !tooCloseToSign) {
                placedPositions.push({ x, z });
                const iconData = allIcons[i % allIcons.length];
                const signGroup = createTechSignPost(scene, x, z, iconData);
                techSigns.push({
                    position: new THREE.Vector3(x, 0, z),
                    icon: iconData,
                    signGroup,
                    hasBeenTriggered: false
                });
                placed = true;
            }
        }
    }

    console.log(`Placed ${techSigns.length} tech signs facing the start point (avoiding ${MONSTER_POSITIONS.length} monster spots)`);
}

function getCurveBounds(curve: THREE.CatmullRomCurve3): { minX: number; maxX: number; minZ: number; maxZ: number } {
    const points = curve.getPoints(100);
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;

    for (const point of points) {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minZ = Math.min(minZ, point.z);
        maxZ = Math.max(maxZ, point.z);
    }

    return { minX, maxX, minZ, maxZ };
}

function createTechSignPost(scene: THREE.Scene, x: number, z: number, icon: { name: string; icon: string; invert: boolean; description: string }): THREE.Group {
    const signGroup = new THREE.Group();
    const yPos = -0.05;

    const angleToStart = calculateAngleToStart(x, z);

    const postMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, roughness: 0.7, metalness: 0.1 });
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.8, 0.15), postMaterial);
    post.position.set(0, 0.85, 0);
    post.castShadow = true;
    signGroup.add(post);

    const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xDEB887, roughness: 0.5, metalness: 0.05 });
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.8, 0.08), boardMaterial);
    board.position.set(0, 1.3, 0);
    board.castShadow = true;
    signGroup.add(board);

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#DEB887";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#8B5A2B";
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = "#2c1810";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 40, 150, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = "#c4963a";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 40, 150, 0, 2 * Math.PI);
    ctx.stroke();

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2 - 40, 130, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, 126, 126, 260, 260);
        ctx.restore();

        ctx.font = 'Bold 60px "Georgia", serif';
        ctx.fillStyle = "#2c1810";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        let displayName = icon.name;
        if (displayName.length > 15) {
            displayName = displayName.substring(0, 12) + "...";
        }
        ctx.fillText(displayName, canvas.width / 2, canvas.height - 60);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const signMaterial = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3, metalness: 0.05 });

        const signFace = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.05), signMaterial);
        signFace.position.set(0, 1.3, 0.1);
        signFace.castShadow = true;
        signGroup.add(signFace);

        const topPiece = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 0.2, 6), postMaterial);
        topPiece.position.set(0, 1.75, 0);
        topPiece.castShadow = true;
        signGroup.add(topPiece);

        signGroup.position.set(x, yPos, z);
        signGroup.rotation.y = angleToStart;
        scene.add(signGroup);
    };
    img.src = icon.icon;
    
    return signGroup;
}