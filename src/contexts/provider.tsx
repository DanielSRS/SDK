import React, { type ComponentProps } from 'react';
import { ColorSchemeProvider } from './colorScheme';
import { AppBackground } from '../components';
import { ColorsProvider } from './colors/colors';

type WithoutChildren<T> = Omit<T, 'children'>;

interface SdkProviderProps {
  children: React.ReactNode;
  colorSchemeProps?: WithoutChildren<
    ComponentProps<typeof ColorSchemeProvider>
  >;
  colorsProps?: WithoutChildren<ComponentProps<typeof ColorsProvider>>;
  appBackgroundProps?: WithoutChildren<ComponentProps<typeof AppBackground>>;
}
export function SdkProvider(props: SdkProviderProps) {
  const { children, appBackgroundProps, colorSchemeProps, colorsProps } = props;
  return (
    <ColorSchemeProvider {...colorSchemeProps}>
      <ColorsProvider {...colorsProps}>
        <AppBackground {...appBackgroundProps}>{children}</AppBackground>
      </ColorsProvider>
    </ColorSchemeProvider>
  );
}
