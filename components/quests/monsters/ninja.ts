import { MonsterConfig } from "@/monsters_modules/types";
import * as THREE from "three";

export const ninjaConfigs: MonsterConfig[] = [
    {
        name: "Ninja Showman",
        displayName: "Shadow Ninja",
        modelPath: "/monsters/Ninja-xGYmeDpfTu.glb",
        position: new THREE.Vector3(0, -0.18, 0),
        scale: 0.5,
        movement: "ninja",  // Custom movement type
        movementParams: {
            speed: 8.0,
        },
        isNinja: true,  // Important: This marks it as a Ninja monster
        rotation: new THREE.Euler(0, 0, 0),
    },
];