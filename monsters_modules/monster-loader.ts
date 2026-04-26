import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { BodyParts } from "./types";

const BONE_PATTERNS = {
    leftLeg: ["LeftLeg", "LegL", "L_Leg", "ThighL", "UpperLegL", "leg_left", "Leg_Left"],
    rightLeg: ["RightLeg", "LegR", "R_Leg", "ThighR", "UpperLegR", "leg_right", "Leg_Right"],
    leftArm: ["LeftArm", "ArmL", "L_Arm", "Arm_Left", "UpperArmL"],
    rightArm: ["RightArm", "ArmR", "R_Arm", "Arm_Right", "UpperArmR"],
    body: ["Body", "Torso", "Spine", "Chest", "Root"],
    leftWings: ["Wing1L", "Wing2L", "Wing3L", "Wing4L", "WingL", "L_Wing", "LeftWing"],
    rightWings: ["Wing1R", "Wing2R", "Wing3R", "Wing4R", "WingR", "R_Wing", "RightWing"]
};

export class MonsterLoader {
    private loader: GLTFLoader;

    constructor() {
        this.loader = new GLTFLoader();
    }

    async loadModel(path: string, scale: number = 1.2): Promise<THREE.Object3D> {
        return new Promise((resolve, reject) => {
            this.loader.load(path,
                (gltf) => {
                    const model = gltf.scene;
                    model.scale.set(scale, scale, scale);
                    resolve(model);
                },
                undefined,
                reject
            );
        });
    }

    detectBodyParts(model: THREE.Object3D): BodyParts {
        const parts: BodyParts = {};
        const leftWings: THREE.Bone[] = [];
        const rightWings: THREE.Bone[] = [];

        model.traverse((child) => {
            const name = child.name;
            const lowerName = name.toLowerCase();

            if (!parts.leftLeg && BONE_PATTERNS.leftLeg.some(p => lowerName.includes(p.toLowerCase())))
                parts.leftLeg = child;
            if (!parts.rightLeg && BONE_PATTERNS.rightLeg.some(p => lowerName.includes(p.toLowerCase())))
                parts.rightLeg = child;
            if (!parts.leftArm && BONE_PATTERNS.leftArm.some(p => lowerName.includes(p.toLowerCase())))
                parts.leftArm = child;
            if (!parts.rightArm && BONE_PATTERNS.rightArm.some(p => lowerName.includes(p.toLowerCase())))
                parts.rightArm = child;
            if (!parts.body && BONE_PATTERNS.body.some(p => lowerName.includes(p.toLowerCase())))
                parts.body = child;

            if (BONE_PATTERNS.leftWings.includes(name)) leftWings.push(child as THREE.Bone);
            if (BONE_PATTERNS.rightWings.includes(name)) rightWings.push(child as THREE.Bone);
        });

        if (leftWings.length) parts.leftWings = leftWings.sort((a, b) => a.name.localeCompare(b.name));
        if (rightWings.length) parts.rightWings = rightWings.sort((a, b) => a.name.localeCompare(b.name));

        return parts;
    }

    logBodyParts(name: string, parts: BodyParts) {
        console.log(`${name}:`, {
            leftLeg: parts.leftLeg?.name || "✗",
            rightLeg: parts.rightLeg?.name || "✗",
            leftArm: parts.leftArm?.name || "✗",
            rightArm: parts.rightArm?.name || "✗",
            leftWings: parts.leftWings?.length || 0,
            rightWings: parts.rightWings?.length || 0
        });
    }
}