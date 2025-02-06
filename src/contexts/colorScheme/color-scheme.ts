import { observable } from '@legendapp/state';
import { Appearance } from 'react-native';
import type { UserColorScheme } from './color-scheme.types';

/**
 * Operating system current color scheme
 */
export const SystemColorScheme$ = observable(
  Appearance.getColorScheme() || 'light'
);

/**
 * Current app setted color scheme
 */
export const AppColorScheme$ = observable<UserColorScheme>('system');

/**
 * Current color scheme
 */
export const ColorScheme$ = observable((): 'light' | 'dark' => {
  const app = AppColorScheme$.get();
  if (app === 'system') {
    return SystemColorScheme$.get();
  }
  return app;
});

/**
 * Listen for changes in the color scheme and update the observable
 */
Appearance.addChangeListener(prefrences => {
  SystemColorScheme$.set(prefrences.colorScheme || 'light');
});

/**
 * Update app color scheme
 * @param colorScheme Color scheme to use
 */
export const SetColorScheme = (colorScheme: UserColorScheme) => {
  AppColorScheme$.set(colorScheme);

  switch (colorScheme) {
    case 'dark':
      Appearance.setColorScheme('dark');
      break;
    case 'light':
      Appearance.setColorScheme('light');
      break;
    default:
      Appearance.setColorScheme(null);
      break;
  }
};
