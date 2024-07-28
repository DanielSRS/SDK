import { ColorSchemeProvider } from './colorScheme';
import { AppBackground } from '../components';
import type React from 'react';

export function SdkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ColorSchemeProvider>
      <AppBackground>{children}</AppBackground>
    </ColorSchemeProvider>
  );
}
