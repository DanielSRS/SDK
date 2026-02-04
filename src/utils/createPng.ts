import type { ImageData } from './ImageData';

const CRC_TABLE: Array<number> = [];
function make_crc_table() {
  var n, c, k;

  for (n = 0; n < 256; n++) {
    c = n;
    for (k = 0; k < 8; k++) {
      // eslint-disable-next-line no-bitwise
      if (c & 1) {
        // eslint-disable-next-line no-bitwise
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        // eslint-disable-next-line no-bitwise
        c = c >>> 1;
      }
    }
    CRC_TABLE[n] = c;
  }
}
make_crc_table();

const DEFLATE_METHOD = new Uint8ClampedArray([0x78, 0x01]);
const SIGNATURE = new Uint8ClampedArray([137, 80, 78, 71, 13, 10, 26, 10]);
// const NO_FILTER = String.fromCharCode(0);

function dwordAsString(dword: number) {
  return new Uint8ClampedArray([
    // eslint-disable-next-line no-bitwise
    (dword & 0xff000000) >>> 24,
    // eslint-disable-next-line no-bitwise
    (dword & 0x00ff0000) >>> 16,
    // eslint-disable-next-line no-bitwise
    (dword & 0x0000ff00) >>> 8,
    // eslint-disable-next-line no-bitwise
    dword & 0x000000ff,
  ]);
}

function update_crc(_crc: number, buf: Uint8ClampedArray) {
  if (CRC_TABLE.length === 0) {
    make_crc_table();
  }
  var c = _crc;
  var n: number;
  var b: number;

  for (n = 0; n < buf.length; n++) {
    b = buf[n] as number;
    // eslint-disable-next-line no-bitwise
    const l = (c ^ b) & 0xff;
    const m = CRC_TABLE[l];
    if (m === undefined) {
      continue;
    }
    // eslint-disable-next-line no-bitwise
    c = m ^ (c >>> 8);
  }
  return c;
}

function update_crcARR(_crc: number, buf: Uint8ClampedArray[]) {
  if (CRC_TABLE.length === 0) {
    make_crc_table();
  }
  var c = _crc;
  var n: number;
  var b: number;

  for (let k = 0; k < buf.length; k++) {
    const hbuf = buf[k] as Uint8ClampedArray;

    for (n = 0; n < hbuf.length; n++) {
      b = hbuf[n] as number;
      // eslint-disable-next-line no-bitwise
      const l = (c ^ b) & 0xff;
      const m = CRC_TABLE[l];
      if (m === undefined) {
        continue;
      }
      // eslint-disable-next-line no-bitwise
      c = m ^ (c >>> 8);
    }
  }
  return c;
}

function crc(buf: Uint8ClampedArray | Uint8ClampedArray[]) {
  if (Array.isArray(buf)) {
    // eslint-disable-next-line no-bitwise
    return update_crcARR(0xffffffff, buf) ^ 0xffffffff;
  }
  // eslint-disable-next-line no-bitwise
  return update_crc(0xffffffff, buf) ^ 0xffffffff;
}

function createChunk(
  length: number,
  type: Uint8ClampedArray,
  data: Uint8ClampedArray
) {
  const CRC = crc([type, data]);

  return [dwordAsString(length), type, data, dwordAsString(CRC)];
}

function createIHDR(width: number, height: number) {
  var IHDRdata;

  IHDRdata = dwordAsString(width);
  IHDRdata += dwordAsString(height);

  // bit depth
  IHDRdata += String.fromCharCode(8);
  // color type: 6=truecolor with alpha
  IHDRdata += String.fromCharCode(6);
  // compression method: 0=deflate, only allowed value
  IHDRdata += String.fromCharCode(0);
  // filtering: 0=adaptive, only allowed value
  IHDRdata += String.fromCharCode(0);
  // interlacing: 0=none
  IHDRdata += String.fromCharCode(0);

  return createChunk(13, 'IHDR', IHDRdata);
}

const IEND = createChunk(
  0,
  new Uint8ClampedArray([
    'IEND'.charCodeAt(0),
    'IEND'.charCodeAt(1),
    'IEND'.charCodeAt(2),
    'IEND'.charCodeAt(3),
  ]),
  new Uint8ClampedArray(0)
);

function adler32(data: Uint8ClampedArray) {
  var MOD_ADLER = 65521,
    a = 1,
    b = 0,
    i;

  for (i = 0; i < data.length; i++) {
    a = (a + (data[i] as number)) % MOD_ADLER;
    b = (b + a) % MOD_ADLER;
  }

  // eslint-disable-next-line no-bitwise
  return (b << 16) | a;
}

function inflateStore(data: string) {
  var MAX_STORE_LENGTH = 65535,
    storeBuffer = '',
    i,
    remaining,
    blockType;

  for (i = 0; i < data.length; i += MAX_STORE_LENGTH) {
    remaining = data.length - i;
    blockType = '';

    if (remaining <= MAX_STORE_LENGTH) {
      blockType = String.fromCharCode(0x01);
    } else {
      remaining = MAX_STORE_LENGTH;
      blockType = String.fromCharCode(0x00);
    }
    // little-endian
    storeBuffer +=
      blockType +
      // eslint-disable-next-line no-bitwise
      String.fromCharCode(remaining & 0xff, (remaining & 0xff00) >>> 8);
    storeBuffer += String.fromCharCode(
      // eslint-disable-next-line no-bitwise
      ~remaining & 0xff,
      // eslint-disable-next-line no-bitwise
      (~remaining & 0xff00) >>> 8
    );

    storeBuffer += data.substring(i, i + remaining);
  }

  return storeBuffer;
}
inflateStore;

const bt01 = new Uint8ClampedArray(1);
bt01[0] = 0x01;
const bt00 = new Uint8ClampedArray(1);
bt00[0] = 0x00;
function opt_inflateStore(data: Uint8ClampedArray) {
  const mmmm = 4; // dwordAsString return Uint8ClampedArray lenght;
  const MAX_STORE_LENGTH = 65535;
  let finalBufferSize = 0;
  let storeBuffer: Uint8ClampedArray[] = [];
  storeBuffer.push(DEFLATE_METHOD);
  storeBuffer.push(dwordAsString(adler32(data)));
  finalBufferSize += DEFLATE_METHOD.length;
  finalBufferSize += mmmm;
  let i;
  let remaining;
  let blockType: Uint8ClampedArray;

  for (i = 0; i < data.length; i += MAX_STORE_LENGTH) {
    remaining = data.length - i;
    // blockType = '';

    if (remaining <= MAX_STORE_LENGTH) {
      blockType = bt01;
    } else {
      remaining = MAX_STORE_LENGTH;
      blockType = bt00;
    }
    // little-endian
    storeBuffer.push(blockType); // mais um
    const f = new Uint8ClampedArray([
      remaining & 0xff,
      (remaining & 0xff00) >>> 8,
      ~remaining & 0xff,
      (~remaining & 0xff00) >>> 8,
    ]);
    storeBuffer.push(f); // mains um

    const g = data.subarray(i, i + remaining);
    storeBuffer.push(g); // mains um

    finalBufferSize += f.length + 1 + g.length; // os tres anteriros
  }

  const finalBuffer = new Uint8ClampedArray(finalBufferSize);
  let written = 0;
  storeBuffer.forEach(ui => {
    for (let vb = 0; vb < ui.length; vb++, written++) {
      finalBuffer[written] = ui[vb] as number;
    }
  });

  return finalBuffer;
}

export function png(width: number, height: number, image: ImageData) {
  var IHDR = createIHDR(width, height);
  var IDAT;
  // var scanlines: Uint8ClampedArray[] = [];
  // // var scanline;
  // var x;

  // const len = image.data.length;
  // const stepSize = image.width * 4;

  // for (let y = 0; y < len; y = y + stepSize) {
  //   // scanline = NO_FILTER;
  //   scanlines.push(image.data.subarray(y, y + stepSize));
  // }

  // console.log('image data: ', image.data.length);
  // console.log('scanlines: ', scanlines.length);
  // console.log(
  //   `scanlines[${scanlines.length - 1}]: `,
  //   scanlines[scanlines.length - 1]?.length
  // );

  const compressedScanlines = opt_inflateStore(image.data);

  IDAT = createChunk(
    compressedScanlines.length,
    new Uint8ClampedArray([
      'IDAT'.charCodeAt(0),
      'IDAT'.charCodeAt(1),
      'IDAT'.charCodeAt(2),
      'IDAT'.charCodeAt(3),
    ]),
    compressedScanlines
  );

  return [SIGNATURE, ...IHDR, ...IDAT, ...IEND];
}
