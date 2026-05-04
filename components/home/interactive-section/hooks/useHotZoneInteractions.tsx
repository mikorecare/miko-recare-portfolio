import { useState, RefObject } from "react";
import { HotZone } from "./useHotZones";

export const useHotZoneInteraction = (
  canvasRef: RefObject <HTMLCanvasElement | null>,
  hotZones: HotZone[],
  onHoverEnter: (zoneId: string, zoneName: string) => void,
  onHoverLeave: (zoneId: string) => void,
) => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const isPointInZone = (x: number, y: number, zone: HotZone): boolean => {
    const canvas = canvasRef.current;
    const drawRect = (canvas as any)?.drawRect;
    if (!canvas || !drawRect) return false;

    const { drawX, drawY, drawWidth, drawHeight } = drawRect;
    const imgX = (x - drawX) / drawWidth;
    const imgY = (y - drawY) / drawHeight;

    if (imgX < 0 || imgX > 1 || imgY < 0 || imgY > 1) return false;

    if (zone.type === "circle" && zone.cx && zone.cy && zone.r) {
      const dx = imgX - zone.cx;
      const dy = imgY - zone.cy;
      return Math.sqrt(dx * dx + dy * dy) <= zone.r;
    }

    if (zone.type === "polygon" && zone.points) {
      let inside = false;
      for (
        let i = 0, j = zone.points.length - 1;
        i < zone.points.length;
        j = i++
      ) {
        const xi = zone.points[i][0],
          yi = zone.points[i][1];
        const xj = zone.points[j][0],
          yj = zone.points[j][1];
        const intersect =
          yi > imgY != yj > imgY &&
          imgX < ((xj - xi) * (imgY - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    }
    return false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let foundZone: HotZone | null = null;
    for (const zone of hotZones) {
      if (isPointInZone(x, y, zone)) {
        foundZone = zone;
        break;
      }
    }

    if (foundZone && hoveredZone !== foundZone.id) {
      setHoveredZone(foundZone.id);
      onHoverEnter(foundZone.id, foundZone.name);
    } else if (!foundZone && hoveredZone !== null) {
      setHoveredZone(null);
      onHoverLeave(hoveredZone);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const zone of hotZones) {
      if (isPointInZone(x, y, zone)) {
        zone.onClick();
        break;
      }
    }
  };

  return { hoveredZone, handleMouseMove, handleClick };
};
