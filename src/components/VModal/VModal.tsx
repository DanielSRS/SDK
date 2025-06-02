import React, { useEffect } from 'react';
import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { BackHandler, StyleSheet, type ModalProps } from 'react-native';
import { Styled } from '../Styled';

const modalContent$ = observable([] as React.ReactNode[]);

/**
 * VModalRoot is a component that renders the content of the modal.
 * It is used to display the modal content when the VModal component is visible.
 * It should be placed at the root of your application.
 */
export const VModalRoot = observer(function VModalRoot() {
  const children = modalContent$.get();
  const noChildToShow = React.Children.count(children) === 0;

  if (noChildToShow) {
    return null;
  }

  return <ModalRootView>{children}</ModalRootView>;
});

const ModalRootView = Styled.createStyledView({
  ...StyleSheet.absoluteFillObject,
  // backgroundColor: 'rgba(255, 0, 0, 0.1)',
  zIndex: 3000,
  flex: 1,
});

/**
 * VModal is a modal implementation for platforms that do not support
 * the native modal component, such as Windows, macOS, and web.
 */
export const VModal = observer(function VModal(props: ModalProps) {
  useEffect(() => {
    if (props.visible === false) {
      return;
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (props.visible) {
        props.onRequestClose?.(closeEvent);
        return true;
      }
      return false;
    });
    modalContent$.set([props.children]);

    return () => {
      modalContent$.set([]);
    };
  }, [props]);

  return null;
});

const closeEvent = {
  nativeEvent: undefined,
  currentTarget: {} as any,
  target: {} as any,
  bubbles: false,
  cancelable: false,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: false,
  preventDefault: function (): void {
    throw new Error('Function not implemented.');
  },
  isDefaultPrevented: function (): boolean {
    throw new Error('Function not implemented.');
  },
  stopPropagation: function (): void {
    throw new Error('Function not implemented.');
  },
  isPropagationStopped: function (): boolean {
    throw new Error('Function not implemented.');
  },
  persist: function (): void {
    throw new Error('Function not implemented.');
  },
  timeStamp: 0,
  type: '',
} as const;
