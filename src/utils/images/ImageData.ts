/**
 * https://github.com/node-gfx/image-data/blob/master/index.js
 */
export interface ImageData {
  /**
   * A `Uint8ClampedArray` representing a one-dimensional array containing the data in the RGBA order, with integer values between `0` and `255` (included).
   */
  readonly data: Uint8ClampedArray;

  /**
   * An `unsigned` `long` representing the actual height, in pixels, of the `ImageData`.
   */
  readonly height: number;

  /**
   * An `unsigned` `long` representing the actual width, in pixels, of the `ImageData`.
   */
  readonly width: number;
}

const toUInt32 = (number: number) => {
  // eslint-disable-next-line no-bitwise
  return number >>> 0;
};

export function ImageData(
  array: Uint8ClampedArray,
  width: number,
  height?: number
): ImageData {
  if (width === 0) {
    throw new Error(
      "Failed to construct 'ImageData': The source width is zero or not a number."
    );
  }

  width = toUInt32(width);

  if (width * 4 > array.length) {
    throw new Error(
      `Failed to construct 'ImageData': The requested image size exceeds the supported range.
      
      width: ${width}
      width * 4: ${width * 4}
      array.length: ${array.length}
      `
    );
  }

  if (array.length % 4 !== 0) {
    throw new Error(
      "Failed to construct 'ImageData': The input data length is not a multiple of 4."
    );
  }

  if (array.length % (4 * width) !== 0) {
    throw new Error(
      "Failed to construct 'ImageData': The input data length is not a multiple of (4 * width)."
    );
  }

  if (typeof height !== 'undefined') {
    if (height === 0) {
      throw new Error(
        "Failed to construct 'ImageData': The source height is zero"
      );
    }

    height = toUInt32(height);

    if (array.length % (4 * width * height) !== 0) {
      throw new Error(
        `Failed to construct 'ImageData': The input data length is not equal to (4 * width * height).
        
        array.length: ${array.length}
        width: ${width}
        height: ${height}
        4 * width * height: ${4 * width * height}
        `
      );
    }
  }

  return {
    data: array,
    height:
      typeof height !== 'undefined' ? height : array.byteLength / width / 4,
    width: width,
  };

  // this.width = width;
  // this.height =
  //   typeof height !== 'undefined' ? height : array.byteLength / width / 4;

  // this.data = array;
}
