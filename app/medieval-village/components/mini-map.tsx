"use client";

import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

interface MiniMapProps {
  trees: { x: number; z: number }[];
  buildings: { x: number; z: number; radius: number }[];
  decorations?: { x: number; z: number }[];
  secondVillagePosition: { x: number; z: number };
}

export interface MiniMapRef {
  updatePosition: (x: number, z: number, rotation: number) => void;
}

const MiniMap = forwardRef<MiniMapRef, MiniMapProps>(
  (
    { trees, buildings, decorations = [], secondVillagePosition },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pulse, setPulse] = useState(0);

    // Store current position for drawing
    const currentPosRef = useRef({ x: 0, z: 0, rotation: 0 });

    // Pulsing animation for player marker
    useEffect(() => {
      const interval = setInterval(() => {
        setPulse((prev) => (prev + 0.1) % (Math.PI * 2));
      }, 100);
      return () => clearInterval(interval);
    }, []);

    // Expose update method to parent
    useImperativeHandle(ref, () => ({
      updatePosition: (x: number, z: number, rotation: number) => {
        currentPosRef.current = { x, z, rotation };
        drawMiniMap();
      },
    }));

    const drawMiniMap = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Semi-transparent dark background (like game maps)
      ctx.fillStyle = "rgba(20, 25, 35, 0.75)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw border with glow effect
      ctx.strokeStyle = "#8B7355";
      ctx.lineWidth = 3;
      ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

      // Inner border glow
      ctx.strokeStyle = "rgba(139, 115, 85, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      // Map bounds (from -50 to 120 in both X and Z)
      const minX = -120; // Changed from -50 to accommodate start at -100
      const maxX = 120; // Keep as is
      const minZ = -80; // Increased range
      const maxZ = 120; // Keep as is

      const mapWidth = canvas.width - 40;
      const mapHeight = canvas.height - 40;
      const offsetX = 20;
      const offsetY = 20;

      const toScreenX = (x: number) =>
        offsetX + ((x - minX) / (maxX - minX)) * mapWidth;
      const toScreenY = (z: number) =>
        offsetY + mapHeight - ((z - minZ) / (maxZ - minZ)) * mapHeight;
      

      // Draw trees (green with glow)
      trees.forEach((tree) => {
        ctx.fillStyle = "#3a7d2c";
        ctx.shadowBlur = 3;
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.beginPath();
        const screenX = toScreenX(tree.x);
        const screenY = toScreenY(tree.z);
        ctx.arc(screenX, screenY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2d5a2d";
        ctx.beginPath();
        ctx.arc(screenX - 0.5, screenY - 0.5, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw decorations (small light brown dots)
      decorations.forEach((dec) => {
        ctx.fillStyle = "rgba(196, 164, 106, 0.8)";
        ctx.shadowBlur = 2;
        const screenX = toScreenX(dec.x);
        const screenY = toScreenY(dec.z);
        ctx.beginPath();
        ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw buildings (terracotta with shadow)
      buildings.forEach((building) => {
        ctx.fillStyle = "#c46a3a";
        ctx.shadowBlur = 3;
        const screenX = toScreenX(building.x);
        const screenY = toScreenY(building.z);
        const size = Math.max(5, building.radius * 1.5);
        ctx.fillRect(screenX - size / 2, screenY - size / 2, size, size);
        ctx.fillStyle = "#a0522d";
        ctx.fillRect(
          screenX - size / 4,
          screenY - size / 4,
          size / 2,
          size / 2,
        );
      });

      // Draw second village marker (purple star with glow)
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(155, 89, 182, 0.5)";
      ctx.fillStyle = "#9b59b6";
      const village2X = toScreenX(secondVillagePosition.x);
      const village2Y = toScreenY(secondVillagePosition.z);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = ((i * 72 - 90) * Math.PI) / 180;
        const x = village2X + Math.cos(angle) * 8;
        const y = village2Y + Math.sin(angle) * 8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Draw first village marker (gold star)
      ctx.fillStyle = "#f1c40f";
      const village1X = toScreenX(0);
      const village1Y = toScreenY(0);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = ((i * 72 - 90) * Math.PI) / 180;
        const x = village1X + Math.cos(angle) * 6;
        const y = village1Y + Math.sin(angle) * 6;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Reset shadow for player marker
      ctx.shadowBlur = 0;

      // Draw player - DIRECTION ARROW with pulsing effect
      const playerX = toScreenX(currentPosRef.current.x);
      const playerY = toScreenY(currentPosRef.current.z);
      const playerRotation = currentPosRef.current.rotation;

      // Pulsing outer glow
      const pulseSize = 14 + Math.sin(pulse) * 3;
      ctx.fillStyle = `rgba(255, 50, 50, ${0.3 + Math.sin(pulse) * 0.15})`;
      ctx.beginPath();
      ctx.arc(playerX, playerY, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Draw direction arrow - using math to calculate points around player position
      const arrowLength = 12;
      const arrowWidth = 6;
      // Camera rotation: 0 = facing +Z (north/up on minimap)
      // No inversion needed - use rotation directly
      const angle = playerRotation + Math.PI;

      // Calculate arrow points
      const tipX = playerX + Math.sin(angle) * arrowLength;
      const tipY = playerY - Math.cos(angle) * arrowLength;

      const leftX = playerX + Math.sin(angle - 0.7) * arrowWidth;
      const leftY = playerY - Math.cos(angle - 0.7) * arrowWidth;

      const rightX = playerX + Math.sin(angle + 0.7) * arrowWidth;
      const rightY = playerY - Math.cos(angle + 0.7) * arrowWidth;

      const backX = playerX - Math.sin(angle) * 4;
      const backY = playerY + Math.cos(angle) * 4;

      ctx.fillStyle = "#ff4444";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(leftX, leftY);
      ctx.lineTo(backX, backY);
      ctx.lineTo(rightX, rightY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // White center dot
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(playerX, playerY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw labels with semi-transparent background
      ctx.font = "bold 10px monospace";
      ctx.shadowBlur = 0;

      // Village 1 label
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(toScreenX(0) - 20, toScreenY(0) - 20, 40, 16);
      ctx.fillStyle = "#f1c40f";
      ctx.fillText("Village", toScreenX(0) - 16, toScreenY(0) - 10);

      // Village 2 label
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(toScreenX(80) - 20, toScreenY(60) - 20, 40, 16);
      ctx.fillStyle = "#9b59b6";
      ctx.fillText("Village 2", toScreenX(80) - 16, toScreenY(60) - 10);

      // Port label
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(toScreenX(-15) - 15, toScreenY(20) - 20, 35, 16);
      ctx.fillStyle = "#4B8BBe";
      ctx.fillText("Port", toScreenX(-15) - 12, toScreenY(20) - 10);

      // Draw compass rose (North indicator)
      const compassX = canvas.width - 35;
      const compassY = 35;
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.beginPath();
      ctx.arc(compassX, compassY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px monospace";
      ctx.fillText("N", compassX - 3, compassY - 5);
      ctx.fillStyle = "#888888";
      ctx.fillText("S", compassX - 3, compassY + 12);
      ctx.fillText("W", compassX - 18, compassY + 4);
      ctx.fillText("E", compassX + 12, compassY + 4);

      // Draw scale bar
      const scaleX = 30;
      const scaleY = canvas.height - 25;
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(scaleX - 5, scaleY - 5, 70, 12);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(scaleX, scaleY, 20, 2);
      ctx.fillRect(scaleX + 40, scaleY, 20, 2);
      ctx.fillStyle = "#888888";
      ctx.font = "8px monospace";
      ctx.fillText("50m", scaleX + 25, scaleY + 8);

      // Draw legend
      const legendY = canvas.height - 45;
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(10, legendY - 5, 120, 40);
      ctx.font = "8px monospace";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("Legend:", 15, legendY + 3);
      ctx.fillStyle = "#3a7d2c";
      ctx.fillRect(55, legendY - 2, 6, 6);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("Tree", 65, legendY + 3);
      ctx.fillStyle = "#c46a3a";
      ctx.fillRect(95, legendY - 2, 6, 6);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("Bldg", 105, legendY + 3);
      ctx.fillStyle = "#ff4444";
      ctx.beginPath();
      ctx.moveTo(135, legendY + 1);
      ctx.lineTo(138, legendY - 3);
      ctx.lineTo(132, legendY - 3);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillText("You", 145, legendY + 3);
    };

    // Initial draw
    useEffect(() => {
      drawMiniMap();
    }, [trees, buildings, decorations, secondVillagePosition]);

    // Redraw on pulse
    useEffect(() => {
      drawMiniMap();
    }, [pulse]);

    return (
      <canvas
        ref={canvasRef}
        width={350}
        height={350}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          width: "260px",
          height: "260px",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
          border: "2px solid rgba(139, 115, 85, 0.8)",
          zIndex: 100,
          backdropFilter: "blur(2px)",
        }}
      />
    );
  },
);

MiniMap.displayName = "MiniMap";

export default MiniMap;
