import { expect } from '@jest/globals';
import { pickFile } from './file-picker';
import { isLeft } from '../../types/Either';

it('Is defined', () => {
  expect(pickFile).toBeDefined();
});

it('There is no module', async () => {
  const result = await pickFile({});
  if (!isLeft(result)) {
    // Should be false
    expect(true).toBe(false);
    return;
  }
  expect(result.left.code).toBe(4);
});
