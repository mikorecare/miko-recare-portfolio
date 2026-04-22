export function createUI(): HTMLDivElement {
    const info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.bottom = '20px';
    info.style.left = '20px';
    info.style.backgroundColor = 'rgba(0,0,0,0.7)';
    info.style.color = 'white';
    info.style.padding = '10px 15px';
    info.style.fontFamily = 'monospace';
    info.style.fontSize = '12px';
    info.style.borderRadius = '5px';
    info.style.zIndex = '1000';
    info.style.pointerEvents = 'none';
    info.style.backdropFilter = 'blur(5px)';
    info.innerHTML = `
    MEDIEVAL VILLAGE EXPLORER
    
    Click to lock mouse | WASD to walk | Mouse to look around
    Starting from the hill - Follow the path to the village
    
    Used all assets including:
    - Buildings: Inn, Houses, Barracks, Stable, Sawmill, Blacksmith, Mill
    - Decorations: Well, Bonfire, Cart, Market Stands, Gazebo, Bench
    - Props: Barrels, Crates, Bags, Hay, Rocks, Cauldron, Packages
    - Details: Windows, Doors, Stairs, Bell, Saw, Smoke
  `;
    return info;
}

export function createCrosshair(container: HTMLElement): HTMLDivElement {
    const crosshair = document.createElement('div');
    crosshair.style.position = 'absolute';
    crosshair.style.top = '50%';
    crosshair.style.left = '50%';
    crosshair.style.width = '3px';
    crosshair.style.height = '3px';
    crosshair.style.backgroundColor = 'white';
    crosshair.style.borderRadius = '50%';
    crosshair.style.transform = 'translate(-50%, -50%)';
    crosshair.style.pointerEvents = 'none';
    crosshair.style.zIndex = '1000';
    container.style.position = 'relative';
    container.appendChild(crosshair);
    return crosshair;
}