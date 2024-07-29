import { ColorSchemeProvider } from './colorScheme';
import { AppBackground } from '../components';
import { ColorsProvider } from './colors/colors';
import type React from 'react';

export function SdkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ColorSchemeProvider>
      <ColorsProvider>
        <AppBackground>{children}</AppBackground>
      </ColorsProvider>
    </ColorSchemeProvider>
  );
}
