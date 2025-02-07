import { StyleSheet, View } from 'react-native';
import {
  Body,
  BodyLarge,
  BodyStrong,
  Caption,
  Display,
  Subtitle,
  Title,
  TitleLarge,
} from 'react-native-sdk';

export function Text() {
  return (
    <View style={styles.pageContainer}>
      <Caption>Text value</Caption>
      <Body>Text value</Body>
      <BodyStrong>Text value</BodyStrong>
      <BodyLarge>Text value</BodyLarge>
      <Subtitle>Text value</Subtitle>
      <Title>Text value</Title>
      <TitleLarge>Text value</TitleLarge>
      <Display>Text value</Display>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },

  // groups
  themeSwitchGroup: {
    rowGap: 20,
    // display: 'none',
  },
});
