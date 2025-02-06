import { Platform } from 'react-native';

const RNVersion = Platform?.constants?.reactNativeVersion?.minor ?? 0;

export const IS_FABRIC_ENABLED = !!(global as any)?.nativeFabricUIManager;

export const suportsBoxShadow =
  Platform.OS === 'web' || (RNVersion >= 76 && IS_FABRIC_ENABLED);
