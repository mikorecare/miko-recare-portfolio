import { MonsterConfig } from "./types";
import * as THREE from "three";
export type { MonsterConfig } from "./types";

export function createMonsterConfig(
    name: string,
    modelPath: string,
    position: THREE.Vector3,
    movement: "patrol" | "follow" | "flee" | "idle" | "fly" | "circle",
    options?: Partial<MonsterConfig>
): MonsterConfig {
    return {
        name,
        modelPath,
        position,
        movement,
        scale: options?.scale || 1.2,
        movementParams: options?.movementParams,
        ...options
    };
}