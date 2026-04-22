export interface Decoration {
    path: string;
    x: number;
    z: number;
    scale: number;
    yOffset?: number;
    rotation?: number;
}

export const DECORATIONS: Decoration[] = [
    // Trees and nature (scattered around village)
    { path: 'Trees.glb', x: -18, z: -15, scale: 0.8, yOffset: 0 },
    { path: 'Trees.glb', x: 18, z: -14, scale: 0.8, yOffset: 0 },
    { path: 'Trees.glb', x: -17, z: 16, scale: 0.8, yOffset: 0 },
    { path: 'Trees.glb', x: 17, z: 15, scale: 0.8, yOffset: 0 },
    { path: 'Pine Trees.glb', x: -20, z: -10, scale: 0.7, yOffset: 0 },
    { path: 'Pine Trees.glb', x: 20, z: -8, scale: 0.7, yOffset: 0 },
    { path: 'Pine Trees.glb', x: -19, z: 10, scale: 0.7, yOffset: 0 },
    { path: 'Pine Trees.glb', x: 19, z: 12, scale: 0.7, yOffset: 0 },

    // Trees cut (logs) - near sawmill
    { path: 'Trees cut.glb', x: -4, z: -8, scale: 0.6, yOffset: 0 },
    { path: 'Trees cut.glb', x: 4, z: -9, scale: 0.6, yOffset: 0 },
    { path: 'Logs.glb', x: -5, z: -7, scale: 0.6, yOffset: 0 },
    { path: 'Logs.glb', x: 5, z: -8, scale: 0.6, yOffset: 0 },

    // Rocks - scattered around landscape
    { path: 'Rocks.glb', x: -19, z: -5, scale: 0.7, yOffset: 0 },
    { path: 'Rocks.glb', x: 19, z: -3, scale: 0.7, yOffset: 0 },
    { path: 'Rocks.glb', x: -18, z: 5, scale: 0.7, yOffset: 0 },
    { path: 'Rocks.glb', x: 18, z: 7, scale: 0.7, yOffset: 0 },
    { path: 'Rock.glb', x: -15, z: -13, scale: 0.6, yOffset: 0 },
    { path: 'Rock.glb', x: 15, z: -12, scale: 0.6, yOffset: 0 },

    // MOUNTAINS - placed far away in the distance (scale 5 as requested)
    // North mountains (behind village)
    { path: 'Mountain.glb', x: -35, z: -30, scale: 5, yOffset: 0 },
    { path: 'Mountain.glb', x: -25, z: -35, scale: 4.5, yOffset: 0 },
    { path: 'Mountain.glb', x: -15, z: -38, scale: 5.5, yOffset: 0 },
    { path: 'Mountain.glb', x: -5, z: -40, scale: 4, yOffset: 0 },
    { path: 'Mountain.glb', x: 5, z: -38, scale: 5, yOffset: 0 },
    { path: 'Mountain.glb', x: 15, z: -35, scale: 4.5, yOffset: 0 },
    { path: 'Mountain.glb', x: 25, z: -32, scale: 5.5, yOffset: 0 },
    { path: 'Mountain.glb', x: 35, z: -30, scale: 4, yOffset: 0 },

    // Mountains range - east side
    { path: 'Mountains.glb', x: 40, z: -15, scale: 5, yOffset: 0 },
    { path: 'Mountains.glb', x: 42, z: -5, scale: 4.5, yOffset: 0 },
    { path: 'Mountains.glb', x: 40, z: 5, scale: 5, yOffset: 0 },
    { path: 'Mountains.glb', x: 38, z: 15, scale: 4, yOffset: 0 },

    // Mountains range - west side
    { path: 'Mountain Group.glb', x: -40, z: -12, scale: 5, yOffset: 0 },
    { path: 'Mountain Group.glb', x: -42, z: -2, scale: 4.5, yOffset: 0 },
    { path: 'Mountain Group.glb', x: -40, z: 8, scale: 5, yOffset: 0 },
    { path: 'Mountain Group.glb', x: -38, z: 18, scale: 4, yOffset: 0 },

    // Far background mountains (distant)
    { path: 'Mountain.glb', x: -45, z: -25, scale: 6, yOffset: 0 },
    { path: 'Mountain.glb', x: 45, z: -20, scale: 6, yOffset: 0 },
    { path: 'Mountains.glb', x: -48, z: 0, scale: 5.5, yOffset: 0 },
    { path: 'Mountains.glb', x: 48, z: 5, scale: 5.5, yOffset: 0 },

    // Gold resources - near mines
    { path: 'Gold Rocks.glb', x: -17, z: -11, scale: 0.6, yOffset: 0 },
    { path: 'Resource Gold.glb', x: 17, z: -10, scale: 0.6, yOffset: 0 },

    // Market area - village center
    { path: 'Market Stalls.glb', x: -2, z: -2, scale: 0.7, yOffset: 0 },
    { path: 'Market Stalls-4ZAhRv2tLG.glb', x: 2, z: -1, scale: 0.7, yOffset: 0 },
    { path: 'Market Stalls-OLd8vu6lPL.glb', x: -1, z: -3, scale: 0.7, yOffset: 0 },
    { path: 'Market Stalls-PUZZ5F91OE.glb', x: 1, z: -2, scale: 0.7, yOffset: 0 },
    { path: 'Market Stalls Compact.glb', x: 0, z: -4, scale: 0.7, yOffset: 0 },
    { path: 'Village Market.glb', x: 3, z: -3, scale: 0.8, yOffset: 0 },

    // Farm resources - agricultural area
    { path: 'Crops.glb', x: -7, z: -8, scale: 0.7, yOffset: 0 },
    { path: 'Crops.glb', x: -6, z: -9, scale: 0.7, yOffset: 0 },
    { path: 'Crops.glb', x: 7, z: -7, scale: 0.7, yOffset: 0 },
    { path: 'Crops.glb', x: 6, z: -8, scale: 0.7, yOffset: 0 },
    { path: 'Farm Dirt.glb', x: -8, z: -7, scale: 0.7, yOffset: 0 },
    { path: 'Farm Dirt.glb', x: 8, z: -6, scale: 0.7, yOffset: 0 },

    // Mines - resource extraction sites
    { path: 'Mine.glb', x: -20, z: -2, scale: 0.8, yOffset: 0 },
    { path: 'Mine.glb', x: 20, z: 0, scale: 0.8, yOffset: 0 },

    // Temple area - religious district
    { path: 'Wonder First Age Leve.glb', x: -7, z: 14, scale: 0.7, yOffset: 0 },
    { path: 'Wonder First Age Leve.glb', x: 7, z: 14, scale: 0.7, yOffset: 0 },
    { path: 'Temple First Age Leve.glb', x: -8, z: 13, scale: 0.7, yOffset: 0 },

    // Town center - civic buildings
    { path: 'Town Center Second Age.glb', x: -1, z: 2, scale: 0.6, yOffset: 0 },
    { path: 'Town Center-76GTkSh4KM.glb', x: 1, z: 2, scale: 0.6, yOffset: 0 },
    { path: 'Town Center-CoERW5nFdE.glb', x: 0, z: 3, scale: 0.6, yOffset: 0 },

    // Walls and towers - defensive structures
    { path: 'Wall Towers.glb', x: -4, z: -11, scale: 0.6, yOffset: 0 },
    { path: 'Wall Towers Door Seco.glb', x: 4, z: -10, scale: 0.6, yOffset: 0 },
    { path: 'Wooden Wall.glb', x: -2, z: -9, scale: 0.6, yOffset: 0 },

    // Archery - military training
    { path: 'Archery Second Age Le.glb', x: 14, z: 9, scale: 0.7, yOffset: 0 },
    { path: 'Archery Towers-IA5qOjIAiT.glb', x: 15, z: 8, scale: 0.7, yOffset: 0 },
    { path: 'Archery Training Grounds-5dWpau7C3k.glb', x: 16, z: 7, scale: 0.7, yOffset: 0 },

    // Port decorations - harbor area
    { path: 'Port-4sE6lmhGPF.glb', x: -14, z: 15, scale: 0.7, yOffset: 0 },
    { path: 'Shipping Port-rDX8W8uqip.glb', x: -15, z: 14, scale: 0.7, yOffset: 0 },
    { path: 'Dock-XViKoBh2UN.glb', x: -16, z: 15, scale: 0.7, yOffset: 0 },
];