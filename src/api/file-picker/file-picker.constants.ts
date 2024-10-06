import type { PickSingleErrorCodes } from './file-picker.types';
import type { InvertRecord } from '../../types/Record';

/**
 * Código dos erros conhecidos
 */
export const pickerErrorCodes: InvertRecord<PickSingleErrorCodes> = {
  UNDERLYING_IMPLEMENTATION_INVALID_RESULT_FORMAT: 2,
  USER_CANCELED_OPERATION: 1,
  UNKNOWN_ERROR: 3,
  NO_IMPLEMENTATION: 4,
  STILL_LOADING_MODULES: 5,
};
