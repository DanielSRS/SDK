import { useState, useEffect, StrictMode } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {
  multiply,
  SdkProvider,
  useColors,
  useSchemeControl,
} from 'react-native-sdk';

export function Test() {
  const [result, setResult] = useState<number | undefined>();
  const { setAppColorScheme, appColorScheme } = useSchemeControl();
  const colors = useColors();
  const textColor = { color: colors.appForeground };

  useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={textColor}>Result: {result}</Text>
      <Text style={textColor}>fasdf: {appColorScheme}</Text>
      <Button
        title="dark"
        onPress={() => {
          setAppColorScheme('dark');
        }}
      />
      <Button
        title="light"
        onPress={() => {
          setAppColorScheme('light');
        }}
      />
      <Button
        title="system"
        onPress={() => {
          setAppColorScheme('system');
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <StrictMode>
      <SdkProvider>
        <Test />
      </SdkProvider>
    </StrictMode>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
