import type React from 'react';

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

// a type that extracts the length of an array
export type ArrayLength<T extends readonly any[]> = T['length'];

export type Route = {
  key: string;
  icon?: string;
  title?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

export type NavigationState<T extends Route> = {
  index: number;
  routes: T[];
};

export type TabViewProps<
  T extends Route,
  R extends readonly T[] = readonly T[],
> = {
  readonly routes: R;
  initialIndex?: Range<0, ArrayLength<R>>;
  renderScene: Record<T['key'], () => React.ReactNode>;
};
