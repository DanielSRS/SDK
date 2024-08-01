import { StrictMode, useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import {
  SdkProvider,
  useSchemeControl,
  Body,
  Caption,
  BodyStrong,
  BodyLarge,
  Button,
  Subtitle,
  Title,
  TitleLarge,
  Display,
  Checkbox,
  Slider,
  ToggleButton,
} from 'react-native-sdk';

export function Test() {
  const { setAppColorScheme } = useSchemeControl();

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={styles.pageContainer}>
        <View style={styles.container}>
          {/* Color scheme control */}
          <View style={styles.themeSwitchGroup}>
            <Button
              onPress={() => {
                setAppColorScheme('dark');
              }}>
              Dark
            </Button>
            <Button
              onPress={() => {
                setAppColorScheme('light');
              }}>
              Light
            </Button>
            <Button
              onPress={() => {
                setAppColorScheme('system');
              }}>
              System
            </Button>
          </View>

          {/* Slider */}
          <View style={styles.sliderGroup}>
            {/* <Body>{`Value: ${s} %`}</Body>
            <Slider
              maximumValue={100}
              onValueChange={f => {
                b(f.toFixed(0));
              }}
            /> */}
            <Sl />
          </View>

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

          {/* Button */}
          <View style={styles.buttonGroup}>
            {/* Text only */}
            <Button>Text</Button>
            <Button disabled>Text</Button>
            <Button accent={false}>Text</Button>
            <Button disabled accent={false}>
              Text
            </Button>
            {/* Text + icon on right */}
            <Button icon>Text</Button>
            <Button icon disabled>
              Text
            </Button>
            <Button icon accent={false}>
              Text
            </Button>
            <Button icon disabled accent={false}>
              Text
            </Button>
            {/* Text + icon on left */}
            <Button icon showIconOnLeft>
              Text
            </Button>
            <Button icon showIconOnLeft disabled>
              Text
            </Button>
            <Button icon showIconOnLeft accent={false}>
              Text
            </Button>
            <Button icon showIconOnLeft disabled accent={false}>
              Text
            </Button>
            {/* icon only */}
            <Button icon showIconOnLeft />
            <Button icon showIconOnLeft disabled />
            <Button icon showIconOnLeft accent={false} />
            <Button icon showIconOnLeft disabled accent={false} />
            {}
            {}
          </View>

          {/* Toggle button */}
          <View style={styles.buttonGroup}>
            {/* Text only */}
            <ToggleButton>Toggle</ToggleButton>
            <ToggleButton disabled>Text</ToggleButton>
            {/* Text + icon on right */}
            <ToggleButton icon>Text</ToggleButton>
            <ToggleButton icon disabled>
              Text
            </ToggleButton>
            {/* Text + icon on left */}
            <ToggleButton icon showIconOnLeft>
              Text
            </ToggleButton>
            <ToggleButton icon showIconOnLeft disabled>
              Text
            </ToggleButton>
            {/* icon only */}
            <ToggleButton icon showIconOnLeft />
            <ToggleButton icon showIconOnLeft disabled />
            {}
            {}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

const Sl = () => {
  const [s, b] = useState('0');
  return (
    <>
      <Body>{`Value: ${s} %`}</Body>
      <Slider
        maximumValue={100}
        onValueChange={f => {
          b(f.toFixed(0));
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  pageContainer: {
    flex: 1,
  },

  // groups
  themeSwitchGroup: {
    // display: 'none',
  },
  textGroup: {
    // display: 'none',
  },
  checkboxGroupContainer: {
    flexDirection: 'row',
  },
  checkboxGroup: {
    gap: 10,
    // display: 'none',
  },
  buttonGroup: {
    gap: 10,
    // display: 'none',
  },
  sliderGroup: {
    gap: 10,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
});
