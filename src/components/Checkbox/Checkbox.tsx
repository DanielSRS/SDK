import { Pressable, View } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { useState } from 'react';
import { match } from 'ts-pattern';
import { Body } from '../Text/Body';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

interface CheckboxProps {
  value: boolean | undefined;
  onPress?: () => void;
  disabled?: boolean;
  label?: string;
}

export function Checkbox(props: CheckboxProps) {
  const { value, onPress, disabled, label } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const colors = useColors();

  const _state = (() => {
    if (disabled) {
      return 'disabled';
    }
    if (isPressed) {
      return 'pressed';
    }
    if (isHovered) {
      return 'hover';
    }
    return 'rest';
  })();
  const state = { value, state: _state } as const;

  const s = match(state)
    .with(
      { value: false, state: 'rest' },
      () =>
        ({
          borderColor: colors.controlStrongStrokeDefault,
          backgroundColor: colors.controlAltSecondary,
          shadowColor: colors.textOnAccentPrimary,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: true, state: 'rest' },
      () =>
        ({
          backgroundColor: colors.accentDefault,
          borderColor: colors.accentDefault,
          shadowColor: colors.textOnAccentPrimary,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: undefined, state: 'rest' },
      () =>
        ({
          backgroundColor: colors.accentDefault,
          borderColor: colors.accentDefault,
          shadowColor: colors.textOnAccentPrimary,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: false, state: 'hover' },
      () =>
        ({
          borderColor: colors.controlStrongStrokeDefault,
          backgroundColor: colors.controlAltTertiary,
          shadowColor: colors.textOnAccentPrimary,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: true, state: 'hover' },
      () =>
        ({
          borderColor: colors.accentSecondary,
          backgroundColor: colors.accentSecondary,
          shadowColor: colors.textOnAccentPrimary,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: undefined, state: 'hover' },
      () =>
        ({
          borderColor: colors.accentSecondary,
          backgroundColor: colors.accentSecondary,
          shadowColor: colors.textOnAccentPrimary,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: false, state: 'pressed' },
      () =>
        ({
          borderColor: colors.controlStrongStrokeDisabled,
          backgroundColor: colors.controlAltQuarternary,
          shadowColor: colors.textOnAccentSecondary,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: true, state: 'pressed' },
      () =>
        ({
          borderColor: colors.accentTertiary,
          backgroundColor: colors.accentTertiary,
          shadowColor: colors.textOnAccentSecondary,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: undefined, state: 'pressed' },
      () =>
        ({
          borderColor: colors.accentTertiary,
          backgroundColor: colors.accentTertiary,
          shadowColor: colors.textOnAccentSecondary,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: false, state: 'disabled' },
      () =>
        ({
          borderColor: colors.controlStrongStrokeDisabled,
          backgroundColor: colors.controlAltDisabled,
          shadowColor: colors.textOnAccentDisabled,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: true, state: 'disabled' },
      () =>
        ({
          borderColor: colors.accentDisabled,
          backgroundColor: colors.accentDisabled,
          shadowColor: colors.textOnAccentDisabled,
        }) satisfies StyleProp<ViewStyle>
    )
    .with(
      { value: undefined, state: 'disabled' },
      () =>
        ({
          borderColor: colors.accentDisabled,
          backgroundColor: colors.accentDisabled,
          shadowColor: colors.textOnAccentDisabled,
        }) satisfies StyleProp<ViewStyle>
    )
    .exhaustive();

  const style = {
    borderColor: s.borderColor,
    backgroundColor: s.backgroundColor,
  } satisfies StyleProp<ViewStyle>;

  const iconColor = {
    color: s.shadowColor,
  } as const;

  const hasLabel = !!label;

  return (
    <View style={hasLabel ? checkboxContainer : undefined}>
      <View style={hasLabel ? checkboxWrapper : undefined}>
        <Pressable
          disabled={disabled}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          style={[
            boxStyle,
            style,
            {
              transform: [
                {
                  scale: 1,
                },
              ],
              // left: 30
            },
          ]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={onPress}>
          {value && <CheckIcon color={iconColor.color} />}
          {value === undefined && (
            <InderterminateIcon color={iconColor.color} />
          )}
          {}
        </Pressable>
      </View>
      {hasLabel && (
        <View style={textWrapper}>
          <Body>{label}</Body>
        </View>
      )}
    </View>
  );
}

const checkboxContainer: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  columnGap: 8,
  paddingLeft: 4,
  paddingRight: 8,
  // borderWidth: 1,
};

const textWrapper: StyleProp<ViewStyle> = {
  minWidth: 48,
  paddingTop: 5,
  paddingBottom: 7,
  // borderWidth: 1,
};

const checkboxWrapper: StyleProp<ViewStyle> = {
  paddingTop: 6,
};

const boxStyle: StyleProp<ViewStyle> = {
  width: 18,
  height: 18,
  borderWidth: 1,
  borderRadius: 3,
  justifyContent: 'center',
  alignItems: 'center',
};

const CheckIcon = ({ color }: { color: ColorValue }) => {
  const scale = 1;
  const direction = 'row';
  return (
    <View
      style={{
        flexDirection: direction,
        width: 12 * scale,
        height: 12 * scale,
      }}>
      <View
        style={{
          width: 5 * scale,
          height: 2 * scale,
          backgroundColor: color,
          transform: [
            {
              rotate: '45deg',
            },
          ],
          borderRadius: 1 * scale,
          // left: 3 * 10,
          top: 7 * scale,
          left: 0.1 * 10,
          // opacity: 0.4,
        }}
      />
      <View
        style={{
          width: 10 * scale,
          height: 2 * scale,
          backgroundColor: color,
          transform: [
            {
              rotate: '-45deg',
            },
          ],
          left: -(2.5 * scale),
          top: 5.6 * scale,
          borderRadius: 1 * scale,
          // opacity: 0.4,
          // left: (0.4 * 10),
        }}
      />
    </View>
  );
};

const InderterminateIcon = ({ color }: { color: ColorValue }) => {
  const scale = 1;
  return (
    <View
      style={{
        width: 8 * scale,
        height: 2 * scale,
        backgroundColor: color,
        borderRadius: 1 * scale,
      }}
    />
  );
};
