import type { ViewProps } from 'react-native';
import type { ReactNode, FC } from 'react';

export interface MenuProps {
  children: ReactNode;
  target: ReactNode;
  maxWidth?: number;
  minWidth?: number;
  extendToTargetWidth?: boolean;
  menuContainer?: FC<Pick<ViewProps, 'style' | 'children'>>;
}

export interface Layout {
  height: number;
  width: number;
  x: number;
  y: number;
  /** window height */
  wh: number;
  /** window width */
  ww: number;
}
