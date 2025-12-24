import { Memo } from '@legendapp/state/react';
import {
  AppColorScheme$,
  Body,
  useBreakpoints$,
  ColorScheme$,
  useRootSDKViewDimensions$,
  Styled,
  SystemColorScheme$,
} from '@danielsrs/react-native-sdk';

export function Observables() {
  const RootSDKViewDimensions$ = useRootSDKViewDimensions$();
  const Breakpoint$ = useBreakpoints$();
  return (
    <Container>
      <Memo>{() => <Body>Breakpoint: {Breakpoint$.get().name}</Body>}</Memo>
      <Memo>{() => <Body>AppColorScheme: {AppColorScheme$.get()}</Body>}</Memo>
      <Memo>{() => <Body>ColorScheme: {ColorScheme$.get()}</Body>}</Memo>
      <Memo>
        {() => <Body>SystemColorScheme: {SystemColorScheme$.get()}</Body>}
      </Memo>
      <Memo>
        {() => (
          <Body>
            RootSDKViewDimensions:{' '}
            {JSON.stringify(RootSDKViewDimensions$.get())}
          </Body>
        )}
      </Memo>
      {}
    </Container>
  );
}

const Container = Styled.createStyledView({
  flex: 1,
});
