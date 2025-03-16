import { Memo, useObservable } from '@legendapp/state/react';
import { Animated, StyleSheet } from 'react-native';
import { Colors$ } from '../../contexts/colors/colors.values';
import { Styled } from '../Styled';
import { Body } from '../Text/Body';
import { useRef } from 'react';
import { ColorScheme$ } from '../../contexts/colorScheme/color-scheme';

interface RadioButtonProps {
  selected: boolean;
  label?: string;
  onPress?: () => void;
}

export function RadioButton(props: RadioButtonProps) {
  const { selected, label = '  ', onPress } = props;
  const border = useRef(new Animated.Value(5)).current;
  const isHovered = useObservable(false);

  return (
    <RadioButtonContiner
      onPress={onPress}
      // @ts-expect-error
      onMouseLeave={() => {
        isHovered.set(false);
        Animated.timing(border, {
          toValue: 5,
          useNativeDriver: false,
          duration: 200,
        }).start();
        // Animated.spring(border, {
        //   toValue: 5,
        //   useNativeDriver: false,
        // }).start();
      }}
      onMouseEnter={() => {
        isHovered.set(true);
        Animated.timing(border, {
          toValue: 4,
          useNativeDriver: false,
          duration: 200,
        }).start();
        // Animated.spring(border, {
        //   toValue: 4,
        //   useNativeDriver: false,
        // }).start();
      }}>
      <Memo>
        {() => {
          const borderWidth = selected ? border : 1;
          const hh = isHovered.get()
            ? Colors$.fillColorControlAltTertiary.get().toString()
            : Colors$.fillColorControlAltSecondary.get().toString();
          const backgroundColor = selected ? undefined : hh;
          const borderColor = selected
            ? Colors$.accentDefault.get().toString()
            : Colors$.strokeColorControlStrongStrokeDefault.get().toString();
          return (
            <Animated.View
              style={[
                styles.radioContainer,
                {
                  backgroundColor,
                  borderWidth,
                  borderColor: borderColor,
                },
              ]}>
              {selected && (
                <Memo>
                  {() => {
                    const bulletColor =
                      ColorScheme$.get() === 'dark' ? '#65C1EA' : '#015AAE';
                    const ss = Colors$.fillColorTextOnAccentPrimary
                      .get()
                      .toString();
                    return (
                      <Bullet
                        style={{
                          backgroundColor: ss,
                          borderColor: bulletColor,
                        }}
                      />
                    );
                  }}
                </Memo>
              )}
            </Animated.View>
          );
        }}
      </Memo>
      <Label>{label}</Label>
    </RadioButtonContiner>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
});

const RadioButtonContiner = Styled.createStyledTouchableOpacity({
  flexDirection: 'row',
  columnGap: 8,
  paddingLeft: 4,
  paddingRight: 8,
  alignItems: 'center',
});

const Label = Styled.createStyled(Body, {
  minWidth: 69,
  paddingTop: 5,
  paddingBottom: 7,
});

const Bullet = Styled.createStyledView({
  // width: 10,
  // height: 10,
  flex: 1,
  borderWidth: 1,
  borderRadius: 20,
  overflow: 'hidden',
  // borderColor: '#015AAE',
  // borderColor: '#65C1EA',
});
