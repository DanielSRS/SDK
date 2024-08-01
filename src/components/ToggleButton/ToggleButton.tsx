import { useState } from 'react';
import { Button } from '../Button';
import type { ButtonProps } from '../Button/Button';

interface ToggleButtonProps
  extends Omit<ButtonProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'accent'> {
  onChange?: (newValue: boolean) => void;
  initialValue?: boolean;
}

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
