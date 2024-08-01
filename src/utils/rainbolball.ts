/**
 * from https://github.com/wheany/js-png-encoder/blob/master/rainbow_ball.js
 */
// from wikipedia:
// h: 0 ... 360, s: 0 ... 1, v: 0 ... 1
var hsv2rgb = function (h: number, s: number, v: number) {
  var c = v * s, // chroma
    sector = (h % 360) / 60,
    x = c * (1 - Math.abs((sector % 2) - 1)), // second largest component
    r1,
    g1,
    b1,
    m = v - c;

  switch (Math.floor(sector)) {
    case 0:
      r1 = c;
      g1 = x;
      b1 = 0;
      break;
    case 1:
      r1 = x;
      g1 = c;
      b1 = 0;
      break;
    case 2:
      r1 = 0;
      g1 = c;
      b1 = x;
      break;
    case 3:
      r1 = 0;
      g1 = x;
      b1 = c;
      break;
    case 4:
      r1 = x;
      g1 = 0;
      b1 = c;
      break;
    case 5:
      r1 = c;
      g1 = 0;
      b1 = x;
      break;
    default:
      throw 'hue out of range: ' + h;
  }
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
};

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
  let color;
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

function generateColorMatrix(rows: number, cols: number) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const r = Math.floor((i / rows) * 255);
      const g = Math.floor((j / cols) * 255);
      const b = Math.floor(((i + j) / (rows + cols)) * 255);
      row.push({
        r,
        g,
        b,
      });
    }
    matrix.push(row);
  }
  return matrix;
}

export const colorSqure = (width: number) => {
  // Example usage:
  // let startColor = [255, 0, 0, 1] as const; // Red with full opacity
  // let endColor = [0, 0, 255, 0.5] as const; // Blue with half opacity
  // let steps = 10;
  // let gradient = interpolateColorsRGBA(startColor, endColor, steps);
  let gradient = generateColorMatrix(width, width);
  console.log(gradient.length);
  // pngData += String.fromCharCode(color.r, color.g, color.b, a);

  return gradient
    .flat()
    .map(color => String.fromCharCode(color.r, color.g, color.b, 255))
    .join('');
};
