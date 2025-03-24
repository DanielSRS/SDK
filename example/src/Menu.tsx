import { Menu, Styled, Caption } from '@danielsrs/react-native-sdk';

export const MenuExample = () => {
  return (
    <Container>
      <Top>
        <Menu target={<MiniRedSquaare />}>
          <Menu.MenuEntry
            onPress={() => console.log('Entrada')}
            left={<Icon />}>
            Top left
          </Menu.MenuEntry>
          <Menu.MenuEntry
            onPress={() => console.log('Opção')}
            left={icon}
            right={hint}>
            Red
          </Menu.MenuEntry>
        </Menu>
        {}
        <Menu target={<MiniBlueSquaare />}>
          <Menu.MenuEntry onPress={() => console.log('Entrada')}>
            Top right
          </Menu.MenuEntry>
          <Menu.MenuEntry onPress={() => console.log('Opção')}>
            Blue
          </Menu.MenuEntry>
        </Menu>
      </Top>

      <Middle>
        {}
        {}
        <Menu target={<MiniBlackSquaare />}>
          <Menu.MenuEntry onPress={() => console.log('Entrada')}>
            Middle
          </Menu.MenuEntry>
          <Menu.MenuEntry onPress={() => console.log('Opção')}>
            Black
          </Menu.MenuEntry>
        </Menu>
      </Middle>

      {}

      <Bottom>
        {}
        <Menu target={<MiniPinkSquaare />}>
          <Menu.MenuEntry onPress={() => console.log('Entrada')}>
            Bottom left
          </Menu.MenuEntry>
          <Menu.MenuEntry onPress={() => console.log('Opção')}>
            Pink
          </Menu.MenuEntry>
        </Menu>
        {}
        <Menu target={<MiniGreenSquaare />}>
          <Menu.MenuEntry onPress={() => console.log('Entrada')}>
            Bottom right
          </Menu.MenuEntry>
          <Menu.MenuEntry onPress={() => console.log('Opção')}>
            Green
          </Menu.MenuEntry>
        </Menu>
        {}
      </Bottom>
      {}
    </Container>
  );
};

const Container = Styled.createStyledView({
  flex: 1,
});

const Icon = Styled.createStyledView({
  width: 16,
  height: 16,
  borderWidth: 1,
  borderRadius: 16,
});
const icon = () => <Icon />;
const hint = () => <Caption>CTR+D</Caption>;

const MiniRedSquaare = Styled.createStyledView({
  width: 42,
  height: 42,
  backgroundColor: 'red',
  borderRadius: 8,
});
const MiniBlueSquaare = Styled.createStyledView({
  width: 42,
  height: 42,
  backgroundColor: 'blue',
  borderRadius: 8,
});
const MiniGreenSquaare = Styled.createStyledView({
  width: 42,
  height: 42,
  backgroundColor: 'green',
  borderRadius: 8,
});
const MiniPinkSquaare = Styled.createStyledView({
  width: 42,
  height: 42,
  backgroundColor: 'pink',
  borderRadius: 8,
});
const MiniBlackSquaare = Styled.createStyledView({
  width: 42,
  height: 42,
  backgroundColor: 'black',
  borderRadius: 8,
});

const Top = Styled.createStyledView({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const Middle = Styled.createStyledView({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});
const Bottom = Styled.createStyledView({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});
