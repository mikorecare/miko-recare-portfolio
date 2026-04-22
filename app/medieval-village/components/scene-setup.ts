import * as THREE from 'three';
import { CONFIG } from '../data/config';

export function createScene(): THREE.Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.fog.color);
    scene.fog = new THREE.Fog(CONFIG.fog.color, CONFIG.fog.near, CONFIG.fog.far);
    return scene;
}

export function createCamera(container: HTMLElement): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(
        CONFIG.camera.startPosition.x,
        CONFIG.camera.startPosition.y,
        CONFIG.camera.startPosition.z
    );
    return camera;
}

export function createRenderer(container: HTMLElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
}