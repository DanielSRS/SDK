import { Body, Styled, TabView, routeList } from '@danielsrs/react-native-sdk';

const ROUTES = routeList([
  {
    key: 'first',
    title: 'First',
  },
  {
    key: 'second',
    title: 'Second',
  },
  {
    key: 'third',
    title: 'Third',
  },
]);

export function TabViewStory() {
  return (
    <TabView
      routes={ROUTES}
      renderScene={{
        first: () => (
          <Screen1>
            <Body>First</Body>
          </Screen1>
        ),
        second: () => (
          <Screen2>
            <Body>Second</Body>
          </Screen2>
        ),
        third: () => (
          <Screen3>
            <Body>Third</Body>
          </Screen3>
        ),
      }}
    />
  );
}

const Screen1 = Styled.createStyledView({
  borderWidth: 4,
  flex: 1,
  backgroundColor: 'green',
});

const Screen2 = Styled.createStyledView({
  borderWidth: 4,
  flex: 1,
  backgroundColor: 'blue',
});

const Screen3 = Styled.createStyledView({
  borderWidth: 4,
  flex: 1,
  backgroundColor: 'yellow',
});
