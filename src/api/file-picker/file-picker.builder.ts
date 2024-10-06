import { pickerErrorCodes } from './file-picker.constants';
import { left, right } from '../../types/Either';
import type { RNDP_DocumentPickerResponse } from './file-picker.types';
import type { RNDP_CheckedResponse } from './file-picker.types';
import type { RNDP_CheckedError } from './file-picker.types';
import type { SingleFilePicker } from './file-picker.types';

/**
 * Valida resultado do picker retornado pela lib RNDP
 */
export const rndpCheckResponse: RNDP_CheckedResponse = data => {
  // Verifica se os dados estão no formato esperado, do contrário
  // retorna um erro
  if (
    !data ||
    typeof data.name !== 'string' ||
    typeof data.size !== 'number' ||
    typeof data.uri !== 'string'
  ) {
    return left({
      code: pickerErrorCodes.UNDERLYING_IMPLEMENTATION_INVALID_RESULT_FORMAT,
      message:
        'This should never see this. If you do, please report. react-native-document-picker response has an invalid format',
      invalidData: data,
    });
  }

  // Dados validados
  return right({
    name: data.name,
    size: data.size,
    type: data.type || '',
    uri: data.uri,
  });
};

/**
 * Valida/Encapsula erro retornado pela implementação usando RNDP
 */
export const rndpCheckError: RNDP_CheckedError = (data: unknown) => {
  // Verifica se é um erro conhecido
  if (
    typeof data === 'object' &&
    data &&
    'code' in data &&
    typeof data.code === 'string' &&
    'message' in data &&
    typeof data.message === 'string' &&
    data.code === 'DOCUMENT_PICKER_CANCELED'
  ) {
    return left({
      code: pickerErrorCodes.USER_CANCELED_OPERATION,
      message: 'Usuário cancelou operação',
    });
  }

  // Erro desconhecido. Numca deve acontecer
  return left({
    code: pickerErrorCodes.UNKNOWN_ERROR,
    message: 'Erro desconhecido',
    errorData: data,
  });
};

export const pickSinglebBuilder =
  (b: RNDP): SingleFilePicker =>
  async params => {
    return b.pickSingle(params).then(rndpCheckResponse).catch(rndpCheckError);
  };

/**
 * Usar biblioteca react-native-document-picker com implementação
 */
interface RNDP {
  lib: 'react-native-document-picker';
  pickSingle: (params: {
    type?: string | string[];
  }) => Promise<RNDP_DocumentPickerResponse>;
}
