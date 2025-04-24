import type { ReactNode } from 'react';

export interface MenuProps {
  children: ReactNode;
  target: ReactNode;
  maxWidth?: number;
  minWidth?: number;
  extendToTargetWidth?: boolean;
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
