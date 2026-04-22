export interface Decoration {
    path: string;
    x: number;
    z: number;
    scale: number;
    yOffset?: number;
    rotation?: number;
}

// Generate random grass positions around the village
const generateGrassPositions = (): { x: number; z: number }[] => {
    const grassPositions: { x: number; z: number }[] = [];
    const grassCount = 300; // Number of grass patches

    for (let i = 0; i < grassCount; i++) {
        // Random angle and radius to spread grass around the village
        const angle = Math.random() * Math.PI * 2;
        const radius = 15 + Math.random() * 40; // Between 15 and 55 units from center
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        // Avoid placing grass inside village center (where buildings are)
        if (Math.abs(x) > 12 || Math.abs(z) > 12) {
            // Avoid water area
            if (!(x > -35 && x < 5 && z > 5 && z < 40)) {
                grassPositions.push({ x, z });
            }
        }
    }

    return grassPositions;
};

const grassPositions = generateGrassPositions();

export const DECORATIONS: Decoration[] = [
    // Trees and nature - spread around village perimeter
    { path: 'Trees.glb', x: -22, z: -18, scale: 1.5, yOffset: 0 },
    { path: 'Trees.glb', x: 22, z: -17, scale: 1.5, yOffset: 0 },
    { path: 'Trees.glb', x: -21, z: 20, scale: 1.5, yOffset: 0 },
    { path: 'Trees.glb', x: 21, z: 19, scale: 1.5, yOffset: 0 },
    { path: 'Pine Trees.glb', x: -25, z: -12, scale: 1, yOffset: 0 },
    { path: 'Pine Trees.glb', x: 25, z: -10, scale: 1, yOffset: 0 },
    { path: 'Pine Trees.glb', x: -24, z: 12, scale: 1, yOffset: 0 },
    { path: 'Pine Trees.glb', x: 24, z: 14, scale: 1, yOffset: 0 },
    { path: 'Pine Trees.glb', x: -28, z: -8, scale: 1, yOffset: 0 },
    { path: 'Pine Trees.glb', x: 28, z: -6, scale: 1, yOffset: 0 },
    { path: 'Pine Trees.glb', x: -27, z: 16, scale: 1, yOffset: 0 },
    { path: 'Pine Trees.glb', x: 27, z: 18, scale: 1, yOffset: 0 },

    // GRASS - randomly scattered around the landscape
    ...grassPositions.map(pos => ({
        path: 'Grass.glb',
        x: pos.x,
        z: pos.z,
        scale: 0.3 + Math.random() * 0.1,
        yOffset: 0,
        rotation: Math.random() * Math.PI * 2,
    })),

    // Trees cut (logs) - near sawmill
    { path: 'Trees cut.glb', x: -6, z: -10, scale: 0.6, yOffset: 0 },
    { path: 'Trees cut.glb', x: 6, z: -11, scale: 0.6, yOffset: 0 },
    { path: 'Logs.glb', x: -7, z: -9, scale: 0.6, yOffset: 0 },
    { path: 'Logs.glb', x: 7, z: -10, scale: 0.6, yOffset: 0 },

    // Rocks - scattered around landscape
    { path: 'Rocks.glb', x: -23, z: -6, scale: 0.7, yOffset: 0 },
    { path: 'Rocks.glb', x: 23, z: -4, scale: 0.7, yOffset: 0 },
    { path: 'Rocks.glb', x: -22, z: 8, scale: 0.7, yOffset: 0 },
    { path: 'Rocks.glb', x: 22, z: 10, scale: 0.7, yOffset: 0 },
    { path: 'Rock.glb', x: -18, z: -16, scale: 0.6, yOffset: 0 },
    { path: 'Rock.glb', x: 18, z: -15, scale: 0.6, yOffset: 0 },
    { path: 'Rock.glb', x: -17, z: 22, scale: 0.6, yOffset: 0 },
    { path: 'Rock.glb', x: 17, z: 24, scale: 0.6, yOffset: 0 },

    // MOUNTAINS - far away
    { path: 'Mountain.glb', x: -40, z: -35, scale: 5, yOffset: 0 },
    { path: 'Mountain.glb', x: -28, z: -40, scale: 4.5, yOffset: 0 },
    { path: 'Mountain.glb', x: -16, z: -45, scale: 5.5, yOffset: 0 },
    { path: 'Mountain.glb', x: -4, z: -48, scale: 4, yOffset: 0 },
    { path: 'Mountain.glb', x: 8, z: -46, scale: 5, yOffset: 0 },
    { path: 'Mountain.glb', x: 20, z: -42, scale: 4.5, yOffset: 0 },
    { path: 'Mountain.glb', x: 32, z: -38, scale: 5.5, yOffset: 0 },
    { path: 'Mountain.glb', x: 44, z: -36, scale: 4, yOffset: 0 },

    // Mountains range - east side
    { path: 'Mountains.glb', x: 48, z: -18, scale: 5, yOffset: 0 },
    { path: 'Mountains.glb', x: 50, z: -8, scale: 4.5, yOffset: 0 },
    { path: 'Mountains.glb', x: 48, z: 2, scale: 5, yOffset: 0 },
    { path: 'Mountains.glb', x: 46, z: 12, scale: 4, yOffset: 0 },
    { path: 'Mountains.glb', x: 52, z: -2, scale: 5.5, yOffset: 0 },

    // Mountains range - west side
    { path: 'Mountain Group.glb', x: -48, z: -15, scale: 5, yOffset: 0 },
    { path: 'Mountain Group.glb', x: -50, z: -5, scale: 4.5, yOffset: 0 },
    { path: 'Mountain Group.glb', x: -48, z: 5, scale: 5, yOffset: 0 },
    { path: 'Mountain Group.glb', x: -46, z: 15, scale: 4, yOffset: 0 },
    { path: 'Mountain Group.glb', x: -52, z: 0, scale: 5.5, yOffset: 0 },

    // Far background mountains
    { path: 'Mountain.glb', x: -55, z: -30, scale: 6, yOffset: 0 },
    { path: 'Mountain.glb', x: 55, z: -25, scale: 6, yOffset: 0 },
    { path: 'Mountains.glb', x: -58, z: -5, scale: 5.5, yOffset: 0 },
    { path: 'Mountains.glb', x: 58, z: 2, scale: 5.5, yOffset: 0 },

    // Gold resources - near mines
    { path: 'Gold Rocks.glb', x: -19, z: -13, scale: 0.6, yOffset: 0 },
    { path: 'Resource Gold.glb', x: 19, z: -12, scale: 0.6, yOffset: 0 },

    // Market area - village center (spread out)
    { path: 'Market Stalls.glb', x: -3, z: -3, scale: 0.7, yOffset: 0 },
    { path: 'Market Stalls-4ZAhRv2tLG.glb', x: 3, z: -2, scale: 0.7, yOffset: 0 },
    { path: 'Market Stalls-OLd8vu6lPL.glb', x: -2, z: -4, scale: 0.7, yOffset: 0 },
    { path: 'Market Stalls-PUZZ5F91OE.glb', x: 2, z: -3, scale: 0.7, yOffset: 0 },
    { path: 'Market Stalls Compact.glb', x: 0, z: -5, scale: 0.7, yOffset: 0 },
    { path: 'Village Market.glb', x: 4, z: -4, scale: 0.8, yOffset: 0 },
    { path: 'Market Stalls.glb', x: -4, z: 1, scale: 0.7, yOffset: 0, rotation: 0.5 },

    // Farm resources - agricultural area
    { path: 'Crops.glb', x: -9, z: -10, scale: 0.7, yOffset: 0 },
    { path: 'Crops.glb', x: -8, z: -11, scale: 0.7, yOffset: 0 },
    { path: 'Crops.glb', x: 9, z: -9, scale: 0.7, yOffset: 0 },
    { path: 'Crops.glb', x: 8, z: -10, scale: 0.7, yOffset: 0 },
    { path: 'Farm Dirt.glb', x: -10, z: -9, scale: 0.7, yOffset: 0 },
    { path: 'Farm Dirt.glb', x: 10, z: -8, scale: 0.7, yOffset: 0 },
    { path: 'Crops.glb', x: -11, z: 9, scale: 0.7, yOffset: 0 },
    { path: 'Crops.glb', x: 11, z: 10, scale: 0.7, yOffset: 0 },

    // Mines
    { path: 'Mine.glb', x: -24, z: -3, scale: 0.8, yOffset: 0 },
    { path: 'Mine.glb', x: 24, z: -1, scale: 0.8, yOffset: 0 },
    { path: 'Mine.glb', x: -23, z: 4, scale: 0.7, yOffset: 0 },

    // Temple area decorations
    { path: 'Wonder First Age Leve.glb', x: -9, z: 20, scale: 0.7, yOffset: 0 },
    { path: 'Wonder First Age Leve.glb', x: 9, z: 20, scale: 0.7, yOffset: 0 },
    { path: 'Temple First Age Leve.glb', x: -10, z: 19, scale: 0.7, yOffset: 0 },
    { path: 'Wonder First Age Leve.glb', x: 0, z: 24, scale: 0.7, yOffset: 0 },

    // Town center decorations
    { path: 'Town Center Second Age.glb', x: -2, z: 3, scale: 0.6, yOffset: 0 },
    { path: 'Town Center-76GTkSh4KM.glb', x: 2, z: 3, scale: 0.6, yOffset: 0 },
    { path: 'Town Center-CoERW5nFdE.glb', x: 0, z: 4, scale: 0.6, yOffset: 0 },

    // Walls and towers
    { path: 'Wall Towers.glb', x: -5, z: -14, scale: 0.6, yOffset: 0 },
    { path: 'Wall Towers Door Seco.glb', x: 5, z: -13, scale: 0.6, yOffset: 0 },
    { path: 'Wooden Wall.glb', x: -3, z: -12, scale: 0.6, yOffset: 0 },
    { path: 'Wall Towers.glb', x: -6, z: 13, scale: 0.6, yOffset: 0 },
    { path: 'Wall Towers Door Seco.glb', x: 6, z: 14, scale: 0.6, yOffset: 0 },

    // Archery
    { path: 'Archery Second Age Le.glb', x: 18, z: 13, scale: 0.7, yOffset: 0 },
    { path: 'Archery Towers-IA5qOjIAiT.glb', x: 19, z: 12, scale: 0.7, yOffset: 0 },
    { path: 'Archery Training Grounds-5dWpau7C3k.glb', x: 20, z: 11, scale: 0.7, yOffset: 0 },

    // Port decorations
    { path: 'Port-4sE6lmhGPF.glb', x: -18, z: 19, scale: 0.7, yOffset: 0 },
    { path: 'Shipping Port-rDX8W8uqip.glb', x: -19, z: 18, scale: 0.7, yOffset: 0 },
    { path: 'Dock-XViKoBh2UN.glb', x: -20, z: 19, scale: 0.7, yOffset: 0 },
    { path: 'Port-4sE6lmhGPF.glb', x: -17, z: 22, scale: 0.6, yOffset: 0 },

    { path: 'Wooden Sign.glb', x: -100, z: 2, scale: 1.2, yOffset: 0, rotation: -0.8 },
    { path: 'Wooden Sign.glb', x: 28, z: -22, scale: 1.2, yOffset: 0, rotation: 0.8 },
    { path: 'Wooden Sign.glb', x: -32, z: 8, scale: 1.2, yOffset: 0, rotation: -0.6 },
    { path: 'Wooden Sign.glb', x: 32, z: 10, scale: 1.2, yOffset: 0, rotation: 0.6 },
    { path: 'Wooden Sign.glb', x: 0, z: -32, scale: 1.2, yOffset: 0, rotation: 0 },
    { path: 'Wooden Sign.glb', x: -15, z: -30, scale: 1.2, yOffset: 0, rotation: -0.7 },
    { path: 'Wooden Sign.glb', x: 15, z: -30, scale: 1.2, yOffset: 0, rotation: 0.7 },
];