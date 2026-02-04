import { left } from '../../types/Either';
// import { TurboModuleRegistry } from 'react-native';

const NoModuleFound = (async () => {
  return left({
    code: 3,
    message:
      'No implementation found, install one of the supported dependencies or use the builder function and provide your own',
  });
}) satisfies object;

async function moduleLoader() {
  try {
    // const isModuleRegistered =
    //   TurboModuleRegistry.get('react-native-mmkv-storage') !== null;
    // if (!isModuleRegistered) {
    //   return NoModuleFound;
    // }
    const r = require('react-native-mmkv-storage');
    const GG = {
      r,
    };
    return GG satisfies object;
  } catch (e) {
    console.log('NOOOOOO module');
    return NoModuleFound;
  }
}

export let storage: object = NoModuleFound;
moduleLoader().then(v => {
  storage = v;
});
