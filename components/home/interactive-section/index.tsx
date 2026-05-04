"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useModal } from "../modal/modal";
import { StacksModalContent } from "../modal/stack-modal-content";
import { AwardsModalContent } from "../modal/awards-modal-content";
import { ExperiencesModalContent } from "../modal/experiences-modal-content";
import { TrainingsModalContent } from "../modal/training-modal-content";
import { ProjectsModalContent } from "../modal/projects-modal-content";

interface InteractiveSectionProps {
  onBack: () => void;
}

interface HotZone {
  id: string;
  name: string;
  type: "polygon" | "circle";
  points?: number[][];
  cx?: number;
  cy?: number;
  r?: number;
  onClick: () => void;
}

const InteractiveSection = ({ onBack }: InteractiveSectionProps) => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [activeCoord, setActiveCoord] = useState<string | null>(null);
  const [typingText, setTypingText] = useState<{ [key: string]: string }>({});
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});
  const typingTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const { showModal, ModalComponent } = useModal();

  const hotZones: HotZone[] = [
    {
      id: "linkedin",
      name: "LinkedIn",
      type: "circle",
      cx: 0.08,
      cy: 0.3,
      r: 0.057,
      onClick: () => {
        const link = document.createElement("a");
        link.href = "https://www.linkedin.com/in/miko-recare/";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
      },
    },
    {
      id: "github",
      name: "Github",
      type: "circle",
      cx: 0.159,
      cy: 0.32,
      r: 0.05,
      onClick: () => {
        const link = document.createElement("a");
        link.href = "https://github.com/mikorecare";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
      },
    },
    {
      id: "awards",
      name: "Awards",
      type: "polygon",
      points: [
        [0.226, 0.06],
        [0.315, 0.17],
        [0.315, 0.374],
        [0.226, 0.36],
      ],
      onClick: () =>
        showModal(<AwardsModalContent />, {
          title: "AWARDS & RECOGNITION",
          maxWidth: "lg",
        }),
    },
    {
      id: "stacks",
      name: "Stacks",
      type: "polygon",
      points: [
        [0.06, 0.405],
        [0.295, 0.41],
        [0.295, 0.71],
        [0.064, 1],
      ],
      onClick: () =>
        showModal(<StacksModalContent />, {
          title: "TECH STACKS",
          maxWidth: "xl",
        }),
    },
    {
      id: "show_hero",
      name: "Show Hero",
      type: "polygon",
      points: [
        [0.443, 0.34],
        [0.54, 0.34],
        [0.54, 0.39],
        [0.443, 0.39],
      ],
      onClick: onBack,
    },
    {
      id: "contact",
      name: "Contact Me",
      type: "polygon",
      points: [
        [0.425, 0.78],
        [0.575, 0.78],
        [0.596, 0.9],
        [0.405, 0.9],
      ],
      onClick: () => {
        window.location.href = "mailto:mikorecare@gmail.com";
      },
    },
    {
      id: "experiences",
      name: "Experiences",
      type: "polygon",
      points: [
        [0.34, 0.43],
        [0.428, 0.425],
        [0.428, 0.556],
        [0.344, 0.61],
      ],
      onClick: () =>
        showModal(<ExperiencesModalContent />, {
          title: "EXPERIENCES",
          maxWidth: "lg",
        }),
    },
    {
      id: "projects",
      name: "Projects",
      type: "polygon",
      points: [
        [0.427, 0.422],
        [0.555, 0.422],
        [0.555, 0.557],
        [0.427, 0.557],
      ],
      onClick: () =>
        showModal(<ProjectsModalContent />, {
          title: "PROJECTS HANDLED",
          maxWidth: "lg",
        }),
    },
    {
      id: "trainings",
      name: "Trainings",
      type: "polygon",
      points: [
        [0.557, 0.384],
        [0.612, 0.384],
        [0.61, 0.582],
        [0.556, 0.58],
      ],
      onClick: () =>
        showModal(<TrainingsModalContent />, {
          title: "TRAININGS & CERTIFICATIONS",
          maxWidth: "lg",
        }),
    },

    {
      id: "download_cv",
      name: "Download CV",
      type: "polygon",
      points: [
        [0.59, 0.815],
        [0.68, 0.809],
        [0.74, 0.965],
        [0.63, 0.99],
      ],
      onClick: () => {
        const link = document.createElement("a");
        link.href = "/resume/Miko Recare CV.pdf";
        link.download = "Miko_Recare_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
  ];

  // Load image and setup full-screen canvas
  useEffect(() => {
    const img = new Image();
    img.src = "/bg-latest.webp";
    img.onload = () => {
      setImage(img);
      setImageLoaded(true);
    };
  }, []);

  // Handle canvas resize to full window
  useEffect(() => {
    if (!imageLoaded || !image) return;

    const updateCanvasSize = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas to full window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Calculate image position to cover the screen (like background cover)
      const imgAspect = image.width / image.height;
      const winAspect = window.innerWidth / window.innerHeight;

      let drawWidth, drawHeight, drawX, drawY;

      if (winAspect > imgAspect) {
        // Window is wider than image
        drawHeight = window.innerHeight;
        drawWidth = drawHeight * imgAspect;
        drawX = (window.innerWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        // Window is taller than image
        drawWidth = window.innerWidth;
        drawHeight = drawWidth / imgAspect;
        drawX = 0;
        drawY = (window.innerHeight - drawHeight) / 2;
      }

      // Store draw dimensions for coordinate calculations
      (canvas as any).drawRect = {
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        imgAspect,
      };

      // Draw background image
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

      // Draw hover effects
      if (hoveredZone) {
        const zone = hotZones.find((z) => z.id === hoveredZone);
        if (zone) {
          ctx.save();
          ctx.strokeStyle = "#00ffff";
          ctx.fillStyle = "rgba(0, 255, 255, 0.05)";
          ctx.lineWidth = 2;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#00ffff";

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
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("scroll", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("scroll", updateCanvasSize);
    };
  }, [image, imageLoaded, hoveredZone, hotZones]);

  // Redraw on hover change only
  useEffect(() => {
    if (!imageLoaded || !image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawRect = (canvas as any).drawRect;
    if (!drawRect) return;

    const { drawX, drawY, drawWidth, drawHeight } = drawRect;

    // Clear and redraw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

    if (hoveredZone) {
      const zone = hotZones.find((z) => z.id === hoveredZone);
      if (zone) {
        ctx.save();
        ctx.strokeStyle = "#00ffff";
        ctx.shadowBlur = 8;
        ctx.lineWidth = 2;
        // REMOVED fillStyle - no fill inside

        if (zone.type === "circle" && zone.cx && zone.cy && zone.r) {
          const x = drawX + zone.cx * drawWidth;
          const y = drawY + zone.cy * drawHeight;
          const r = zone.r * Math.min(drawWidth, drawHeight);

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          // REMOVED ctx.fill()
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
          // REMOVED ctx.fill()
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  }, [hoveredZone, image, imageLoaded]);

  // Check if point is inside a zone
  const isPointInZone = (x: number, y: number, zone: HotZone): boolean => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const drawRect = (canvas as any).drawRect;
    if (!drawRect) return false;

    const { drawX, drawY, drawWidth, drawHeight } = drawRect;

    // Convert screen coordinates to image-relative coordinates
    const imgX = (x - drawX) / drawWidth;
    const imgY = (y - drawY) / drawHeight;

    // Check if click is within image bounds
    if (imgX < 0 || imgX > 1 || imgY < 0 || imgY > 1) return false;

    if (zone.type === "circle" && zone.cx && zone.cy && zone.r) {
      const dx = imgX - zone.cx;
      const dy = imgY - zone.cy;
      const radius = zone.r;
      return Math.sqrt(dx * dx + dy * dy) <= radius;
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

  // Handle mouse move for hover detection
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
      startTyping(foundZone.id, `➤ ${foundZone.name.toUpperCase()}_`);
    } else if (!foundZone && hoveredZone !== null) {
      setHoveredZone(null);
      if (hoveredZone) stopTyping(hoveredZone);
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

  const startTyping = (id: string, fullText: string) => {
    if (typingTimeouts.current[id]) clearTimeout(typingTimeouts.current[id]);
    setIsTyping((prev) => ({ ...prev, [id]: true }));
    setTypingText((prev) => ({ ...prev, [id]: "" }));

    let index = 0;
    const typeChar = () => {
      if (index < fullText.length) {
        setTypingText((prev) => ({
          ...prev,
          [id]: fullText.slice(0, index + 1),
        }));
        index++;
        typingTimeouts.current[id] = setTimeout(typeChar, 50);
      } else {
        setIsTyping((prev) => ({ ...prev, [id]: false }));
      }
    };
    typeChar();
  };

  const stopTyping = (id: string) => {
    if (typingTimeouts.current[id]) clearTimeout(typingTimeouts.current[id]);
    setIsTyping((prev) => ({ ...prev, [id]: false }));
    setTypingText((prev) => ({ ...prev, [id]: "" }));
  };

  // Get label position for a zone
  const getLabelPosition = (zone: HotZone): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const drawRect = (canvas as any).drawRect;
    if (!drawRect) return { x: 0, y: 0 };

    const { drawX, drawY, drawWidth, drawHeight } = drawRect;

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

      {/* Label overlays */}
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
          <span className="font-reactor7 text-[10px] tracking-wider px-3 py-1 rounded-sm bg-black/80 backdrop-blur-sm border border-cyan-400/50 shadow-[0_0_10px_rgba(0,255,255,0.3)] text-cyan-400 inline-flex items-center whitespace-nowrap">
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
