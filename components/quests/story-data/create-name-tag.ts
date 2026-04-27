import * as THREE from "three";
export function createNameTag(name: string): THREE.Sprite {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 256;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    ctx.strokeStyle = "#ffcc44";
    ctx.lineWidth = 4;

    const radius = 30;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(canvas.width - radius, 0);
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
    ctx.lineTo(canvas.width, canvas.height - radius);
    ctx.quadraticCurveTo(
        canvas.width,
        canvas.height,
        canvas.width - radius,
        canvas.height,
    );
    ctx.lineTo(radius, canvas.height);
    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Decorative corners
    ctx.fillStyle = "#ffcc44";
    ctx.fillRect(20, 20, 30, 6);
    ctx.fillRect(20, 20, 6, 30);
    ctx.fillRect(canvas.width - 50, 20, 30, 6);
    ctx.fillRect(canvas.width - 26, 20, 6, 30);
    ctx.fillRect(20, canvas.height - 26, 30, 6);
    ctx.fillRect(20, canvas.height - 50, 6, 30);
    ctx.fillRect(canvas.width - 50, canvas.height - 26, 30, 6);
    ctx.fillRect(canvas.width - 26, canvas.height - 50, 6, 30);

    // Gradient text
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#ffcc44");
    gradient.addColorStop(0.5, "#ffaa22");
    gradient.addColorStop(1, "#ffcc44");

    ctx.fillStyle = gradient;
    ctx.font = 'Bold 84px "Arial", "Georgia", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({
        map: texture,
        depthTest: true,
        transparent: true,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(4, 1.2, 1);

    return sprite;
}