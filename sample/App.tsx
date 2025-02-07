import React from 'react';
import { SdkProvider, Title } from 'react-native-sdk';

function App(): React.JSX.Element {
  return (
    <SdkProvider>
      {}
      <Title>RNTA</Title>
      {}
    </SdkProvider>
  );
}

export default App;
