import { Fragment, useCallback, useContext, useMemo } from 'react';
import { Styled } from '../../Styled';
import { HoverIndicator } from '../../HoverIndicator';
import { Caption } from '../../Text/Caption';
import { Body } from '../../Text/Body';
import { Constants } from '../../../utils/constants';
import { ClosesMenuContext } from './close-menu-context';
import type { ReactNode } from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { MenuEntryProps } from './menu-entry.types';

const ignoreMouseEvents = { pointerEvents: 'none', flex: 1 } as const;

export const MenuEntry = function MenuEntry(props: MenuEntryProps) {
  const {
    children,
    left,
    right,
    onPress,
    closeMenuOnPress,
    ignoreMouseEvents: ignoreMouse = true,
    ...rest
  } = props;
  const close = useContext(ClosesMenuContext);

  const ChildrenWrapper = useMemo(() => {
    if (typeof children === 'function') {
      return Fragment;
    }
    return Constants.IS_MACOS ? Caption : Body;
  }, [children]);

  const onMenuPress = useCallback(
    (event: GestureResponderEvent) => {
      closeMenuOnPress && close();
      onPress?.(event);
    },
    [close, onPress, closeMenuOnPress]
  );

  return (
    <MenuEntryContainer {...rest} onPress={onMenuPress}>
      <MenuEntryHoverContainer>
        <HoverIndicator />
        {!!left && renderFunctionOrNode(left)}
        <ChildrenWrapper style={ignoreMouse ? ignoreMouseEvents : undefined}>
          {children}
        </ChildrenWrapper>
        {!!right && renderFunctionOrNode(right)}
      </MenuEntryHoverContainer>
    </MenuEntryContainer>
  );
};

function renderFunctionOrNode(item?: ReactNode | (() => ReactNode)) {
  if (typeof item === 'function') {
    return item();
  }
  return item;
}

const MenuEntryContainer = Styled.createStyledTouchableOpacity({
  // paddingHorizontal: 16,
  // paddingVertical: 8,
  // backgroundColor: 'black',
  paddingHorizontal: 5,
  paddingVertical: 2,
  borderRadius: 4,
  overflow: 'hidden',
});

const MenuEntryHoverContainer = Styled.createStyledView({
  minHeight: 32,
  // backgroundColor: 'blue',
  paddingHorizontal: 11,
  borderRadius: 3,
  overflow: 'hidden',
  alignItems: 'center',
  flexDirection: 'row',
  columnGap: 12,
});
