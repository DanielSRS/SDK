import { Pressable, StyleSheet, View } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { useState } from 'react';
import { match } from 'ts-pattern';
import { Body } from '../Text/Body';
import type {
  ColorValue,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface ButtonProps extends PressableProps {
  children?: string;
  style?: StyleProp<ViewStyle>;
  accent?: boolean;
  showIconOnLeft?: boolean;
  icon?: boolean;
}

interface MM {
  bg: ColorValue;
  tc: ColorValue;
  alt_bg: ColorValue;
  alt_tx: ColorValue;
}
export function Button(props: ButtonProps) {
  const {
    children,
    disabled,
    accent = true,
    showIconOnLeft = false,
    icon = false,
  } = props;
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

  const _colors = match({ state: _state })
    .with(
      { state: 'disabled' },
      () =>
        ({
          bg: colors.accentDisabled,
          tc: colors.textOnAccentDisabled,
          alt_bg: colors.fillColorControlDisabled,
          alt_tx: colors.fillColorTextDisabled,
        }) satisfies MM
    )
    .with(
      { state: 'pressed' },
      () =>
        ({
          bg: colors.accentTertiary,
          tc: colors.textOnAccentSecondary,
          alt_bg: colors.fillColorControlTertiary,
          alt_tx: colors.fillColorTextSecondary,
        }) satisfies MM
    )
    .with(
      { state: 'hover' },
      () =>
        ({
          bg: colors.accentSecondary,
          tc: colors.textOnAccentPrimary,
          alt_bg: colors.fillColorControlSecondary,
          alt_tx: colors.fillColorTextPrimary,
        }) satisfies MM
    )
    .with(
      { state: 'rest' },
      () =>
        ({
          bg: colors.accentDefault,
          tc: colors.textOnAccentPrimary,
          alt_bg: colors.fillColorControlDefault,
          alt_tx: colors.fillColorTextPrimary,
        }) satisfies MM
    )
    .exhaustive();

  const minWidth = { minWidth: 96 };
  const btns = { backgroundColor: accent ? _colors.bg : _colors.alt_bg };
  const ts = {
    color: accent ? _colors.tc : _colors.alt_tx,
    textAlignVertical: 'center',
    textAlign: 'center',
    // paddingBottom: 2,
  } as const;

  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPointerEnter={e => {
        props.onPointerEnter?.(e);
        setIsHovered(true);
      }}
      onPointerLeave={e => {
        props.onPointerLeave?.(e);
        setIsHovered(false);
      }}
      onPressIn={e => {
        props.onPressIn?.(e);
        setIsPressed(true);
      }}
      onPressOut={e => {
        props.onPressOut?.(e);
        setIsPressed(false);
      }}
      style={[styles.button, btns, props.style, minWidth]}>
      {showIconOnLeft && icon && <StandartIcon color={ts.color} />}
      {!!children && (
        <Body selectable={false} style={ts}>
          {children}
        </Body>
      )}
      {!showIconOnLeft && icon && <StandartIcon color={ts.color} />}
    </Pressable>
  );
}

const StandartIcon = ({ color }: { color: ColorValue }) => {
  const s = {
    borderWidth: 1,
    borderColor: color,
    width: 16,
    height: 16,
    borderRadius: 8,
    paddingTop: 3,
    paddingBottom: 2,
  } as const;
  return <View style={s} />;
};

const styles = StyleSheet.create({
  button: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 7,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
    // transform: [{ scale: 20 }],
    // alignSelf: 'flex-end',
    // top: -100,
    borderWidth: 1,
    // borderColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.25)',
  },
});
