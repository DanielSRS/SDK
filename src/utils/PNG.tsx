/* eslint-disable react-native/no-inline-styles */
import { Image, View } from 'react-native';
import { Button } from '../components/Button';
import { Body } from '../components/Text/Body';
import { png } from './createPng';
import { Base64 } from './base64';
import { useState } from 'react';
import { createCrossSectionofHSVCylinder } from './hsv';

export function PNG() {
  const [img, setImg] = useState<{
    dataUrl: string;
    pngW: number;
    pngH: number;
  }>();
  const generateDataPng = () => {
    console.log('started');
    const start = Date.now();

    const res = test();
    const end = Date.now();
    const elapsed = end - start;
    console.log('Ended in: ', elapsed);
    setImg(res);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        // padding: 30,
        // backgroundColor: 'red',
      }}>
      <View>
        <Body>Body</Body>
        {!!img && (
          <Image
            style={{
              width: img.pngW,
              height: img.pngH,
              borderWidth: 1,
              // backgroundColor: 'red',
            }}
            src={img.dataUrl}
          />
        )}
        {}
        {}
      </View>
      <Button onPress={generateDataPng}>Gerar png</Button>
    </View>
  );
}

function test() {
  const RADIUS = 128;
  const pngW = 2 * RADIUS;
  const pngH = 2 * RADIUS;
  let dataUrl = 'data:image/png;base64,';

  const a1 = Date.now();
  const pngData = createCrossSectionofHSVCylinder(RADIUS, 1);
  const a2 = Date.now();
  const pngFile = png(pngW, pngH, pngData);
  const a3 = Date.now();

  const base64png = Base64.encode(pngFile);
  const a4 = Date.now();
  dataUrl += base64png;
  const a5 = Date.now();

  console.log(
    JSON.stringify(
      {
        pngData: a2 - a1,
        pngFile: a3 - a2,
        base64png: a4 - a3,
        dataUrl: a5 - a4,
      },
      null,
      2
    )
  );
  return {
    dataUrl,
    pngW,
    pngH,
  };
}
