/**
 * from https://github.com/wheany/js-png-encoder/blob/master/rainbow_ball.js
 */

import { hsv2rgb } from './hsv2rgb';
import type { RGB } from './hsv2rgb';

export function createRainbowBall(radius: number, phases: number) {
  const RADIUS_SQ = radius * radius;
  let pngData = '';
  const pngW = 2 * radius;
  const pngH = 2 * radius;
  const cenX = pngW / 2;
  const cenY = pngH / 2;
  let ang;
  let y;
  let x;
  let a;
  let color: RGB;
  let diffX2: number;
  let diffY2: number;
  let d: number;

  for (y = 0; y < pngH; y++) {
    for (x = 0; x < pngW; x++) {
      ang = Math.atan2(cenY - y, cenX - x);

      ang = ang * (180 / Math.PI) * phases;
      while (ang < 0) {
        ang += 360;
      }
      while (ang > 360) {
        ang -= 360;
      }

      color = hsv2rgb(ang, 1, 1);

      a = 255;

      diffX2 = (x - cenX) * (x - cenX);
      diffY2 = (y - cenY) * (y - cenY);

      if (diffX2 + diffY2 > RADIUS_SQ) {
        a = 0;
      } else if (diffX2 + diffY2 > (radius - 1) * (radius - 1)) {
        d = Math.sqrt(diffX2 + diffY2);
        a = Math.round(255 * (radius - d));
      }

      pngData += String.fromCharCode(color.r, color.g, color.b, a);
    }
  }

  return pngData;
}
