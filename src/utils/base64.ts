/* eslint-disable no-bitwise */
/**
 *
 *  Base64 encode / decode
 *
 *  modified from original, found at
 *  http://www.webtoolkit.info/
 *
 * but copied from here: https://github.com/wheany/js-png-encoder/blob/master/webtoolkit.base64.js
 *
 **/

const encodings =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const _keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const Base64 = {
  // private property

  // public method for encoding
  encode: function (input: string) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output + _keyStr[enc1] + _keyStr[enc2] + _keyStr[enc3] + _keyStr[enc4];
    }

    return output;
  },

  fromBinaryString: function (data: string) {
    if (btoa) {
      console.log('btoa');
      return btoa(data);
    }

    return this.encode(data);
  },

  fromUint8Array: (data: Uint8ClampedArray | Uint8Array) => {
    if (btoa) {
      return btoa(uint8ToString(data));
    }
    return base64ArrayBuffer(data);
  },
};

function base64ArrayBuffer(bytes: Uint8ClampedArray | Uint8Array) {
  var base64 = '';

  var byteLength = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength = byteLength - byteRemainder;

  let a: number;
  let b: number;
  let c: number;
  let d: number;
  let chunk: number;

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk =
      ((bytes[i] as number) << 16) |
      ((bytes[i + 1] as number) << 8) |
      (bytes[i + 2] as number);

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
    d = chunk & 63; // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 +=
      (encodings[a] as string) + encodings[b] + encodings[c] + encodings[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder === 1) {
    chunk = bytes[mainLength] as number;

    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3   = 2^2 - 1

    base64 += (encodings[a] as string) + encodings[b] + '==';
  } else if (byteRemainder === 2) {
    chunk =
      ((bytes[mainLength] as number) << 8) | (bytes[mainLength + 1] as number);

    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15    = 2^4 - 1

    base64 += (encodings[a] as string) + encodings[b] + encodings[c] + '=';
  }

  return base64;
}

function uint8ToString(u8a: Uint8ClampedArray | Uint8Array) {
  var CHUNK_SZ = 0x8000;
  var c = [];
  for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
    c.push(
      String.fromCharCode.apply(
        null,
        u8a.subarray(i, i + CHUNK_SZ) as unknown as number[]
      )
    );
  }
  return c.join('');
}
