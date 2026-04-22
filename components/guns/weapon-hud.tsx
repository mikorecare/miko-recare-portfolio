"use client";

interface WeaponHUDProps {
  currentGun: string;
  ammo?: number;
  maxAmmo?: number;
}

export default function WeaponHUD({
  currentGun,
  ammo = 30,
  maxAmmo = 30,
}: WeaponHUDProps) {
  // Extract gun name without extension
  const gunName = currentGun.replace(".glb", "");

  return (
    <div className="fixed bottom-5 right-5 bg-black/70 backdrop-blur-sm rounded-lg p-3 font-inter pointer-events-none z-20 border border-white/20">
      <div className="text-white text-xs uppercase tracking-wider mb-1">
        EQUIPPED
      </div>
      <div className="text-white font-poppins font-bold text-lg">{gunName}</div>
      <div className="text-green-400 font-mono text-sm mt-1">
        {ammo} / {maxAmmo}
      </div>
    </div>
  );
}
