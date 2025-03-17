import { Memo } from '@legendapp/state/react';
import {
  AppColorScheme$,
  Body,
  Breakpoint$,
  ColorScheme$,
  RootSDKViewDimensions$,
  Styled,
  SystemColorScheme$,
} from '@danielsrs/react-native-sdk';

export function Observables() {
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
