export function computePixelsToMetersScalingFactor(
  width: number,
  height: number
): number {
  return Math.pow(10, Math.floor(Math.log10(Math.max(width, height))));
}

export function convertPixelsToMeters(
  pixels: number,
  scalingFactor: number = 1.0
): number {
  const size = pixels / scalingFactor;
  return Math.round((size + Number.EPSILON) * 100) / 100;
}
