import { Body } from '../Text/Body';
import { Styled } from '../Styled';
import { Animated } from 'react-native';
import { useMemo, useRef } from 'react';
import type { Route, TabViewProps } from './tab-view.types';

export const anim = (value: Animated.Value, to: number) => () => {
  Animated.spring(value, {
    toValue: to,
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    useNativeDriver: false,
  }).start();
};

export function TabView<T extends Route>(props: TabViewProps<T>) {
  const { routes, renderScene } = props;
  const screenIndex = useRef(new Animated.Value(0)).current;
  const numberOfScreens = routes.length;
  const shiftContainerWidth = `${numberOfScreens * 100}%` as const;
  const screenContainerWidth = `${100 / numberOfScreens}%` as const;
  const maxOffset = (numberOfScreens - 1) * -100 + '%';
  const inter = useRef(
    screenIndex.interpolate({
      inputRange: [0, numberOfScreens - 1],
      outputRange: ['0%', maxOffset], // Map to percentage values
    })
  ).current;

  const ScreenContainer = useMemo(
    () =>
      Styled.createStyledView({
        width: screenContainerWidth,
      }),
    [screenContainerWidth]
  );

  const renderedScreens = useMemo(() => {
    return routes.map(route => {
      const key: T['key'] = route.key;
      const Screen: () => React.ReactNode = renderScene[key];
      return (
        <ScreenContainer key={route.key}>
          {Screen ? <Screen /> : null}
        </ScreenContainer>
      );
    });
  }, [ScreenContainer, renderScene, routes]);

  const renderedTabs = useMemo(() => {
    return (
      <TabsContainer>
        {routes.map((route, index) => {
          const tabName = route.title ?? route.key;
          const onTabPress = anim(screenIndex, index);
          return (
            <Tab key={route.key} onPress={onTabPress}>
              <Body>{tabName}</Body>
            </Tab>
          );
        })}
      </TabsContainer>
    );
  }, [routes, screenIndex]);

  return (
    <Container>
      {renderedTabs}
      <Animated.View
        style={[
          screensShiftContainer,
          {
            marginLeft: inter,
            width: shiftContainerWidth,
          },
        ]}>
        {renderedScreens}
      </Animated.View>
    </Container>
  );
}

const screensShiftContainer = {
  flex: 1,
  flexDirection: 'row',
} as const;

const Container = Styled.createStyledView({
  flex: 1,
  overflow: 'hidden',
});

const TabsContainer = Styled.createStyledView({
  flexDirection: 'row',
});

const Tab = Styled.createStyledTouchableOpacity({
  padding: 8,
});
