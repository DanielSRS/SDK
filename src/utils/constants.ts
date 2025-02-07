import { Platform } from 'react-native';

const RNVersion = Platform?.constants?.reactNativeVersion?.minor ?? 0;

export const IS_FABRIC_ENABLED = !!(global as any)?.nativeFabricUIManager;
const IS_MACOS = Platform.OS === 'macos';
const IS_IOS = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';
const IS_WEB = Platform.OS === 'web';
const IS_WINDOWS = Platform.OS === 'windows';

export const suportsBoxShadow =
  IS_WEB || (RNVersion >= 76 && IS_FABRIC_ENABLED);

export const Constants = {
  IS_FABRIC_ENABLED,
  SUPORTS_BOX_SHADOW: suportsBoxShadow,
  IS_MACOS,
  IS_IOS,
  IS_ANDROID,
  IS_WEB,
  IS_WINDOWS,
  RN_VERSION: RNVersion,
};
