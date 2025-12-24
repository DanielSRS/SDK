import { View } from 'react-native';
import type { MutableRefObject, RefObject } from 'react';
import type { Layout } from './menu.types';
import type { useRootViewRef$ } from '../../hooks/useRootViewRef$';
import type { useRootSDKViewDimensions$ } from '../../hooks/useRootSDKViewDimensions$';

export function measureViewInWindow(
  viewRef: RefObject<View>,
  layout: MutableRefObject<Layout>,
  rootViewRef$: ReturnType<typeof useRootViewRef$>,
  rootSDKViewDimensions$: ReturnType<typeof useRootSDKViewDimensions$>
) {
  return new Promise<Layout>((resolve, _reject) => {
    // const i = Date.now();
    const rootViewRef = rootViewRef$.peek()?.current;
    if (!rootViewRef) {
      return;
    }
    viewRef.current?.measureLayout(rootViewRef, (left, top, width, height) => {
      const sdkrootview = rootSDKViewDimensions$.peek();
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
