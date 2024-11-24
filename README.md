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


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
