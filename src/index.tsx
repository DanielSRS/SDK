export { SdkProvider } from './contexts/provider';
export { useSchemeControl } from './hooks/useSchemeControl';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}
