import { hsv2rgb } from './hsv2rgb';
import { interpolate } from './linearInterpolation';

/**
 * Cria uma seção no espaço de cores HSV dado um determinado valor
 * @param radius Raio do cilindro
 * @param value Altura da seção (value of a HSV color). value is between 0 and 1 (inclusive)
 * @returns
 */
export function createCrossSectionofHSVCylinder(radius: number, value: number) {
  const RADIUS_SQ = radius * radius;
  const diameter = 2 * radius;
  let pngData = '';
  let angle;
  let alpaChannel = 255;
  let color: {
    r: number;
    g: number;
    b: number;
  } = { b: 0, g: 0, r: 0 };
  let diffX2: number;
  let diffY2: number;
  let distance: number;

  for (let y = 0; y < diameter; y++) {
    for (let x = 0; x < diameter; x++) {
      /** Angle in radians */
      angle = Math.atan2(radius - y, radius - x);

      /** Convert it to degrees */
      angle = angle * (180 / Math.PI);
      while (angle < 0) {
        angle += 360;
      }
      while (angle > 360) {
        angle -= 360;
      }

      // color = hsv2rgb(ang, 1, 1);
      alpaChannel = 255;

      diffX2 = (x - radius) * (x - radius);
      diffY2 = (y - radius) * (y - radius);
      distance = Math.sqrt(diffX2 + diffY2);
      const inter = interpolate(0, radius, 0, 1, distance);

      color = hsv2rgb(angle, inter, value);
      // if (diffX2 + diffY2 < RADIUS_SQ) {
      //   // console.log(d);
      // }

      if (diffX2 + diffY2 > RADIUS_SQ) {
        alpaChannel = 0;
      } else if (diffX2 + diffY2 > (radius - 1) * (radius - 1)) {
        alpaChannel = Math.round(255 * (radius - distance));
      }

      // base64 string data
      pngData += String.fromCharCode(color.r, color.g, color.b, alpaChannel);
    }
  }

  return pngData;
}
