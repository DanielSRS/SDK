import { ColorSchemeContext } from '../contexts';
import { useContext } from '../libs';

export function useSchemeControl() {
  const appColorScheme = useContext(ColorSchemeContext, c => c.colorScheme);
  const setAppColorScheme = useContext(
    ColorSchemeContext,
    c => c.setAppColorScheme
  );

  return {
    appColorScheme,
    setAppColorScheme,
  };
}
