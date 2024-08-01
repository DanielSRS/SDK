export { SdkProvider } from './contexts/provider';
export { useSchemeControl } from './hooks/useSchemeControl';
export { useColors } from './hooks/useColors';
export { Body } from './components/Text/Body';
export { Caption } from './components/Text/Caption';
export { BodyStrong } from './components/Text/BodyStrong';
export { BodyLarge } from './components/Text/BodyLarge';
export { Subtitle } from './components/Text/Subtitle';
export { Title } from './components/Text/Title';
export { TitleLarge } from './components/Text/TitleLarge';
export { Display } from './components/Text/Display';
export { Checkbox } from './components/Checkbox';
export { Button } from './components/Button';
export { Slider } from './components/Slider';
export { ToggleButton } from './components/ToggleButton';
export { PNG } from './utils/PNG';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}
