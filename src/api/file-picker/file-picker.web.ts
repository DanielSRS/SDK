import { left } from '../../types/Either';
import { pickerErrorCodes } from './file-picker.constants';
import type { SingleFilePickerAutoBuilded } from './file-picker.types';

const NoModuleFound = (async () => {
  return left({
    code: pickerErrorCodes.NO_IMPLEMENTATION,
    message:
      'No implementation found, install one of the supported dependencies or use the builder function and provide your own',
  });
}) satisfies SingleFilePickerAutoBuilded;

export let pickFile: SingleFilePickerAutoBuilded = NoModuleFound;
