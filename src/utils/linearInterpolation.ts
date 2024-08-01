/**
 * Source https://stackoverflow.com/questions/41338506/how-do-i-linearly-interpolate-lerp-ranged-input-to-ranged-output
 */
export const interpolate = (
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
  input: number
) => {
  const unclamped =
    ((input - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) +
    outputMin;
  const clamped = Math.max(outputMin, Math.min(outputMax, unclamped));
  return clamped;
};

/**
 * https://stackoverflow.com/questions/64591884/how-to-dynamically-generate-rgb-colors-based-on-a-color-scale-by-values
 */
// function lerp(a, b, t) {
//   return a + (b - a) * t;
// }
