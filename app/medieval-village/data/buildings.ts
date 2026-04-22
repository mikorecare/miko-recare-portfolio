export interface Building {
    path: string;
    x: number;
    z: number;
    scale: number;
    yOffset?: number;
    rotation?: number;
    collisionRadius: number;
}

export const BUILDINGS: Building[] = [
    // Center - Town Center
    { path: 'Town Center.glb', x: 0, z: 0, scale: 2.0, yOffset: 0, collisionRadius: 1.8 },
    { path: 'Castle.glb', x: 0, z: 0, scale: 1.8, yOffset: 0, collisionRadius: 1.5 },

    // Castle area
    { path: 'Castle Fortress.glb', x: -18, z: -14, scale: 1.8, yOffset: 0, collisionRadius: 1.8 },
    { path: 'Castle Gate.glb', x: -12, z: -18, scale: 1.5, yOffset: 0, collisionRadius: 1.2 },
    { path: 'Stone Wall.glb', x: -14, z: -12, scale: 1.2, yOffset: 0, rotation: 0.5, collisionRadius: 0.8 },
    { path: 'Stone Wall Towers.glb', x: -20, z: -16, scale: 1.3, yOffset: 0, collisionRadius: 1.0 },

    // Houses - Residential area
    { path: 'House.glb', x: -10, z: -6, scale: 1.5, yOffset: 0, rotation: 0.5, collisionRadius: 1.0 },
    { path: 'House-k6tP5nFUd2.glb', x: 10, z: -5, scale: 1.5, yOffset: 0, rotation: -0.3, collisionRadius: 1.0 },
    { path: 'House-nihGGju7DW.glb', x: -11, z: 5, scale: 1.5, yOffset: 0, rotation: 0.8, collisionRadius: 1.0 },
    { path: 'House-oJJIRwv6Bo.glb', x: 12, z: 4, scale: 1.5, yOffset: 0, rotation: -0.5, collisionRadius: 1.0 },
    { path: 'House-RSwoYSLblu.glb', x: -13, z: -3, scale: 1.4, yOffset: 0, rotation: 0.3, collisionRadius: 0.9 },
    { path: 'House-vZ1CLbWmSx.glb', x: 13, z: -7, scale: 1.4, yOffset: 0, rotation: -0.6, collisionRadius: 0.9 },
    { path: 'House-YlADpCJU8U.glb', x: -14, z: 7, scale: 1.4, yOffset: 0, rotation: -0.2, collisionRadius: 0.9 },
    { path: 'House.glb', x: 14, z: 6, scale: 1.4, yOffset: 0, rotation: 0.4, collisionRadius: 0.9 },
    { path: 'Houses.glb', x: -8, z: 10, scale: 1.4, yOffset: 0, rotation: 0.6, collisionRadius: 1.2 },
    { path: 'Houses-gEjAC1UvVU.glb', x: 8, z: 11, scale: 1.4, yOffset: 0, rotation: -0.4, collisionRadius: 1.2 },

    // Huts
    { path: 'Hut.glb', x: -6, z: -10, scale: 1.2, yOffset: 0, collisionRadius: 0.8 },
    { path: 'Hut-4MJWbyd6vw.glb', x: 6, z: -11, scale: 1.2, yOffset: 0, collisionRadius: 0.8 },
    { path: 'Hut-wxi3kAu5ey.glb', x: -12, z: -9, scale: 1.2, yOffset: 0, collisionRadius: 0.8 },
    { path: 'Huts.glb', x: 11, z: -10, scale: 1.2, yOffset: 0, collisionRadius: 1.0 },

    // Barracks - Military area
    { path: 'Barracks.glb', x: -16, z: 11, scale: 1.5, yOffset: 0, rotation: 0.5, collisionRadius: 1.2 },
    { path: 'Barracks-a1C1L8gJTX.glb', x: 16, z: 10, scale: 1.5, yOffset: 0, rotation: -0.5, collisionRadius: 1.2 },
    { path: 'Barracks-dvlksXgxWc.glb', x: -17, z: 12, scale: 1.4, yOffset: 0, collisionRadius: 1.1 },
    { path: 'Barracks-lnyADheSvA.glb', x: 17, z: 12, scale: 1.4, yOffset: 0, collisionRadius: 1.1 },
    { path: 'Barracks-puD1kbV4kf.glb', x: -18, z: 10, scale: 1.4, yOffset: 0, collisionRadius: 1.1 },

    // Towers
    { path: 'Watch Tower.glb', x: -19, z: -7, scale: 1.5, yOffset: 0, collisionRadius: 1.0 },
    { path: 'Watch Tower-VJZZW37Vsk.glb', x: 19, z: -6, scale: 1.5, yOffset: 0, collisionRadius: 1.0 },
    { path: 'Watch Tower-cMxuj2gt7D.glb', x: -20, z: 6, scale: 1.5, yOffset: 0, collisionRadius: 1.0 },
    { path: 'Stone Tower.glb', x: 20, z: 7, scale: 1.5, yOffset: 0, collisionRadius: 1.0 },
    { path: 'Stone Tower-dJLAD6p90F.glb', x: -4, z: -18, scale: 1.5, yOffset: 0, collisionRadius: 1.0 },
    { path: 'Small Watch Tower.glb', x: 4, z: -19, scale: 1.3, yOffset: 0, collisionRadius: 0.8 },
    { path: 'Tower House.glb', x: -3, z: 18, scale: 1.4, yOffset: 0, collisionRadius: 0.9 },

    // Military structures
    { path: 'Wooden Fortress.glb', x: -21, z: -4, scale: 1.5, yOffset: 0, rotation: 0.3, collisionRadius: 1.5 },
    { path: 'Wooden Fortress Gate.glb', x: -22, z: -3, scale: 1.3, yOffset: 0, collisionRadius: 1.0 },
    { path: 'Wooden Encampment.glb', x: 21, z: -5, scale: 1.4, yOffset: 0, rotation: -0.3, collisionRadius: 1.2 },
    { path: 'Fortress.glb', x: 22, z: 4, scale: 1.5, yOffset: 0, collisionRadius: 1.5 },

    // Farms
    { path: 'Farm.glb', x: -12, z: -13, scale: 1.3, yOffset: 0, rotation: 0.4, collisionRadius: 1.0 },
    { path: 'Farm-91wMLb9kKo.glb', x: 12, z: -12, scale: 1.3, yOffset: 0, rotation: -0.4, collisionRadius: 1.0 },
    { path: 'Farm-O4wpTLSfIn.glb', x: -13, z: 14, scale: 1.3, yOffset: 0, collisionRadius: 1.0 },
    { path: 'Small Farm.glb', x: 13, z: 14, scale: 1.2, yOffset: 0, collisionRadius: 0.8 },

    // Temples
    { path: 'Temple.glb', x: -9, z: 18, scale: 1.6, yOffset: 0, rotation: 0.2, collisionRadius: 1.2 },
    { path: 'Temple-CE2Mn7lh6A.glb', x: 9, z: 18, scale: 1.6, yOffset: 0, rotation: -0.2, collisionRadius: 1.2 },
    { path: 'Temple-nR264crTSr.glb', x: 0, z: 22, scale: 1.5, yOffset: 0, collisionRadius: 1.2 },
    { path: 'Wodden Temple.glb', x: -10, z: 19, scale: 1.3, yOffset: 0, collisionRadius: 1.0 },

    // Business
    { path: 'Business Building.glb', x: -5, z: -5, scale: 1.3, yOffset: 0, rotation: 0.5, collisionRadius: 0.8 },
    { path: 'Storage House.glb', x: 5, z: -4, scale: 1.2, yOffset: 0, rotation: -0.3, collisionRadius: 0.8 },
    { path: 'Storage Shed.glb', x: -6, z: -7, scale: 1.1, yOffset: 0, collisionRadius: 0.7 },
    { path: 'Storage shed-fkTsDdpQAA.glb', x: 6, z: -6, scale: 1.1, yOffset: 0, collisionRadius: 0.7 },
    { path: 'Storage Hut.glb', x: -4, z: 7, scale: 1.1, yOffset: 0, collisionRadius: 0.7 },

    // Shacks
    { path: 'Shack.glb', x: 18, z: -11, scale: 1.1, yOffset: 0, collisionRadius: 0.7 },
    { path: 'Shack-HuzLJcbUd2.glb', x: -18, z: -11, scale: 1.1, yOffset: 0, collisionRadius: 0.7 },

    // Windmill
    { path: 'Windmill.glb', x: 19, z: -13, scale: 1.4, yOffset: 0, collisionRadius: 0.9 },
    { path: 'Windmill-jpHoi9xDLG.glb', x: -19, z: -13, scale: 1.4, yOffset: 0, collisionRadius: 0.9 },

    // Archery
    { path: 'Archery Building.glb', x: 20, z: 12, scale: 1.3, yOffset: 0, rotation: 0.3, collisionRadius: 0.8 },
    { path: 'Archery Towers.glb', x: 21, z: 11, scale: 1.3, yOffset: 0, collisionRadius: 0.8 },
    { path: 'Archery Training Grounds.glb', x: 22, z: 10, scale: 1.3, yOffset: 0, collisionRadius: 1.0 },

    // Port/Dock area
    { path: 'Port.glb', x: -20, z: 20, scale: 1.4, yOffset: 0, rotation: -0.5, collisionRadius: 1.2 },
    { path: 'Dock.glb', x: -21, z: 21, scale: 1.2, yOffset: 0, collisionRadius: 0.8 },
    { path: 'Docks.glb', x: -22, z: 20, scale: 1.2, yOffset: 0, collisionRadius: 0.8 },
    { path: 'Shipping Port.glb', x: -19, z: 21, scale: 1.3, yOffset: 0, collisionRadius: 1.0 },

    // Walls
    { path: 'Wooden Wall.glb', x: -5, z: -16, scale: 1.0, yOffset: 0, rotation: 0.2, collisionRadius: 0.6 },
    { path: 'Wooden Wall-L0TxLurnES.glb', x: 5, z: -17, scale: 1.0, yOffset: 0, rotation: -0.2, collisionRadius: 0.6 },
    { path: 'Stone Wall.glb', x: -3, z: -17, scale: 1.0, yOffset: 0, collisionRadius: 0.6 },

    // Wooden structures
    { path: 'Wooden Monument.glb', x: 0, z: -15, scale: 1.1, yOffset: 0, collisionRadius: 0.6 },
    { path: 'Wooden house tower.glb', x: 3, z: -12, scale: 1.1, yOffset: 0, collisionRadius: 0.7 },
];