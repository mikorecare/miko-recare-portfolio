import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createMeadow } from "./meadow";
import { createPath } from "./path";
import { loadTreeModels, addDistantTrees, addPineTrees } from "./trees";
import { loadCropModel, addCropsNearPath } from "./crops";
import { loadResourceModels, addAllResources } from "./resources";
import { loadMountainModel, addFarMountains } from "./mountains";
import { loadBuildingModels, addFarBuildings } from "./buildings";
import { addSun, animateSun } from "./sun";
import {
  createStartPortal,
  createEndPortal,
  animatePortals,
  checkPortalWarp,
} from "./portals";

export const PATH_START = -96;
export const PATH_END = 96;
export const PATH_WIDTH = 3.5;

export async function buildDungeon(scene: THREE.Scene) {
  const loader = new GLTFLoader();

  // Load all models first
  await Promise.all([
    loadTreeModels(loader),
    loadCropModel(loader),
    loadResourceModels(loader),
    loadMountainModel(loader),
    loadBuildingModels(loader),
  ]);

  createMeadow(scene);
  createPath(scene);

  // Trees and resources
  addDistantTrees(scene);
  addPineTrees(scene);
  addCropsNearPath(scene);
  addAllResources(scene); // Adds rocks, gold, and logs
  addFarMountains(scene);
  addFarBuildings(scene);
  addSun(scene);
  createStartPortal(scene);
  createEndPortal(scene);
}

export { animateSun, animatePortals, checkPortalWarp };
