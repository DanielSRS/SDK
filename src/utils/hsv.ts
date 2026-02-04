import { interpolate } from './linearInterpolation';
import { hsv2rgb } from './hsv2rgb';
import { createImageData } from './ImageData';
import type { RGB } from './hsv2rgb';

/**
 * Cria uma seção no espaço de cores HSV dado um determinado valor
 * @param radius Raio do cilindro
 * @param value Altura da seção (value of a HSV color). value is between 0 and 1 (inclusive)
 * @returns
 */
export function createCrossSectionofHSVCylinder(radius: number, value: number) {
  const RADIUS_SQ = radius * radius;
  const diameter = 2 * radius;
  const rawRGBDataLen = diameter * diameter * 4;
  const stepSize = diameter * 4;
  const numerOfSteps = rawRGBDataLen / stepSize;
  let pngData = new Uint8ClampedArray(rawRGBDataLen + numerOfSteps);
  let angle;
  let alpaChannel = 255;
  let color: RGB = { b: 0, g: 0, r: 0 };
  let diffX2: number;
  let diffY2: number;
  let distance: number;
  let counter: number = -1;
  let noFilterPng = stepSize;
  // let step = diameter * 4;

  for (let y = 0; y < diameter; y++, noFilterPng++) {
    for (let x = 0; x < diameter; x++) {
      /** Angle in radians */
      angle = Math.atan2(radius - y, radius - x);

      /** Convert it to degrees */
      angle = angle * (180 / Math.PI);

      /** No negative values */
      while (angle < 0) {
        angle += 360;
      }

      /** No values above 360 */
      while (angle > 360) {
        angle -= 360;
      }

      alpaChannel = 255;

      /** Caculate distance from the center of the circle */
      diffX2 = (x - radius) * (x - radius);
      diffY2 = (y - radius) * (y - radius);
      distance = Math.sqrt(diffX2 + diffY2);

      /** Lower saturation when closer to the center */
      const saturation = interpolate(0, radius, 0, 1, distance);

      color = hsv2rgb(angle, saturation, value);

      if (diffX2 + diffY2 > RADIUS_SQ) {
        /**
         * If position is not withing the curcumference, make the color 100% transparent
         */
        alpaChannel = 0;
      } else if (diffX2 + diffY2 > (radius - 1) * (radius - 1)) {
        /**
         * Make the borders of the image / circle smooth
         */
        alpaChannel = Math.round(255 * (radius - distance));
      }

      if (noFilterPng === stepSize) {
        pngData[++counter] = 0;
        noFilterPng = 0;
      }

      // base64 string data
      pngData[++counter] = color.r;
      pngData[++counter] = color.g;
      pngData[++counter] = color.b;
      pngData[++counter] = alpaChannel;

      // pngData[counter] = color.r;
      // pngData[counter + 1] = color.g;
      // pngData[counter + 2] = color.b;
      // pngData[counter + 3] = alpaChannel;
      // counter = counter + 3;
      // pngData += String.fromCharCode(color.r, color.g, color.b, alpaChannel);
    }
  }
  return createImageData(pngData, diameter, diameter);
}

export function createCrossSectionofHSVCylinderArr(
  radius: number,
  value: number,
  buffer: Uint8ClampedArray
) {
  const RADIUS_SQ = radius * radius;
  const diameter = 2 * radius;
  let angle = 0;
  // let alpaChannel = 255;
  // let color: {
  //   r: number;
  //   g: number;
  //   b: number;
  // } = { b: 0, g: 0, r: 0 };
  let diffX2: number;
  let diffY2: number;
  let distance: number;

  // const buffer = new Uint8ClampedArray(diameter * diameter * 4);
  let pixelCounter = -1;

  for (let y = 0; y < diameter; y++) {
    for (let x = 0; x < diameter; x++) {
      // color = hsv2rgb(ang, 1, 1);

      diffX2 = (x - radius) * (x - radius);
      diffY2 = (y - radius) * (y - radius);

      // if (diffX2 + diffY2 < RADIUS_SQ) {
      //   // console.log(d);
      // }

      if (diffX2 + diffY2 > RADIUS_SQ) {
        pixelCounter += 4;
        continue;
      }

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

      // alpaChannel = 255;
      distance = Math.sqrt(diffX2 + diffY2);
      const inter = interpolate(0, radius, 0, 1, distance);

      // color
      let c = value * inter; // chroma
      let sector = (angle % 360) / 60;
      let _x = c * (1 - Math.abs((sector % 2) - 1)); // second largest component
      let r1;
      let g1;
      let b1;
      let m = value - c;

      switch (Math.floor(sector)) {
        case 0:
          r1 = c;
          g1 = _x;
          b1 = 0;
          break;
        case 1:
          r1 = _x;
          g1 = c;
          b1 = 0;
          break;
        case 2:
          r1 = 0;
          g1 = c;
          b1 = _x;
          break;
        case 3:
          r1 = 0;
          g1 = _x;
          b1 = c;
          break;
        case 4:
          r1 = _x;
          g1 = 0;
          b1 = c;
          break;
        case 5:
          r1 = c;
          g1 = 0;
          b1 = _x;
          break;
        default:
          throw 'hue out of range: ' + angle;
      }

      buffer[++pixelCounter] = (r1 + m) * 255; // r
      buffer[++pixelCounter] = (g1 + m) * 255; // g
      buffer[++pixelCounter] = (b1 + m) * 255; // b
      buffer[++pixelCounter] = 255;
    }
  }
}

// return {
//   r: Math.round((r1 + m) * 255),
//   g: Math.round((g1 + m) * 255),
//   b: Math.round((b1 + m) * 255),
// };
