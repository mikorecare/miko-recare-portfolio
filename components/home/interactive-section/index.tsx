"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useModal } from "../modal/modal";
import { useHotZones } from "./hooks/useHotZones";
import { useCanvasDrawing } from "./hooks/useCanvassDrawing";
import { useTypingEffect } from "./hooks/useTypingEffect";
import { useSoundEffects } from "./hooks/useSoundEffects";
import { useHotZoneInteraction } from "./hooks/useHotZoneInteractions";
import { HotZone } from "./hooks/useHotZones";
import NPCGuide from "@/components/ui/npc-guide";

interface InteractiveSectionProps {
  onBack: () => void;
  onToggleMusic: ()=> void;
}

const InteractiveSection = ({ onBack, onToggleMusic }: InteractiveSectionProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [drawRect, setDrawRect] = useState({
    drawX: 0,
    drawY: 0,
    drawWidth: 0,
    drawHeight: 0,
  });

  const { showModal, ModalComponent } = useModal();

  const { typingText, isTyping, startTyping, stopTyping } = useTypingEffect();
  const { playHoverSound, playOnSound, playOffSound } = useSoundEffects();

  const toggleTheme = () => {
    if (!isDarkTheme) {
      playOnSound();
    } else {
      playOffSound();
    }
    setIsDarkTheme((prev) => !prev);
  };

  const hotZones = useHotZones(onBack, onToggleMusic, toggleTheme, showModal);

  useEffect(() => {
    const img = new Image();
    img.src = isDarkTheme ? "/final-bg-dark.webp" : "/final-bg.webp";
    img.onload = () => {
      setImage(img);
      setImageLoaded(true);
    };
  }, [isDarkTheme]);

  const canvasRef = useCanvasDrawing(imageLoaded, image, null, hotZones);

  // Get drawRect from canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDrawRect = () => {
      const rect = (canvas as any).drawRect;
      if (rect) {
        setDrawRect(rect);
      }
    };

    updateDrawRect();
    window.addEventListener("resize", updateDrawRect);
    return () => window.removeEventListener("resize", updateDrawRect);
  }, [canvasRef, imageLoaded]);

  const { hoveredZone, handleMouseMove, handleClick } = useHotZoneInteraction(
    canvasRef,
    hotZones,
    (zoneId, zoneName) => {
      playHoverSound();
      startTyping(zoneId, `➤ ${zoneName.toUpperCase()}_`);
    },
    (zoneId) => stopTyping(zoneId),
  );

  useEffect(() => {
    if (!imageLoaded || !image) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const drawRectData = (canvas as any).drawRect;
    if (!ctx || !drawRectData) return;

    const { drawX, drawY, drawWidth, drawHeight } = drawRectData;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

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
  }, [hoveredZone, image, imageLoaded, hotZones, canvasRef]);

  const getLabelPosition = (zone: HotZone) => {
    const canvas = canvasRef.current;
    const drawRectData = (canvas as any)?.drawRect;
    if (!canvas || !drawRectData) return { x: 0, y: 0 };

    const { drawX, drawY, drawWidth, drawHeight } = drawRectData;

    if (zone.type === "circle" && zone.cx && zone.cy && zone.r) {
      return {
        x: drawX + zone.cx * drawWidth,
        y: drawY + (zone.cy - zone.r - 0.03) * drawHeight,
      };
    } else if (zone.type === "polygon" && zone.points) {
      let centerX = 0,
        minY = Infinity;
      for (const p of zone.points) {
        centerX += p[0];
        if (p[1] < minY) minY = p[1];
      }
      centerX /= zone.points.length;
      return {
        x: drawX + centerX * drawWidth,
        y: drawY + (minY - 0.05) * drawHeight,
      };
    }
    return { x: 0, y: 0 };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full bg-stone-900"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />

      {/* NPC Guide - positioned at bottom right of the drawn image */}
      {drawRect.drawWidth > 0 && (
        <div
          className="absolute z-50 max-w-xs"
          style={{
            left: drawRect.drawX + drawRect.drawWidth - 300,
            top: drawRect.drawY + drawRect.drawHeight - 190
          }}
        >
          <div className="w-[300px] h-[220px]">
            <NPCGuide />
          </div>
        </div>
      )}

      {hoveredZone && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: getLabelPosition(hotZones.find((z) => z.id === hoveredZone)!)
              .x,
            top: getLabelPosition(hotZones.find((z) => z.id === hoveredZone)!)
              .y,
            transform: "translateX(-50%)",
          }}
        >
          <span className="font-reactor7 text-[15px] tracking-wider px-3 py-1 rounded-sm bg-black/80 backdrop-blur-sm border border-cyan-400/50 shadow-[0_0_10px_rgba(0,255,255,0.3)] text-cyan-400 inline-flex items-center whitespace-nowrap">
            {isTyping[hoveredZone]
              ? typingText[hoveredZone]
              : `➤ ${hotZones.find((z) => z.id === hoveredZone)?.name.toUpperCase()}`}
            {!isTyping[hoveredZone] && (
              <span className="animate-pulse inline-block ml-1">_</span>
            )}
          </span>
        </div>
      )}
      <ModalComponent />
    </motion.div>
  );
};

export default InteractiveSection;
