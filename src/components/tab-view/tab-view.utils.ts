import type { Route } from './tab-view.types';
import type React from 'react';

export function routeList<const T extends Route[]>(routes: T) {
  return routes;
}

type RouteKeys<R extends readonly Route[]> = R[number]['key'];
export function sceneMap<R extends readonly Route[]>(
  scenes: Record<RouteKeys<R>, () => React.ReactNode>
): Record<RouteKeys<R>, () => React.ReactNode>;

export function sceneMap<const T extends Record<string, () => React.ReactNode>>(
  scenes: T
): T;

export function sceneMap<const T extends Record<string, () => React.ReactNode>>(
  scenes: T
): T {
  return scenes;
}
