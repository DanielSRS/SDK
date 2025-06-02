import { forwardRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import type { StyleProp, TextStyle, ImageStyle, ViewStyle } from 'react-native';

type StyleableProps = {
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
};

type InferStyle<T> = T extends { style?: infer S } ? S : never;

/**
 * Create a styled component with default styles.
 * This function takes a component and applies default styles to it.
 * It also allows for additional styles to be passed in via the `style` prop.
 *
 * @param WrappedComponent - The component to be styled.
 * @param defaultStyles - The default styles to apply to the component.
 * @param displayName - Optional display name for the component.
 */
const createStyled = <P extends StyleableProps>(
  WrappedComponent: React.ComponentType<P>,
  defaultStyles: InferStyle<P>,
  displayName?: string
) => {
  const styledComponent = forwardRef((props: P, ref) => {
    return (
      <WrappedComponent
        ref={ref}
        {...props}
        style={[defaultStyles, props.style]}
      />
    );
  });
  if (displayName) {
    styledComponent.displayName = displayName;
  }
  return styledComponent;
};

/**
 * Partial function to create a styled component with default styles.
 * This is a convenience function that allows for the creation of styled components
 * without needing to specify the wrapped component each time.
 *
 * @param WrappedComponent - The component to be styled.
 */
const partialCreateStyled =
  <P extends StyleableProps>(WrappedComponent: React.ComponentType<P>) =>
  (defaultStyles: InferStyle<P>, displayName?: string) => {
    const styledComponent = forwardRef((props: P, ref) => {
      return (
        <WrappedComponent
          ref={ref}
          {...props}
          style={[defaultStyles, props.style]}
        />
      );
    });

    if (displayName) {
      styledComponent.displayName = displayName;
    }
    return styledComponent;
  };

/**
 * Styled is an object that contains methods to create styled components.
 * It provides a way to create styled components with default styles
 * and allows for additional styles to be passed in via the `style` prop.
 */
export const Styled = {
  createStyledView: partialCreateStyled(View),
  createStyledTouchableOpacity: partialCreateStyled(TouchableOpacity),
  createStyled,
  partialCreateStyled,
};
