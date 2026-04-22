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
    // Center - Town Center (increased scales)
    { path: 'Town Center.glb', x: 0, z: 0, scale: 2.0, yOffset: 0, collisionRadius: 4 },
    { path: 'Castle.glb', x: 0, z: 0, scale: 1.8, yOffset: 0, collisionRadius: 3.5 },

    // Castle area
    { path: 'Castle Fortress.glb', x: -12, z: -10, scale: 1.8, yOffset: 0, collisionRadius: 4 },
    { path: 'Castle Gate.glb', x: -8, z: -12, scale: 1.5, yOffset: 0, collisionRadius: 3 },
    { path: 'Stone Wall.glb', x: -10, z: -8, scale: 1.2, yOffset: 0, rotation: 0.5, collisionRadius: 2 },
    { path: 'Stone Wall Towers.glb', x: -14, z: -12, scale: 1.3, yOffset: 0, collisionRadius: 2.5 },

    // Houses - Residential area (increased)
    { path: 'House.glb', x: -5, z: -4, scale: 1.5, yOffset: 0, rotation: 0.5, collisionRadius: 2.5 },
    { path: 'House-k6tP5nFUd2.glb', x: 5, z: -3, scale: 1.5, yOffset: 0, rotation: -0.3, collisionRadius: 2.5 },
    { path: 'House-nihGGju7DW.glb', x: -6, z: 3, scale: 1.5, yOffset: 0, rotation: 0.8, collisionRadius: 2.5 },
    { path: 'House-oJJIRwv6Bo.glb', x: 7, z: 2, scale: 1.5, yOffset: 0, rotation: -0.5, collisionRadius: 2.5 },
    { path: 'House-RSwoYSLblu.glb', x: -8, z: -1, scale: 1.4, yOffset: 0, rotation: 0.3, collisionRadius: 2.5 },
    { path: 'House-vZ1CLbWmSx.glb', x: 8, z: -5, scale: 1.4, yOffset: 0, rotation: -0.6, collisionRadius: 2.5 },
    { path: 'House-YlADpCJU8U.glb', x: -9, z: 5, scale: 1.4, yOffset: 0, rotation: -0.2, collisionRadius: 2.5 },
    { path: 'House.glb', x: 9, z: 4, scale: 1.4, yOffset: 0, rotation: 0.4, collisionRadius: 2.5 },
    { path: 'Houses.glb', x: -4, z: 6, scale: 1.4, yOffset: 0, rotation: 0.6, collisionRadius: 2.8 },
    { path: 'Houses-gEjAC1UvVU.glb', x: 4, z: 7, scale: 1.4, yOffset: 0, rotation: -0.4, collisionRadius: 2.8 },

    // Huts (increased)
    { path: 'Hut.glb', x: -3, z: -6, scale: 1.2, yOffset: 0, collisionRadius: 2 },
    { path: 'Hut-4MJWbyd6vw.glb', x: 3, z: -7, scale: 1.2, yOffset: 0, collisionRadius: 2 },
    { path: 'Hut-wxi3kAu5ey.glb', x: -7, z: -5, scale: 1.2, yOffset: 0, collisionRadius: 2 },
    { path: 'Huts.glb', x: 6, z: -6, scale: 1.2, yOffset: 0, collisionRadius: 2.5 },

    // Barracks - Military area (increased)
    { path: 'Barracks.glb', x: -10, z: 7, scale: 1.5, yOffset: 0, rotation: 0.5, collisionRadius: 2.8 },
    { path: 'Barracks-a1C1L8gJTX.glb', x: 10, z: 6, scale: 1.5, yOffset: 0, rotation: -0.5, collisionRadius: 2.8 },
    { path: 'Barracks-dvlksXgxWc.glb', x: -11, z: 8, scale: 1.4, yOffset: 0, collisionRadius: 2.8 },
    { path: 'Barracks-lnyADheSvA.glb', x: 11, z: 8, scale: 1.4, yOffset: 0, collisionRadius: 2.8 },
    { path: 'Barracks-puD1kbV4kf.glb', x: -12, z: 6, scale: 1.4, yOffset: 0, collisionRadius: 2.8 },

    // Towers (increased)
    { path: 'Watch Tower.glb', x: -13, z: -5, scale: 1.5, yOffset: 0, collisionRadius: 2.2 },
    { path: 'Watch Tower-VJZZW37Vsk.glb', x: 13, z: -4, scale: 1.5, yOffset: 0, collisionRadius: 2.2 },
    { path: 'Watch Tower-cMxuj2gt7D.glb', x: -14, z: 4, scale: 1.5, yOffset: 0, collisionRadius: 2.2 },
    { path: 'Stone Tower.glb', x: 14, z: 5, scale: 1.5, yOffset: 0, collisionRadius: 2.2 },
    { path: 'Stone Tower-dJLAD6p90F.glb', x: -2, z: -12, scale: 1.5, yOffset: 0, collisionRadius: 2.2 },
    { path: 'Small Watch Tower.glb', x: 2, z: -13, scale: 1.3, yOffset: 0, collisionRadius: 1.8 },
    { path: 'Tower House.glb', x: -1, z: 12, scale: 1.4, yOffset: 0, collisionRadius: 2.2 },

    // Military structures (increased)
    { path: 'Wooden Fortress.glb', x: -15, z: -2, scale: 1.5, yOffset: 0, rotation: 0.3, collisionRadius: 3.5 },
    { path: 'Wooden Fortress Gate.glb', x: -16, z: -1, scale: 1.3, yOffset: 0, collisionRadius: 2.5 },
    { path: 'Wooden Encampment.glb', x: 15, z: -3, scale: 1.4, yOffset: 0, rotation: -0.3, collisionRadius: 2.8 },
    { path: 'Fortress.glb', x: 16, z: 2, scale: 1.5, yOffset: 0, collisionRadius: 3.5 },

    // Farms (increased)
    { path: 'Farm.glb', x: -8, z: -9, scale: 1.3, yOffset: 0, rotation: 0.4, collisionRadius: 2.5 },
    { path: 'Farm-91wMLb9kKo.glb', x: 8, z: -8, scale: 1.3, yOffset: 0, rotation: -0.4, collisionRadius: 2.5 },
    { path: 'Farm-O4wpTLSfIn.glb', x: -9, z: 10, scale: 1.3, yOffset: 0, collisionRadius: 2.5 },
    { path: 'Small Farm.glb', x: 9, z: 10, scale: 1.2, yOffset: 0, collisionRadius: 2 },

    // Temples (increased)
    { path: 'Temple.glb', x: -5, z: 12, scale: 1.6, yOffset: 0, rotation: 0.2, collisionRadius: 2.8 },
    { path: 'Temple-CE2Mn7lh6A.glb', x: 5, z: 12, scale: 1.6, yOffset: 0, rotation: -0.2, collisionRadius: 2.8 },
    { path: 'Temple-nR264crTSr.glb', x: 0, z: 14, scale: 1.5, yOffset: 0, collisionRadius: 2.8 },
    { path: 'Wodden Temple.glb', x: -6, z: 13, scale: 1.3, yOffset: 0, collisionRadius: 2.5 },

    // Business (increased)
    { path: 'Business Building.glb', x: -3, z: -3, scale: 1.3, yOffset: 0, rotation: 0.5, collisionRadius: 2 },
    { path: 'Storage House.glb', x: 3, z: -2, scale: 1.2, yOffset: 0, rotation: -0.3, collisionRadius: 2 },
    { path: 'Storage Shed.glb', x: -4, z: -5, scale: 1.1, yOffset: 0, collisionRadius: 1.8 },
    { path: 'Storage shed-fkTsDdpQAA.glb', x: 4, z: -4, scale: 1.1, yOffset: 0, collisionRadius: 1.8 },
    { path: 'Storage Hut.glb', x: -2, z: 5, scale: 1.1, yOffset: 0, collisionRadius: 1.8 },

    // Shacks (increased)
    { path: 'Shack.glb', x: 12, z: -7, scale: 1.1, yOffset: 0, collisionRadius: 1.8 },
    { path: 'Shack-HuzLJcbUd2.glb', x: -12, z: -7, scale: 1.1, yOffset: 0, collisionRadius: 1.8 },

    // Windmill (increased)
    { path: 'Windmill.glb', x: 13, z: -9, scale: 1.4, yOffset: 0, collisionRadius: 2.2 },
    { path: 'Windmill-jpHoi9xDLG.glb', x: -13, z: -9, scale: 1.4, yOffset: 0, collisionRadius: 2.2 },

    // Archery (increased)
    { path: 'Archery Building.glb', x: 14, z: 8, scale: 1.3, yOffset: 0, rotation: 0.3, collisionRadius: 2 },
    { path: 'Archery Towers.glb', x: 15, z: 7, scale: 1.3, yOffset: 0, collisionRadius: 2 },
    { path: 'Archery Training Grounds.glb', x: 16, z: 6, scale: 1.3, yOffset: 0, collisionRadius: 2.5 },

    // Port/Dock area (increased)
    { path: 'Port.glb', x: -14, z: 14, scale: 1.4, yOffset: 0, rotation: -0.5, collisionRadius: 2.8 },
    { path: 'Dock.glb', x: -15, z: 15, scale: 1.2, yOffset: 0, collisionRadius: 2 },
    { path: 'Docks.glb', x: -16, z: 14, scale: 1.2, yOffset: 0, collisionRadius: 2 },
    { path: 'Shipping Port.glb', x: -13, z: 15, scale: 1.3, yOffset: 0, collisionRadius: 2.5 },

    // Walls (increased)
    { path: 'Wooden Wall.glb', x: -3, z: -10, scale: 1.0, yOffset: 0, rotation: 0.2, collisionRadius: 1.5 },
    { path: 'Wooden Wall-L0TxLurnES.glb', x: 3, z: -11, scale: 1.0, yOffset: 0, rotation: -0.2, collisionRadius: 1.5 },
    { path: 'Stone Wall.glb', x: -1, z: -11, scale: 1.0, yOffset: 0, collisionRadius: 1.5 },

    // Wooden structures (increased)
    { path: 'Wooden Monument.glb', x: 0, z: -9, scale: 1.1, yOffset: 0, collisionRadius: 1.5 },
    { path: 'Wooden house tower.glb', x: 1, z: -8, scale: 1.1, yOffset: 0, collisionRadius: 1.8 },
];