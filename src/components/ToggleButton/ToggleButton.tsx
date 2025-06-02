import { useState } from 'react';
import { Button } from '../Button';
import type { ButtonProps } from '../Button/Button';

interface ToggleButtonProps
  extends Omit<ButtonProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'accent'> {
  onChange?: (newValue: boolean) => void;
  initialValue?: boolean;
}

/**
 * ToggleButton is a button that can be toggled on and off.
 * It accepts an `initialValue` prop to set its initial state,
 * and an `onChange` callback that is called when the button is toggled.
 * The button's appearance changes based on its toggled state.
 */
export function ToggleButton(props: ToggleButtonProps) {
  const { initialValue = false, onChange } = props;
  const [isToggled, setIsToggled] = useState(initialValue);

  const toggle = () => {
    setIsToggled(p => {
      const newValue = !p;
      onChange?.(newValue);
      return newValue;
    });
  };

  return <Button accent={isToggled} {...props} onPress={toggle} />;
}
