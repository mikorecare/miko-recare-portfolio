export const getElevation = (z: number): number => {
  const absZ = Math.abs(z);
  
  // Starting platform (z = -96 to -80)
  if (z < -80) return 0;
  
  // Steep slope DOWN (z = -80 to -40) - drops 8 units
  if (z < -40) {
    const t = (z + 80) / 40;
    return -t * 8;
  }
  
  // Valley bottom (z = -40 to 40) - flat at -8
  if (z < 40) return -8;
  
  // Steep slope UP (z = 40 to 80) - rises 8 units
  if (z < 80) {
    const t = (z - 40) / 40;
    return -8 + t * 8;
  }
  
  // Ending platform (z = 80 to 96)
  return 0;
};