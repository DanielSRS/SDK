import type { Route } from './tab-view.types';

export function routeList<const T extends Route[]>(routes: T) {
  return routes;
}
