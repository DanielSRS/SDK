import { describe, it, expect, beforeEach } from '@jest/globals';
import { pickSinglebBuilder } from './file-picker.builder';

const ARGS = {
  type: 'file.type',
} satisfies Parameters<ReturnType<typeof pickSinglebBuilder>>[0];

const implementationMock = jest.fn(
  (async () => {}) as unknown as typeof pickSinglebBuilder
);
describe('Pick single builder', () => {
  let pickSingle = pickSinglebBuilder({
    lib: 'react-native-document-picker',
    pickSingle: implementationMock as any,
  });
  beforeEach(() => {
    pickSingle = pickSinglebBuilder({
      lib: 'react-native-document-picker',
      pickSingle: implementationMock as any,
    });
  });

  it('Returns a picker funcion', () => {
    expect(typeof pickSingle).toBe('function');
  });

  it('Implementation is called one time', () => {
    pickSingle(ARGS);
    expect(implementationMock).toBeCalledTimes(1);
  });

  it('Args passed to implementation', async () => {
    await pickSingle(ARGS);
    expect(implementationMock).toBeCalledWith(ARGS);
  });
});
