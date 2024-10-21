import { left } from '../../types/Either';
import { pickerErrorCodes } from './file-picker.constants';
import { pickSinglebBuilder } from './file-picker.builder';
import { TurboModuleRegistry } from 'react-native';
import type { SingleFilePickerAutoBuilded } from './file-picker.types';

const NoModuleFound = (async () => {
  return left({
    code: pickerErrorCodes.NO_IMPLEMENTATION,
    message:
      'No implementation found, install one of the supported dependencies or use the builder function and provide your own',
  });
}) satisfies SingleFilePickerAutoBuilded;

async function moduleLoader() {
  try {
    const isModuleRegistered =
      TurboModuleRegistry.get('RNDocumentPicker') !== null;
    if (!isModuleRegistered) {
      return NoModuleFound;
    }
    const r = require('react-native-document-picker');
    const GG = pickSinglebBuilder({
      lib: 'react-native-document-picker',
      pickSingle: r.pickSingle,
    });
    return GG satisfies SingleFilePickerAutoBuilded;
  } catch (e) {
    return NoModuleFound;
  }
}

export let pickFile: SingleFilePickerAutoBuilded = NoModuleFound;
moduleLoader().then(v => {
  pickFile = v;
});
