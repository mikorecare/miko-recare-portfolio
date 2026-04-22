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
    // Center - Market area (spread out, smaller collision)
    { path: 'Fantasy Inn.glb', x: 80, z: 60, scale: 1.3, collisionRadius: 1.5 },
    { path: 'Fantasy House.glb', x: 72, z: 55, scale: 1.1, rotation: 0.5, collisionRadius: 1.0 },
    { path: 'Fantasy House-BH2XHWUNmF.glb', x: 88, z: 56, scale: 1.1, rotation: -0.3, collisionRadius: 1.0 },
    { path: 'Fantasy Barracks.glb', x: 70, z: 65, scale: 1, rotation: 0.8, collisionRadius: 1.2 },
    { path: 'Fantasy Stable.glb', x: 90, z: 64, scale: 1, rotation: -0.5, collisionRadius: 1.0 },
    { path: 'Fantasy Sawmill.glb', x: 68, z: 58, scale: 0.9, rotation: 0.3, collisionRadius: 1.2 },
    { path: 'Fantasy House-dcPho4SUA3.glb', x: 66, z: 63, scale: 0.95, rotation: -0.2, collisionRadius: 1.0 },
    { path: 'Bell Tower.glb', x: 85, z: 50, scale: 0.8, collisionRadius: 0.9 },
    { path: 'Blacksmith.glb', x: 73, z: 70, scale: 1, rotation: 0.6, collisionRadius: 1.0 },
    { path: 'Mill.glb', x: 94, z: 61, scale: 0.9, rotation: 0.4, collisionRadius: 1.2 },
    { path: 'Fantasy House.glb', x: 65, z: 60, scale: 0.9, rotation: 0.7, collisionRadius: 0.9 },
    { path: 'Fantasy House-BH2XHWUNmF.glb', x: 92, z: 53, scale: 0.9, rotation: -0.6, collisionRadius: 0.9 },
    { path: 'Fantasy Inn.glb', x: 69, z: 70, scale: 0.9, rotation: 0.4, collisionRadius: 1.2 },
    { path: 'Bell Tower.glb', x: 75, z: 48, scale: 0.7, collisionRadius: 0.8 },
    { path: 'Fantasy House.glb', x: 86, z: 72, scale: 0.9, rotation: 0.3, collisionRadius: 0.9 },
];

export const VILLAGE2_DECORATIONS = [
    // Well and central decorations
    { path: 'Well.glb', x: 78, z: 60, scale: 0.9 },
    { path: 'Bonfire.glb', x: 82, z: 63, scale: 0.8 },
    { path: 'Bonfire.glb', x: 74, z: 56, scale: 0.7 },
    { path: 'Cart.glb', x: 87, z: 62, scale: 0.8, rotation: 0.8 },
    { path: 'Cart.glb', x: 73, z: 61, scale: 0.8, rotation: -0.5 },
    { path: 'Cart.glb', x: 71, z: 67, scale: 0.7, rotation: 0.6 },

    // Market area (spread out)
    { path: 'Market Stand.glb', x: 83, z: 57, scale: 0.8, rotation: -0.4 },
    { path: 'Market Stand-DGIM5HGISb.glb', x: 77, z: 58, scale: 0.8, rotation: 0.3 },
    { path: 'Market Stand.glb', x: 88, z: 66, scale: 0.8, rotation: 0.5 },
    { path: 'Market Stand-DGIM5HGISb.glb', x: 72, z: 54, scale: 0.7, rotation: -0.3 },
    { path: 'Market Stand.glb', x: 80, z: 53, scale: 0.7, rotation: 0.2 },

    // Gazebos (further out)
    { path: 'Gazebo.glb', x: 71, z: 73, scale: 0.8 },
    { path: 'Gazebo.glb', x: 89, z: 49, scale: 0.7 },
    { path: 'Gazebo.glb', x: 82, z: 46, scale: 0.7 },

    // Scattered props (spread out)
    { path: 'Barrel.glb', x: 81, z: 62, scale: 0.7 },
    { path: 'Barrel.glb', x: 84, z: 60, scale: 0.7 },
    { path: 'Barrel.glb', x: 75, z: 59, scale: 0.7 },
    { path: 'Barrel.glb', x: 76, z: 66, scale: 0.7 },
    { path: 'Barrel.glb', x: 89, z: 59, scale: 0.7 },
    { path: 'Barrel.glb', x: 91, z: 56, scale: 0.7 },

    { path: 'Crate.glb', x: 77, z: 63, scale: 0.7 },
    { path: 'Crate.glb', x: 79, z: 64, scale: 0.7 },
    { path: 'Crate.glb', x: 85, z: 58, scale: 0.7 },
    { path: 'Crate.glb', x: 72, z: 58, scale: 0.7 },
    { path: 'Crate.glb', x: 87, z: 68, scale: 0.7 },

    { path: 'Bags.glb', x: 86, z: 57, scale: 0.7 },
    { path: 'Bags.glb', x: 74, z: 57, scale: 0.7 },
    { path: 'Bags.glb', x: 90, z: 62, scale: 0.6 },

    { path: 'Hay.glb', x: 73, z: 59, scale: 0.7 },
    { path: 'Hay.glb', x: 86, z: 61, scale: 0.7 },
    { path: 'Hay.glb', x: 79, z: 68, scale: 0.7 },

    { path: 'Rocks.glb', x: 93, z: 54, scale: 0.6 },
    { path: 'Rocks.glb', x: 67, z: 68, scale: 0.6 },
    { path: 'Rocks.glb', x: 95, z: 64, scale: 0.6 },
    { path: 'Rocks.glb', x: 66, z: 56, scale: 0.6 },

    { path: 'Bench.glb', x: 76, z: 53, scale: 0.7, rotation: 1.2 },
    { path: 'Bench-7uSlZo3n9Y.glb', x: 87, z: 70, scale: 0.7, rotation: -0.8 },
    { path: 'Bench.glb', x: 72, z: 52, scale: 0.7, rotation: 0.5 },
    { path: 'Bench.glb', x: 90, z: 52, scale: 0.7, rotation: -0.5 },

    { path: 'Bag Open.glb', x: 85, z: 56, scale: 0.6 },
    { path: 'Bag.glb', x: 75, z: 58, scale: 0.6 },
    { path: 'Bag Open.glb', x: 69, z: 65, scale: 0.6 },
    { path: 'Cauldron.glb', x: 78, z: 67, scale: 0.7 },
    { path: 'Cauldron.glb', x: 84, z: 52, scale: 0.7 },
    { path: 'Stairs.glb', x: 79, z: 61, scale: 0.6 },
    { path: 'Stairs.glb', x: 83, z: 60, scale: 0.6 },
    { path: 'Package.glb', x: 87, z: 58, scale: 0.5 },
    { path: 'Package-kYvD6QCQRd.glb', x: 74, z: 63, scale: 0.5 },
    { path: 'Package.glb', x: 70, z: 60, scale: 0.5 },
    { path: 'Sawmill Saw.glb', x: 68.5, z: 57, scale: 0.6 },
    { path: 'Bell.glb', x: 85.2, z: 49.5, scale: 0.5, yOffset: 2 },
    { path: 'Bell.glb', x: 74.8, z: 47.5, scale: 0.4, yOffset: 1.8 },
];

export const VILLAGE2_FENCE_POSITIONS = [
    // Outer perimeter - spread wider
    { x: 60, z: 42 }, { x: 63, z: 43 }, { x: 66, z: 44 }, { x: 69, z: 45 },
    { x: 72, z: 46 }, { x: 75, z: 47 }, { x: 78, z: 48 }, { x: 81, z: 49 },
    { x: 84, z: 50 }, { x: 87, z: 51 }, { x: 90, z: 52 }, { x: 93, z: 53 },
    { x: 96, z: 55 }, { x: 97, z: 58 }, { x: 98, z: 61 }, { x: 98, z: 64 },
    { x: 97, z: 67 }, { x: 96, z: 70 }, { x: 94, z: 73 }, { x: 91, z: 75 },
    { x: 88, z: 77 }, { x: 85, z: 78 }, { x: 82, z: 78 }, { x: 79, z: 78 },
    { x: 76, z: 77 }, { x: 73, z: 76 }, { x: 70, z: 75 }, { x: 67, z: 73 },
    { x: 64, z: 71 }, { x: 62, z: 68 }, { x: 60, z: 65 }, { x: 59, z: 62 },
    { x: 59, z: 59 }, { x: 60, z: 56 }, { x: 61, z: 53 }, { x: 60, z: 50 },
    { x: 60, z: 47 }, { x: 60, z: 44 },
];