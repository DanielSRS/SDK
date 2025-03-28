# @danielsrs/react-native-sdk

A SDK from building react native apps

## Installation

```sh
yarn add @danielsrs/react-native-sdk
```

## Usage

### Wrap your app content with SdkProvider

```tsx
import { SdkProvider } from '@danielsrs/react-native-sdk';

export default function App() {
  return (
    <SdkProvider>
      {/* App content */}
    </SdkProvider>
  );
}
```

The use any of the components and APIs:

<details open>
<summary>Styled</summary>

Create styled components. Makes code ease to read
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { View } from 'react-native';
  import { Styled } from '@danielsrs/react-native-sdk';

  export function StyledExample() {
    return (
      <View>
        <RedSquare />
      </View>
    );
  }

  const RedSquare = Styled.createStyledView({
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  });
  ```

  </td>
  <td>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/53b3d7aa-84d8-4683-8302-2d5cb6d3af42" alt="alt text"/>
  </p>

  </td>
  </tr>
</table>
</details>

<!-- ZStack -->

<details open>
<summary>ZStack</summary>

Position children in a z stack
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { useRef } from 'react';
  import { StyleSheet, View } from 'react-native';
  import { Styled, ZStack } from '@danielsrs/react-native-sdk';

  export function ZStackS() {
    const viewRef = useRef<View>(null);
    return (
      <ZStack
        ref={viewRef}
        style={{
          // You need to set the ZStack height someway,
          // Otherwise, nothing will be visible!!
          height: 120,
          // flex: 1,
          // height: '100%',
          // flexGrow: 1,
        }}>
        <RedSquare />
        <GreenSquare />
        <BlueSquare />
      </ZStack>
    );
  }

  const RedSquare = Styled.createStyledView({
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  });

  const GreenSquare = Styled.createStyledView({
    width: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
  });

  const BlueSquare = Styled.createStyledView({
    width: 100,
    height: 100,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
  });
  ```

  </td>
  <td>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/045c24a2-d884-42a1-ac41-3d73bb8ae73c" alt="alt text"/>
  </p>

  </td>
  </tr>
</table>
</details>

<!-- AppBackground -->

<details open>
<summary>AppBackground</summary>
</details>

> [!NOTE]
> TODO usage instructions

<!-- Button -->

<details open>
<summary>Button</summary>
</details>

> [!NOTE]
> TODO usage instructions


<!-- Checkbox -->

<details open>
<summary>Checkbox</summary>
</details>

> [!NOTE]
> TODO usage instructions

<!-- ColorPicker -->

<details open>
<summary>ColorPicker</summary>
</details>

> [!NOTE]
> TODO usage instructions

<!-- Slider -->

<details open>
<summary>Slider</summary>
</details>

> [!NOTE]
> TODO usage instructions

<!-- Text -->

<details open>
<summary>Text</summary>
</details>

> [!NOTE]
> TODO usage instructions

<!-- ToggleButton -->

<details open>
<summary>ToggleButton</summary>
</details>

> [!NOTE]
> TODO usage instructions

<!-- useColors -->

<details open>
<summary>useColors</summary>
</details>

> [!NOTE]
> TODO usage instructions

<!-- useColorSheme -->

<details open>
<summary>useColorSheme</summary>
</details>

> [!NOTE]
> TODO usage instructions


<!-- useSchemeControl -->

<details open>
<summary>useSchemeControl</summary>
</details>

> [!NOTE]
> TODO usage instructions


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
