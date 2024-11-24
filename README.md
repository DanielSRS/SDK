# react-native-sdk

A SDK from building react native apps

## Installation

```sh
yarn add react-native-sdk
```

## Usage

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

  ```Typescript
  import { View } from 'react-native';
  import { Styled } from 'react-native-sdk';

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

  ```Typescript
  import { useRef } from 'react';
  import { StyleSheet, View } from 'react-native';
  import { Styled, ZStack } from 'react-native-sdk';

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


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
