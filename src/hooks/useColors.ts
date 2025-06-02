import { ColorsContext } from '../contexts/colors/colors';
import { useContext } from '../libs';

export function useColors() {
  return useContext(ColorsContext).colors;
}
