import React, { type ComponentProps } from 'react';
import { ColorSchemeProvider } from './colorScheme';
import { AppBackground } from '../components';
import { ColorsProvider } from './colors/colors';
import { VModalRoot } from '../components/VModal/VModal';

type WithoutChildren<T> = Omit<T, 'children'>;

interface SdkProviderProps {
  children?: React.ReactNode;
  colorSchemeProps?: WithoutChildren<
    ComponentProps<typeof ColorSchemeProvider>
  >;
  colorsProps?: WithoutChildren<ComponentProps<typeof ColorsProvider>>;
  appBackgroundProps?: WithoutChildren<ComponentProps<typeof AppBackground>>;
}

/**
 * Context provider for the SDK.
 * It is required to wrap your application with this provider
 * to use the SDK features.
 */
export function SdkProvider(props: SdkProviderProps) {
  const { children, appBackgroundProps, colorSchemeProps, colorsProps } = props;
  return (
    <ColorSchemeProvider {...colorSchemeProps}>
      <ColorsProvider {...colorsProps}>
        <AppBackground {...appBackgroundProps}>
          {children}
          <VModalRoot />
        </AppBackground>
      </ColorsProvider>
    </ColorSchemeProvider>
  );
}
