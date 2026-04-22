export const CONFIG = {
    camera: {
        startPosition: { x: -100, y: 0.2, z: 30 },
        height: 1.2,
        bobAmount: 0.015,
        mouseSpeed: 0.002,
        fov: 75,
    },
    movement: {
        speed: 5,
        playerRadius: 0.4,
    },
    ground: {
        size: 400,  // Increased to cover larger area
        color: 0x6B8E23,
        yPosition: -0.2,
    },
    path: {
        width: 4,
        segmentLength: 2,
        startZ: -10,
        endZ: 40,
    },
    trees: {
        count: 250,
        minRadius: 25,
        maxRadius: 80,  // Increased for wider forest
    },
    fog: {
        color: 0x87CEEB,
        near: 150,
        far: 450,  // Increased to see farther
    },
    lighting: {
        ambientIntensity: 0.65,
        sunIntensity: 1.3,
        fillIntensity: 0.3,
        backIntensity: 0.4,
    },
};