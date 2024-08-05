/**
 * Create a new Bitmap (bmp) image
 * @param width Width of the image to be created
 * @param height Height of the image to be created
 * @returns
 */
export function BmpImage(width: number, height: number): BmpImage {
  /**
   * See for reference: https://en.wikipedia.org/wiki/BMP_file_format
   */
  const fileHeaderSize = 14;
  const dibHeaderSize = 56;
  const headerSize = fileHeaderSize + dibHeaderSize;
  const pixelArraySize = width * height * 4;
  const fileSize = headerSize + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const dataView = new DataView(buffer);

  /** BMP File Header */
  dataView.setUint8(0, 0x42); // 'B'
  dataView.setUint8(1, 0x4d); // 'M'
  dataView.setUint32(2, fileSize, true); // File size
  dataView.setUint32(6, 0, true); // Reserved
  dataView.setUint32(10, headerSize, true); // Pixel data offset

  /** DIB Header */
  dataView.setUint32(14, dibHeaderSize, true); // DIB header size
  dataView.setInt32(18, width, true); // Image width
  // negatiev value to make image starts from top left instead bottom left
  dataView.setInt32(22, -height, true); // Image height
  dataView.setUint16(26, 1, true); // Color planes
  dataView.setUint16(28, 32, true); // Bits per pixel
  dataView.setUint32(30, 3, true); // Compression (none)
  dataView.setUint32(34, pixelArraySize, true); // Image size
  dataView.setInt32(38, 2835, true); // Horizontal resolution (pixels per meter)
  dataView.setInt32(42, 2835, true); // Vertical resolution (pixels per meter)
  dataView.setUint32(46, 0, true); // Colors in color table
  dataView.setUint32(50, 0, true); // Important color count

  // Sets order to be RGBA
  dataView.setUint32(0x36, 0xff000000, false); // Red channel bit mask
  dataView.setUint32(0x3a, 0x00ff0000, false); // Green channel bit mask
  dataView.setUint32(0x3e, 0x0000ff00, false); // Blue channel bit mask
  dataView.setUint32(0x42, 0x000000ff, false); // Alpha channel bit mask

  const u8 = new Uint8ClampedArray(buffer);

  return {
    data: u8,
    pixelArray: u8.subarray(headerSize),
    width,
    height,
  };
}

/**
 * 32bit color bmp image with transparency
 */
export interface BmpImage {
  /**
   * full bpm image (in binary format)
   */
  readonly data: Uint8ClampedArray;
  /**
   * RGBA pixel array data with all pixels initialized
   * to 100% tarnsparent black
   *
   * - The pixel order starts form top left
   * - There is width * height pixels with 4 bytes each
   * - Each width * 4 bits represents a horizontal line in the image
   *
   * This array contents SHOULD be modified after BmpImage creation,
   * otherwise nothing will shown when rendering this image,
   * (since all pixels are transparent)
   */
  pixelArray: Uint8ClampedArray;
  /** Image width */
  readonly width: number;
  /** Image height */
  readonly height: number;
}
