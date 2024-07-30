import { StrictMode } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  SdkProvider,
  useSchemeControl,
  Body,
  Caption,
  BodyStrong,
  BodyLarge,
  Subtitle,
  Title,
  TitleLarge,
  Display,
  Checkbox,
} from 'react-native-sdk';

export function Test() {
  const { setAppColorScheme } = useSchemeControl();

  return (
    <ScrollView style={styles.pageContainer}>
      <SafeAreaView>
        <View style={styles.container}>
          {/* Text components */}
          <View style={styles.textGroup}>
            <Caption>Caption</Caption>
            <Body>Body</Body>
            <BodyStrong>Body Strong</BodyStrong>
            <BodyLarge>Body Large</BodyLarge>
            <Subtitle>Subtitle</Subtitle>
            <Title>Title</Title>
            <TitleLarge>TitleLarge</TitleLarge>
            <Display>Display</Display>
          </View>

          {/* Checkbox */}
          <View style={styles.checkboxGroupContainer}>
            <View style={styles.checkboxGroup}>
              <Checkbox value={false} label={' '} />
              <Checkbox value={true} label={' '} />
              <Checkbox value={undefined} label={' '} />
            </View>
            <View style={styles.checkboxGroup}>
              <Checkbox value={false} disabled label={' '} />
              <Checkbox value={true} disabled label={' '} />
              <Checkbox value={undefined} disabled label={' '} />
            </View>
            <View style={styles.checkboxGroup}>
              <Checkbox value={false} label={'Text'} />
              <Checkbox value={true} label={'Text'} />
              <Checkbox value={undefined} label={'Text'} />
            </View>
            <View style={styles.checkboxGroup}>
              <Checkbox value={false} disabled label={'Text'} />
              <Checkbox value={true} disabled label={'Text'} />
              <Checkbox value={undefined} disabled label={'Text'} />
            </View>
          </View>
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
      </SafeAreaView>
    </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  pageContainer: {
    flex: 1,
  },

  // groups
  textGroup: {},
  checkboxGroupContainer: {
    flexDirection: 'row',
  },
  checkboxGroup: {
    gap: 10,
  },
});
