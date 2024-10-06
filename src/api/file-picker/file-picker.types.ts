import type { NonEmptyArray } from '../../types/Array';
import type { Either, Left } from '../../types/Either';
import type { InvertRecord } from '../../types/Record';

export type PickSingleErrorCodes = {
  1: 'USER_CANCELED_OPERATION';
  2: 'UNDERLYING_IMPLEMENTATION_INVALID_RESULT_FORMAT';
  3: 'UNKNOWN_ERROR';
  4: 'NO_IMPLEMENTATION';
  5: 'STILL_LOADING_MODULES';
};
type PickSingleErrors = InvertRecord<PickSingleErrorCodes>;

/**
 * Tipos de arquivo (mime types) conhecidos
 */
type FileType = string;

/**
 * Opções para customização do comportamento do file picker
 */
export interface SingleFilePickerParams {
  /**
   * Tipo do arquivo para filtrar o picker.
   * Apenas arquivos que satisfaçam o tipo especificado
   * serão visíveis ou selecionaveis
   */
  type?: FileType | NonEmptyArray<FileType>;
}

// Pick one file only response
/**
 * USer cancelled. Clicked cancell button before picking any file or pressed
 * back button. No file were picked
 * This is a error response type
 */
interface UserCancelledSelection {
  /**
   * Código do erro de cacelamento do usuário
   */
  code: PickSingleFileErrorCode;
  /**
   * Menssagem explicando o erro em alto nível
   */
  message: string;
}

/**
 * Backend implementation returned a result in an
 * invalid format
 */
interface InvalidResponse {
  /**
   * Código do erro de formato invalido
   */
  code: PickSingleErrors['UNDERLYING_IMPLEMENTATION_INVALID_RESULT_FORMAT'];
  /**
   * Menssagem explicando o erro em alto nível
   */
  message: string;
  /**
   * Data received in invalid format
   */
  invalidData: unknown;
}

/**
 * There is no picker implementation. Its nescessary to install a native
 * lib that implements it like react-native-document-picker
 */
export interface NoImplementation {
  /**
   * Código do erro de implementação não encontrada
   */
  code: PickSingleErrors['NO_IMPLEMENTATION'];
  /**
   * Menssagem explicando o erro em alto nível
   */
  message: string;
}

/**
 * Backend implementation returned an unknown error
 */
interface UnknownError {
  /**
   * Código do erro de formato invalido
   */
  code: PickSingleErrors['UNKNOWN_ERROR'];
  /**
   * Menssagem explicando o erro em alto nível
   */
  message: string;
  /**
   * error received
   */
  errorData: unknown;
}
type PickSingleFileErrorCode = keyof PickSingleErrorCodes;

/**
 * Arquivo picked com sucesso.
 * Esse e uma interface de responsta de sucesso
 */
interface UserSelectedFille {
  /**
   * Tamanho do arquivo em bytes
   */
  size: number;
  /**
   * Nome do arquivo selecionado
   */
  name: string;
  /**
   * Tipo do arquivo selecionado
   * string vazia se o arquivo não tiver extensão ou definir outro tipo
   */
  type: string;
  /**
   * Capinho, endereço do recurso/arquivo selecionado
   */
  uri: PickeFileURI;
}
// começa com file:/// ?????
type PickeFileURI = string; // Should be a type more specific

// Pick one file only response END

export type SingleFilePickerResponse = Either<
  InvalidResponse | UnknownError | UserCancelledSelection,
  UserSelectedFille
>;

export type SingleFilePicker = (
  params: SingleFilePickerParams
) => Promise<SingleFilePickerResponse>;

/**
 * Picker criado automaticamente verificando se existe alguma dependencia
 * compatível ao invés de cria uma explicitamente usando um builder
 */
export type SingleFilePickerAutoBuilded = (
  params: SingleFilePickerParams
) => Promise<
  Either<
    InvalidResponse | UnknownError | UserCancelledSelection | NoImplementation,
    UserSelectedFille
  >
>;

export type RNDP_DocumentPickerResponse = {
  uri: string;
  name: string | null;
  copyError?: string;
  fileCopyUri: string | null;
  type: string | null;
  size: number | null;
};

export type RNDP_CheckedResponse = (
  data: RNDP_DocumentPickerResponse
) => Either<InvalidResponse, UserSelectedFille>;

export type RNDP_CheckedError = (
  data: RNDP_DocumentPickerResponse
) => Left<UnknownError | UserCancelledSelection>;
