import { Platform } from 'react-native';

const RNVersion = Platform?.constants?.reactNativeVersion?.minor ?? 0;

export const suportsBoxShadow = Platform.OS === 'web' || RNVersion >= 76;
