import { ColorSchemeContext } from '../contexts';
import { useContext } from '../libs';

export function useColorScheme() {
  return useContext(ColorSchemeContext, c => c.colorScheme);
}
