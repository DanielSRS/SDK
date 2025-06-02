import { ColorSchemeContext } from '../contexts';
import { useContext } from '../libs';

export function useSchemeControl() {
  const appColorScheme = useContext(ColorSchemeContext).colorScheme;
  const setAppColorScheme = useContext(ColorSchemeContext).setAppColorScheme;

  return {
    appColorScheme,
    setAppColorScheme,
  };
}
