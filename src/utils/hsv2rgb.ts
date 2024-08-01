export function hsv2rgb(h: number, s: number, v: number) {
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
}
