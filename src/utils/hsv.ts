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

      diffX2 = (x - radius) ** 2;
      diffY2 = (y - radius) ** 2;

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

// const f = (_x: number, _y: number, diameter: number) => {
//   if (_x < 0 || _y < 0) {
//     console.error(
//       `x: ${_x.toString().padStart(3, ' ')} | y: ${_y.toString().padStart(3, ' ')}`
//     );
//   }
//   const k = _y * (diameter * 4);
//   const pc = k + _x * 4;
//   return pc;
// };

// export function _createCrossSectionofHSVCylinderArr(
//   radius: number,
//   value: number,
//   buffer: Uint8ClampedArray
// ) {
//   const RADIUS_SQ = radius * radius;
//   const diameter = 2 * radius;
//   let angle = 0;
//   // let alpaChannel = 255;
//   // let color: {
//   //   r: number;
//   //   g: number;
//   //   b: number;
//   // } = { b: 0, g: 0, r: 0 };
//   let diffX2: number;
//   let diffY2: number;
//   let distance: number;

//   // const buffer = new Uint8ClampedArray(diameter * diameter * 4);
//   let pixelCounter = -1;

//   let l = 0;
//   let v = 0;

//   // -------
//   const x_center = radius;
//   const y_center = radius;
//   let x = 0;
//   let y = radius;
//   let d = 3 - 2 * radius;

//   for (let i = -x; i <= x; i++) {
//     let pc = f(x_center + i, y_center + y, diameter);
//     buffer[pc + 3] = 255;
//     pc = f(x_center + i, y_center - y, diameter);
//     buffer[pc + 3] = 255;
//   }
//   for (let i = -y; i <= y; i++) {
//     let pc = f(x_center + i, y_center + x, diameter);
//     buffer[pc + 3] = 255;
//     pc = f(x_center + i, y_center - x, diameter);
//     buffer[pc + 3] = 255;
//   }

//   while (y >= x) {
//     x++;
//     if (d > 0) {
//       y--;
//       d = d + 4 * (x - y) + 10;
//     } else {
//       d = d + 4 * x + 6;
//     }
//     for (let i = -x; i <= x; i++) {
//       let pc = f(x_center + i, y_center + y, diameter);
//       buffer[pc + 3] = 255;
//       pc = f(x_center + i, y_center - y, diameter);
//       buffer[pc + 3] = 255;
//     }
//     for (let i = -y; i <= y; i++) {
//       let pc = f(x_center + i, y_center + x, diameter);
//       buffer[pc + 3] = 255;
//       pc = f(x_center + i, y_center - x, diameter);
//       buffer[pc + 3] = 255;
//     }
//   }
//   return;
//   // for (let y = 0; y < diameter; y++) {
//   //   const k = y * (diameter * 4);
//   //   // if (y !== 255) {
//   //   //   continue;
//   //   // }
//   //   // if (y < radius) {
//   //   //   l = radius - y;
//   //   //   v = radius + y;
//   //   // } else {
//   //   //   l = radius + y;
//   //   //   v = radius - y;
//   //   // }
//   //   for (let x = 0; x < diameter; x++) {
//   //     // if (x < l || x > v) {
//   //     //   continue;
//   //     // }
//   //     // if (x > 10) {
//   //     //   continue;
//   //     // }
//   //     const pc = k + x * 4;
//   //     const r = pc;
//   //     const g = pc + 1;
//   //     const b = pc + 2;
//   //     const a = pc + 3;
//   //     // console.log('Pixel: y', y, 'x: ', x, 'pc: ', a);
//   //     // buffer[r] = 255;
//   //     buffer[a] = 255;
//   //     // const pc = y * x * 4;
//   //     // buffer[pc + 3] = 255;
//   //   }
//   // }
// }

// function drawSymmetricPoints(
//   x_center: number,
//   y_center: number,
//   x: number,
//   y: number,
//   diameter: number,
//   buffer: Uint8ClampedArray
// ) {
//   const f = (_x: number, _y: number) => {
//     if (_x < 0 || _y < 0) {
//       console.error(
//         `x: ${_x.toString().padStart(3, ' ')} | y: ${_y.toString().padStart(3, ' ')}`
//       );
//     }
//     const k = _y * (diameter * 4);
//     const pc = k + _x * 4;
//     return pc;
//   };
//   let pc = f(x_center + x, y_center + y);
//   buffer[pc + 3] = 255;
//   pc = f(x_center - x, y_center + y);
//   buffer[pc + 3] = 255;
//   pc = f(x_center + x, y_center - y);
//   buffer[pc + 3] = 255;
//   pc = f(x_center - x, y_center - y);
//   buffer[pc + 3] = 255;
//   pc = f(x_center + y, y_center + x);
//   buffer[pc + 3] = 255;
//   pc = f(x_center - y, y_center + x);
//   buffer[pc + 3] = 255;
//   pc = f(x_center + y, y_center - x);
//   buffer[pc + 3] = 255;
//   pc = f(x_center - y, y_center - x);
//   buffer[pc + 3] = 255;
// }

// function getFilledSymmetricPoints(
//   x_center: number,
//   y_center: number,
//   x: number,
//   y: number,
//   diameter: number,
//   buffer: Uint8ClampedArray
// ) {
//   const f = (_x: number, _y: number) => {
//     if (_x < 0 || _y < 0) {
//       console.error(
//         `x: ${_x.toString().padStart(3, ' ')} | y: ${_y.toString().padStart(3, ' ')}`
//       );
//     }
//     const k = _y * (diameter * 4);
//     const pc = k + _x * 4;
//     return pc;
//   };
//   for (let i = -x; i <= x; i++) {
//     let pc = f(x_center + i, y_center + y);
//     buffer[pc + 3] = 255;
//     pc = f(x_center + i, y_center - y);
//     buffer[pc + 3] = 255;
//   }
//   for (let i = -y; i <= y; i++) {
//     let pc = f(x_center + i, y_center + x);
//     buffer[pc + 3] = 255;
//     pc = f(x_center + i, y_center - x);
//     buffer[pc + 3] = 255;
//   }
// }

// return {
//   r: Math.round((r1 + m) * 255),
//   g: Math.round((g1 + m) * 255),
//   b: Math.round((b1 + m) * 255),
// };
