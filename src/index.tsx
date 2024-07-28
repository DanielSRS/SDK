export { SdkProvider } from './contexts/provider';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}
