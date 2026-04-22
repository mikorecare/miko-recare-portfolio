export interface Building {
    path: string;
    x: number;
    z: number;
    scale: number;
    yOffset?: number;
    rotation?: number;
    collisionRadius: number;
}

export const VILLAGE2_BUILDINGS: Building[] = [
    // Center - Market area
    { path: 'Fantasy Inn.glb', x: 80, z: 60, scale: 1.3, collisionRadius: 2.5 },
    { path: 'Fantasy House.glb', x: 75, z: 57, scale: 1.1, rotation: 0.5, collisionRadius: 2 },
    { path: 'Fantasy House-BH2XHWUNmF.glb', x: 85, z: 58, scale: 1.1, rotation: -0.3, collisionRadius: 2 },
    { path: 'Fantasy Barracks.glb', x: 74, z: 65, scale: 1, rotation: 0.8, collisionRadius: 2.2 },
    { path: 'Fantasy Stable.glb', x: 88, z: 63, scale: 1, rotation: -0.5, collisionRadius: 2 },
    { path: 'Fantasy Sawmill.glb', x: 71, z: 56, scale: 0.9, rotation: 0.3, collisionRadius: 2.5 },
    { path: 'Fantasy House-dcPho4SUA3.glb', x: 70, z: 62, scale: 0.95, rotation: -0.2, collisionRadius: 2 },
    { path: 'Bell Tower.glb', x: 84, z: 53, scale: 0.8, collisionRadius: 1.8 },
    { path: 'Blacksmith.glb', x: 76, z: 68, scale: 1, rotation: 0.6, collisionRadius: 2 },
    { path: 'Mill.glb', x: 91, z: 59, scale: 0.9, rotation: 0.4, collisionRadius: 2.2 },
    { path: 'Fantasy House.glb', x: 69, z: 59, scale: 0.9, rotation: 0.7, collisionRadius: 1.8 },
    { path: 'Fantasy House-BH2XHWUNmF.glb', x: 89, z: 55, scale: 0.9, rotation: -0.6, collisionRadius: 1.8 },
    { path: 'Fantasy Inn.glb', x: 72, z: 68, scale: 0.9, rotation: 0.4, collisionRadius: 2 },
    { path: 'Bell Tower.glb', x: 73, z: 52, scale: 0.7, collisionRadius: 1.5 },
    { path: 'Fantasy House.glb', x: 83, z: 69, scale: 0.9, rotation: 0.3, collisionRadius: 1.8 },
];

export const VILLAGE2_DECORATIONS = [
    // Well and central decorations
    { path: 'Well.glb', x: 78.5, z: 60, scale: 0.9 },
    { path: 'Bonfire.glb', x: 80.5, z: 63, scale: 0.8 },
    { path: 'Bonfire.glb', x: 77, z: 55, scale: 0.7 },
    { path: 'Cart.glb', x: 85, z: 61, scale: 0.8, rotation: 0.8 },
    { path: 'Cart.glb', x: 75, z: 59.5, scale: 0.8, rotation: -0.5 },
    { path: 'Cart.glb', x: 73, z: 66, scale: 0.7, rotation: 0.6 },

    // Market area
    { path: 'Market Stand.glb', x: 82.5, z: 56.5, scale: 0.8, rotation: -0.4 },
    { path: 'Market Stand-DGIM5HGISb.glb', x: 78, z: 56, scale: 0.8, rotation: 0.3 },
    { path: 'Market Stand.glb', x: 86, z: 65, scale: 0.8, rotation: 0.5 },
    { path: 'Market Stand-DGIM5HGISb.glb', x: 74, z: 54, scale: 0.7, rotation: -0.3 },

    // Gazebos
    { path: 'Gazebo.glb', x: 74, z: 71, scale: 0.8 },
    { path: 'Gazebo.glb', x: 87, z: 52, scale: 0.7 },
    { path: 'Gazebo.glb', x: 80, z: 48, scale: 0.7 },

    // Scattered props
    { path: 'Barrel.glb', x: 82, z: 61.5, scale: 0.7 },
    { path: 'Barrel.glb', x: 82.3, z: 61.2, scale: 0.7 },
    { path: 'Barrel.glb', x: 76, z: 59, scale: 0.7 },
    { path: 'Barrel.glb', x: 75.5, z: 65.5, scale: 0.7 },
    { path: 'Barrel.glb', x: 87, z: 61.5, scale: 0.7 },
    { path: 'Barrel.glb', x: 89, z: 58, scale: 0.7 },

    { path: 'Crate.glb', x: 76.5, z: 62.5, scale: 0.7 },
    { path: 'Crate.glb', x: 76.8, z: 62.8, scale: 0.7 },
    { path: 'Crate.glb', x: 83.5, z: 59.5, scale: 0.7 },
    { path: 'Crate.glb', x: 73, z: 57, scale: 0.7 },
    { path: 'Crate.glb', x: 85, z: 67, scale: 0.7 },

    { path: 'Bags.glb', x: 85, z: 58, scale: 0.7 },
    { path: 'Bags.glb', x: 75, z: 57.5, scale: 0.7 },
    { path: 'Bags.glb', x: 88, z: 64, scale: 0.6 },

    { path: 'Hay.glb', x: 74.5, z: 58.5, scale: 0.7 },
    { path: 'Hay.glb', x: 85.5, z: 60.5, scale: 0.7 },
    { path: 'Hay.glb', x: 78, z: 67, scale: 0.7 },

    { path: 'Rocks.glb', x: 90, z: 56, scale: 0.6 },
    { path: 'Rocks.glb', x: 70, z: 67, scale: 0.6 },
    { path: 'Rocks.glb', x: 91, z: 66, scale: 0.6 },
    { path: 'Rocks.glb', x: 69, z: 55, scale: 0.6 },

    { path: 'Bench.glb', x: 77, z: 54.5, scale: 0.7, rotation: 1.2 },
    { path: 'Bench-7uSlZo3n9Y.glb', x: 85, z: 67.5, scale: 0.7, rotation: -0.8 },
    { path: 'Bench.glb', x: 73, z: 53.5, scale: 0.7, rotation: 0.5 },
    { path: 'Bench.glb', x: 88, z: 54, scale: 0.7, rotation: -0.5 },

    { path: 'Bag Open.glb', x: 84.5, z: 57.5, scale: 0.6 },
    { path: 'Bag.glb', x: 76, z: 57, scale: 0.6 },
    { path: 'Bag Open.glb', x: 71, z: 64, scale: 0.6 },
    { path: 'Cauldron.glb', x: 77.5, z: 66.5, scale: 0.7 },
    { path: 'Cauldron.glb', x: 83, z: 54, scale: 0.7 },
    { path: 'Stairs.glb', x: 78.5, z: 61.2, scale: 0.6 },
    { path: 'Stairs.glb', x: 82, z: 59, scale: 0.6 },
    { path: 'Package.glb', x: 85.5, z: 59, scale: 0.5 },
    { path: 'Package-kYvD6QCQRd.glb', x: 75, z: 62.5, scale: 0.5 },
    { path: 'Package.glb', x: 71, z: 59, scale: 0.5 },
    { path: 'Sawmill Saw.glb', x: 71.5, z: 55.5, scale: 0.6 },
    { path: 'Bell.glb', x: 84.2, z: 52.8, scale: 0.5, yOffset: 2 },
    { path: 'Bell.glb', x: 72.8, z: 51.8, scale: 0.4, yOffset: 1.8 },
];

export const VILLAGE2_FENCE_POSITIONS = [
    { x: 65, z: 45 }, { x: 67, z: 46 }, { x: 69, z: 47 }, { x: 71, z: 48 },
    { x: 73, z: 49 }, { x: 75, z: 50 }, { x: 77, z: 51 }, { x: 79, z: 52 },
    { x: 81, z: 53 }, { x: 83, z: 54 }, { x: 85, z: 55 }, { x: 87, z: 56 },
    { x: 89, z: 57 }, { x: 91, z: 58 }, { x: 92, z: 60 }, { x: 93, z: 62 },
    { x: 94, z: 64 }, { x: 94, z: 66 }, { x: 94, z: 68 }, { x: 93, z: 70 },
    { x: 92, z: 72 }, { x: 90, z: 73 }, { x: 88, z: 74 }, { x: 86, z: 75 },
    { x: 84, z: 75 }, { x: 82, z: 75 }, { x: 80, z: 75 }, { x: 78, z: 74 },
    { x: 76, z: 73 }, { x: 74, z: 72 }, { x: 72, z: 71 }, { x: 70, z: 70 },
    { x: 68, z: 69 }, { x: 66, z: 68 }, { x: 64, z: 67 }, { x: 63, z: 65 },
    { x: 62, z: 63 }, { x: 62, z: 61 }, { x: 62, z: 59 }, { x: 63, z: 57 },
    { x: 64, z: 55 }, { x: 65, z: 53 }, { x: 65, z: 51 }, { x: 65, z: 49 },
    { x: 65, z: 47 },
];