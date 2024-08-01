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

const DEFLATE_METHOD = String.fromCharCode(0x78, 0x01);
const SIGNATURE = String.fromCharCode(137, 80, 78, 71, 13, 10, 26, 10);
const NO_FILTER = String.fromCharCode(0);

function dwordAsString(dword: number) {
  return String.fromCharCode(
    // eslint-disable-next-line no-bitwise
    (dword & 0xff000000) >>> 24,
    // eslint-disable-next-line no-bitwise
    (dword & 0x00ff0000) >>> 16,
    // eslint-disable-next-line no-bitwise
    (dword & 0x0000ff00) >>> 8,
    // eslint-disable-next-line no-bitwise
    dword & 0x000000ff
  );
}

function update_crc(_crc: number, buf: string) {
  if (CRC_TABLE.length === 0) {
    make_crc_table();
  }
  var c = _crc;
  var n: number;
  var b: number;

  for (n = 0; n < buf.length; n++) {
    b = buf.charCodeAt(n);
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

function crc(buf: string) {
  // eslint-disable-next-line no-bitwise
  return update_crc(0xffffffff, buf) ^ 0xffffffff;
}

function createChunk(length: number, type: string, data: string) {
  const CRC = crc(type + data);

  return dwordAsString(length) + type + data + dwordAsString(CRC);
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

const IEND = createChunk(0, 'IEND', '');

function adler32(data: string) {
  var MOD_ADLER = 65521,
    a = 1,
    b = 0,
    i;

  for (i = 0; i < data.length; i++) {
    a = (a + data.charCodeAt(i)) % MOD_ADLER;
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

export function png(width: number, height: number, rgba: string) {
  var IHDR = createIHDR(width, height);
  var IDAT;
  var scanlines = '';
  var scanline;
  var y;
  var x;
  var compressedScanlines;

  for (y = 0; y < rgba.length; y += width * 4) {
    scanline = NO_FILTER;
    if (Array.isArray(rgba)) {
      for (x = 0; x < width * 4; x++) {
        // eslint-disable-next-line no-bitwise
        scanline += String.fromCharCode(rgba[y + x] & 0xff);
      }
    } else {
      // rgba=string
      scanline += rgba.substr(y, width * 4);
    }
    scanlines += scanline;
  }

  compressedScanlines =
    DEFLATE_METHOD +
    inflateStore(scanlines) +
    dwordAsString(adler32(scanlines));

  IDAT = createChunk(compressedScanlines.length, 'IDAT', compressedScanlines);

  return SIGNATURE + IHDR + IDAT + IEND;
}
