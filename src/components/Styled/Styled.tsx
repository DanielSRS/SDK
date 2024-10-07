import { TouchableOpacity, View } from 'react-native';
import type { StyleProp, TextStyle, ImageStyle, ViewStyle } from 'react-native';

type StyleableProps = {
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
};

type InferStyle<T> = T extends { style?: infer S } ? S : never;

const createStyled = <P extends StyleableProps>(
  WrappedComponent: React.ComponentType<P>,
  defaultStyles: InferStyle<P>
) => {
  return (props: P) => {
    return <WrappedComponent {...props} style={[defaultStyles, props.style]} />;
  };
};

const partialCreateStyled =
  <P extends StyleableProps>(WrappedComponent: React.ComponentType<P>) =>
  (defaultStyles: InferStyle<P>) => {
    return (props: P) => {
      return (
        <WrappedComponent {...props} style={[defaultStyles, props.style]} />
      );
    };
  };

export const Styled = {
  createStyledView: partialCreateStyled(View),
  createStyledTouchableOpacity: partialCreateStyled(TouchableOpacity),
  createStyled,
  partialCreateStyled,
};
