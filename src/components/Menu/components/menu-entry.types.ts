import type { ReactNode } from 'react';
import type { TouchableOpacityProps } from 'react-native';

export interface MenuEntryProps
  extends Omit<TouchableOpacityProps, 'children'> {
  children: string;
  left?: ReactNode | (() => ReactNode);
  right?: ReactNode | (() => ReactNode);
}
