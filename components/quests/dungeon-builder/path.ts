// path.ts
import * as THREE from "three";
import { PATH_START, PATH_END, PATH_WIDTH } from "./index";
import { setCurvePoints } from "./trees";
import { setCurvePointsForCrops } from "./crops";
import { setCurvePointsForResources } from "./resources";
import { setTechStackCurve, createTechStacksAlongPath } from "../tech-stacks";

export function createPath(scene: THREE.Scene) {
    const pathMat = new THREE.MeshStandardMaterial({ color: 0xc4a56a, roughness: 0.8 });
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x9c8550, roughness: 0.7 });

    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-20, 0, -116),
        new THREE.Vector3(0, 0, 130),
        new THREE.Vector3(50, 0, 110),
        new THREE.Vector3(50, 0, -70),
        new THREE.Vector3(5, 0, -105),
        new THREE.Vector3(-20, 0, -116)
    ]);
    curve.closed = false;

    setTechStackCurve(curve);

    const points = curve.getPoints(500);
    setCurvePoints(points);
    setCurvePointsForCrops(points);
    setCurvePointsForResources(points);
    createTechStacksAlongPath(scene, points, PATH_WIDTH, curve);

    // Helper to create flattened path
    function createFlattenedPath(radius: number, material: THREE.Material, yOffset: number, yScale: number = 0.01) {
        const geom = new THREE.TubeGeometry(curve, 400, radius, 8, false);
        const pos = geom.getAttribute('position');
        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i);
            pos.setY(i, y * yScale + yOffset);
        }
        pos.needsUpdate = true;
        const mesh = new THREE.Mesh(geom, material);
        mesh.receiveShadow = true;
        return mesh;
    }

    // Create road and edges
    const roadMesh = createFlattenedPath(PATH_WIDTH, pathMat, -0.05);
    scene.add(roadMesh);
    const edgesMesh = createFlattenedPath(PATH_WIDTH + 0.3, edgeMat, -0.04, -0.05);
    scene.add(edgesMesh);

}