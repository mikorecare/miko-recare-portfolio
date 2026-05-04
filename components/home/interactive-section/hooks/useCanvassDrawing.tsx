// hooks/useCanvassDrawing.ts
import { useEffect, useRef } from "react";
import { HotZone } from "./useHotZones";

export const useCanvasDrawing = (
  imageLoaded: boolean,
  image: HTMLImageElement | null,
  hoveredZone: string | null,
  hotZones: HotZone[],
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initial canvas setup
  useEffect(() => {
    if (!imageLoaded || !image) return;

    const drawBackground = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const imgAspect = image.width / image.height;
      const winAspect = window.innerWidth / window.innerHeight;
      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (winAspect > imgAspect) {
        drawHeight = window.innerHeight;
        drawWidth = drawHeight * imgAspect;
        drawX = (window.innerWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = window.innerWidth;
        drawHeight = drawWidth / imgAspect;
        drawX = 0;
        drawY = (window.innerHeight - drawHeight) / 2;
      }

      (canvas as any).drawRect = { drawX, drawY, drawWidth, drawHeight };
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    };

    drawBackground();
    window.addEventListener("resize", drawBackground);
    return () => window.removeEventListener("resize", drawBackground);
  }, [image, imageLoaded]);

  // Draw hover effects (restored)
  useEffect(() => {
    if (!imageLoaded || !image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const drawRect = (canvas as any).drawRect;
    if (!ctx || !drawRect) return;

    const { drawX, drawY, drawWidth, drawHeight } = drawRect;

    // Redraw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

    // Draw hover effect if a zone is hovered
    if (hoveredZone) {
      const zone = hotZones.find((z) => z.id === hoveredZone);
      if (zone) {
        ctx.save();
        ctx.strokeStyle = "#00ffff";
        ctx.fillStyle = "rgba(0, 255, 255, 0.05)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00ffff";
        ctx.lineWidth = 2;

        if (zone.type === "circle" && zone.cx && zone.cy && zone.r) {
          const x = drawX + zone.cx * drawWidth;
          const y = drawY + zone.cy * drawHeight;
          const r = zone.r * Math.min(drawWidth, drawHeight);

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (zone.type === "polygon" && zone.points) {
          ctx.beginPath();
          const firstPoint = zone.points[0];
          ctx.moveTo(
            drawX + firstPoint[0] * drawWidth,
            drawY + firstPoint[1] * drawHeight,
          );
          for (let i = 1; i < zone.points.length; i++) {
            ctx.lineTo(
              drawX + zone.points[i][0] * drawWidth,
              drawY + zone.points[i][1] * drawHeight,
            );
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  }, [hoveredZone, image, imageLoaded, hotZones]);

  return canvasRef;
};
