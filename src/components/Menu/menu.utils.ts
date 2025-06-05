import { View } from 'react-native';
import {
  RootSDKViewDimensions$,
  RootViewRef$,
} from '../AppBackground/AppBackground';
import type { MutableRefObject, RefObject } from 'react';
import type { Layout } from './menu.types';

export function measureViewInWindow(
  viewRef: RefObject<View>,
  layout: MutableRefObject<Layout>
) {
  return new Promise<Layout>((resolve, _reject) => {
    // const i = Date.now();
    const rootViewRef = RootViewRef$.peek()?.current;
    if (!rootViewRef) {
      return;
    }
    viewRef.current?.measureLayout(rootViewRef, (left, top, width, height) => {
      const sdkrootview = RootSDKViewDimensions$.peek();
      const _layout = {
        x: left,
        y: top,
        height,
        width,
        wh: sdkrootview.height,
        ww: sdkrootview.width,
      };
      resolve(_layout);
      layout.current = _layout;
    });
  });
}
