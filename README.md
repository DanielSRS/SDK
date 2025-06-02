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

Provides a background for your application with support for acrylic effects and transparent backgrounds
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { AppBackground } from '@danielsrs/react-native-sdk';

  export function App() {
    return (
      <AppBackground
        transparentBackground={false}
        useAcrylic={true}
      >
        {/* Your app content */}
      </AppBackground>
    );
  }
  ```

  **Props:**
  - `children: React.ReactNode` - App content
  - `transparentBackground?: boolean` - Use transparent background
  - `useAcrylic?: boolean` - Enable acrylic effects (Windows/macOS)

  </td>
  <td>

  <p align="center">
    Creates a themed background container for your app
  </p>

  </td>
  </tr>
</table>
</details>

<!-- Button -->

<details open>
<summary>Button</summary>

Interactive button component with multiple variants and states
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { Button } from '@danielsrs/react-native-sdk';

  export function ButtonExample() {
    return (
      <View>
        {/* Basic buttons */}
        <Button onPress={() => console.log('Pressed')}>
          Click me
        </Button>

        {/* Button with icon */}
        <Button
          icon
          showIconOnLeft
          onPress={() => console.log('Icon pressed')}
        >
          With Icon
        </Button>

        {/* Disabled button */}
        <Button disabled>
          Disabled
        </Button>

        {/* Secondary variant */}
        <Button accent={false}>
          Secondary
        </Button>
      </View>
    );
  }
  ```

  **Props:**
  - `children?: string` - Button text
  - `accent?: boolean` - Use accent styling (default: true)
  - `icon?: boolean` - Show icon
  - `showIconOnLeft?: boolean` - Position icon on left
  - `disabled?: boolean` - Disable button
  - Plus all `PressableProps`

  </td>
  <td>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/button-example" alt="Button examples"/>
  </p>

  </td>
  </tr>
</table>
</details>

<!-- Checkbox -->

<details open>
<summary>Checkbox</summary>

Three-state checkbox component (checked, unchecked, indeterminate)
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { Checkbox } from '@danielsrs/react-native-sdk';

  export function CheckboxExample() {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(undefined);

    return (
      <View>
        {/* Basic checkbox */}
        <Checkbox
          value={checked}
          onPress={() => setChecked(!checked)}
          label="Check me"
        />

        {/* Indeterminate checkbox */}
        <Checkbox
          value={indeterminate}
          onPress={() => setIndeterminate(
            indeterminate === undefined ? true :
            indeterminate ? false : undefined
          )}
          label="Three states"
        />

        {/* Disabled checkbox */}
        <Checkbox
          value={true}
          disabled
          label="Disabled"
        />
      </View>
    );
  }
  ```

  **Props:**
  - `value: boolean | undefined` - Checkbox state
  - `onPress?: () => void` - Press handler
  - `disabled?: boolean` - Disable checkbox
  - `label?: string` - Label text

  </td>
  <td>

  <p align="center">
    Interactive checkboxes with three states
  </p>

  </td>
  </tr>
</table>
</details>

<!-- ColorPicker -->

<details open>
<summary>ColorPicker</summary>

Advanced color picker with HSV color wheel
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { ColorPicker } from '@danielsrs/react-native-sdk';

  export function ColorPickerExample() {
    return (
      <View style={{ flex: 1 }}>
        <ColorPicker />
      </View>
    );
  }
  ```

  **Features:**
  - Interactive HSV color wheel
  - Real-time color preview
  - RGB and HEX color inputs
  - Touch and drag support
  - Responsive design

  </td>
  <td>

  <p align="center">
    Interactive color wheel with real-time preview
  </p>

  </td>
  </tr>
</table>
</details>

<!-- Slider -->

<details open>
<summary>Slider</summary>

Smooth slider component for numeric value selection
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { Slider } from '@danielsrs/react-native-sdk';

  export function SliderExample() {
    const [value, setValue] = useState(50);

    return (
      <View>
        <Text>Value: {value}%</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          onValueChange={setValue}
        />
      </View>
    );
  }
  ```

  **Props:**
  - `onValueChange?: (value: number) => void` - Value change callback
  - `maximumValue?: number` - Maximum value (default: 1)
  - `minimumValue?: number` - Minimum value (default: 0)

  </td>
  <td>

  <p align="center">
    Smooth animated slider with touch support
  </p>

  </td>
  </tr>
</table>
</details>

<!-- Text -->

<details open>
<summary>Text Components</summary>

Typography components with consistent theming
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import {
    Caption, Body, BodyStrong, BodyLarge,
    Subtitle, Title, TitleLarge, Display
  } from '@danielsrs/react-native-sdk';

  export function TextExample() {
    return (
      <View>
        <Display>Display Text</Display>
        <TitleLarge>Title Large</TitleLarge>
        <Title>Title</Title>
        <Subtitle>Subtitle</Subtitle>
        <BodyLarge>Body Large</BodyLarge>
        <BodyStrong>Body Strong</BodyStrong>
        <Body>Body Text</Body>
        <Caption>Caption Text</Caption>
      </View>
    );
  }
  ```

  **Available Components:**
  - `Display` - Largest heading (32pt)
  - `TitleLarge` - Large title (32pt, semibold)
  - `Title` - Standard title (28pt, semibold)
  - `Subtitle` - Subtitle (20pt, semibold)
  - `BodyLarge` - Large body (16pt)
  - `BodyStrong` - Strong body (14pt, semibold)
  - `Body` - Standard body (14pt)
  - `Caption` - Small text (12pt)

  All components extend `TextProps`

  </td>
  <td>

  <p align="center">
    Typography hierarchy with consistent theming
  </p>

  </td>
  </tr>
</table>
</details>

<!-- ToggleButton -->

<details open>
<summary>ToggleButton</summary>

Toggle button with on/off states
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { ToggleButton } from '@danielsrs/react-native-sdk';

  export function ToggleButtonExample() {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
      <View>
        <ToggleButton
          initialValue={false}
          onChange={setIsEnabled}
        >
          {isEnabled ? 'Enabled' : 'Disabled'}
        </ToggleButton>

        {/* With icon */}
        <ToggleButton
          icon
          showIconOnLeft
          onChange={(value) => console.log(value)}
        >
          Toggle with Icon
        </ToggleButton>
      </View>
    );
  }
  ```

  **Props:**
  - `initialValue?: boolean` - Initial toggle state
  - `onChange?: (newValue: boolean) => void` - State change callback
  - Plus all `ButtonProps` except `onPress` and `accent`

  </td>
  <td>

  <p align="center">
    Interactive toggle buttons with visual state changes
  </p>

  </td>
  </tr>
</table>
</details>

<!-- Menu -->

<details open>
<summary>Menu</summary>

Context menu component with flexible positioning
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { Menu } from '@danielsrs/react-native-sdk';

  export function MenuExample() {
    return (
      <Menu target={<Button>Show Menu</Button>}>
        <Menu.MenuEntry
          onPress={() => console.log('Copy')}
          left={<CopyIcon />}
          right={<Text>Ctrl+C</Text>}
        >
          Copy
        </Menu.MenuEntry>
        <Menu.MenuEntry onPress={() => console.log('Paste')}>
          Paste
        </Menu.MenuEntry>
        <Menu.MenuEntry onPress={() => console.log('Delete')}>
          Delete
        </Menu.MenuEntry>
      </Menu>
    );
  }
  ```

  **Props:**
  - `target: ReactNode` - Element that triggers menu
  - `children: ReactNode` - Menu entries
  - `maxWidth?: number` - Maximum menu width
  - `minWidth?: number` - Minimum menu width
  - `extendToTargetWidth?: boolean` - Match target width

  **MenuEntry Props:**
  - `children: string` - Entry text
  - `left?: ReactNode | (() => ReactNode)` - Left element
  - `right?: ReactNode | (() => ReactNode)` - Right element
  - Plus all `TouchableOpacityProps`

  </td>
  <td>

  <p align="center">
    Context menu with smart positioning
  </p>

  </td>
  </tr>
</table>
</details>

<!-- TabView -->

<details open>
<summary>TabView</summary>

Tab interface component for organizing content
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { TabView, routeList, sceneMap } from '@danielsrs/react-native-sdk';

  const routes = routeList([
    { key: 'first', title: 'First Tab' },
    { key: 'second', title: 'Second Tab' },
    { key: 'third', title: 'Third Tab' }
  ]);

  const scenes = sceneMap<typeof routes>({
    first: () => <Text>First Tab Content</Text>,
    second: () => <Text>Second Tab Content</Text>,
    third: () => <Text>Third Tab Content</Text>
  });

  export function TabViewExample() {
    return (
      <TabView
        routes={routes}
        initialIndex={0}
        renderScene={scenes}
      />
    );
  }
  ```

  **Utility Functions:**
  - `routeList(routes)` - Type-safe route list creation with const assertion
  - `sceneMap(scenes)` - Type-safe scene mapping with key validation
  - `sceneMap<RouteType>(scenes)` - Scene mapping with route key constraints

  **Props:**
  - `routes: Route[]` - Tab configuration
  - `initialIndex?: number` - Initial active tab
  - `renderScene: Record<string, () => ReactNode>` - Scene renderers

  **Route Type:**
  - `key: string` - Unique identifier
  - `title?: string` - Tab label
  - `icon?: string` - Tab icon
  - `accessible?: boolean` - Accessibility
  - `accessibilityLabel?: string` - A11y label
  - `testID?: string` - Test identifier

  </td>
  <td>

  <p align="center">
    Smooth animated tab navigation
  </p>

  </td>
  </tr>
</table>
</details>

<!-- RadioButton -->

<details open>
<summary>RadioButton</summary>

Radio button for single selection from options
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { RadioButton } from '@danielsrs/react-native-sdk';

  export function RadioButtonExample() {
    const [selected, setSelected] = useState('option1');

    return (
      <View>
        <RadioButton
          selected={selected === 'option1'}
          label="Option 1"
          onPress={() => setSelected('option1')}
        />
        <RadioButton
          selected={selected === 'option2'}
          label="Option 2"
          onPress={() => setSelected('option2')}
        />
        <RadioButton
          selected={selected === 'option3'}
          label="Option 3"
          onPress={() => setSelected('option3')}
        />
      </View>
    );
  }
  ```

  **Props:**
  - `selected: boolean` - Selection state
  - `label?: string` - Radio button label
  - `onPress?: () => void` - Press handler

  </td>
  <td>

  <p align="center">
    Radio buttons with smooth animations
  </p>

  </td>
  </tr>
</table>
</details>

<!-- ResizableView -->

<details open>
<summary>ResizableView</summary>

Container that can be resized by dragging edges
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { ResizableView } from '@danielsrs/react-native-sdk';

  export function ResizableViewExample() {
    return (
      <ResizableView
        maxWidthToResize={400}
        minWidthToResize={100}
        maxHeightToResize={300}
        minHeighToResize={50}
        fromRight={true}
        fromBottom={true}
        style={{ backgroundColor: 'lightblue' }}
      >
        <Text>Resizable Content</Text>
      </ResizableView>
    );
  }
  ```

  **Props:**
  - `maxWidthToResize?: number` - Maximum width
  - `minWidthToResize?: number` - Minimum width
  - `maxHeightToResize?: number` - Maximum height
  - `minHeighToResize?: number` - Minimum height
  - `fromRight?: boolean` - Enable right edge resize
  - `fromBottom?: boolean` - Enable bottom edge resize
  - Plus all `ViewProps`

  </td>
  <td>

  <p align="center">
    Interactive resizable container
  </p>

  </td>
  </tr>
</table>
</details>

<!-- useColors -->

<details open>
<summary>useColors</summary>

Hook to access theme colors that adapt to light/dark mode
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { useColors } from '@danielsrs/react-native-sdk';

  export function ColorExample() {
    const colors = useColors();

    return (
      <View style={{
        backgroundColor: colors.appBackground,
        borderColor: colors.accentDefault
      }}>
        <Text style={{ color: colors.textPrimary }}>
          Themed Text
        </Text>
      </View>
    );
  }
  ```

  **Available Colors:**
  - `appBackground` / `appForeground` - App backgrounds
  - `textPrimary` / `textSecondary` - Text colors
  - `accentDefault` / `accentSecondary` - Accent colors
  - `fillColorControlDefault` - Control backgrounds
  - `strokeColorControlStrongStrokeDefault` - Borders
  - And many more semantic color tokens

  </td>
  <td>

  <p align="center">
    Automatic color theming based on system preferences
  </p>

  </td>
  </tr>
</table>
</details>

<!-- useColorScheme -->

<details open>
<summary>useColorScheme</summary>

Hook to get current color scheme (light/dark)
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { useColorScheme } from '@danielsrs/react-native-sdk';

  export function ColorSchemeExample() {
    const colorScheme = useColorScheme();

    return (
      <View>
        <Text>Current theme: {colorScheme}</Text>
        {colorScheme === 'dark' ? (
          <Text>🌙 Dark mode active</Text>
        ) : (
          <Text>☀️ Light mode active</Text>
        )}
      </View>
    );
  }
  ```

  **Returns:**
  - `'light' | 'dark'` - Current active color scheme

  </td>
  <td>

  <p align="center">
    React to color scheme changes
  </p>

  </td>
  </tr>
</table>
</details>

<!-- useSchemeControl -->

<details open>
<summary>useSchemeControl</summary>

Hook to control app color scheme settings
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { useSchemeControl } from '@danielsrs/react-native-sdk';

  export function ThemeControls() {
    const { appColorScheme, setAppColorScheme } = useSchemeControl();

    return (
      <View>
        <Text>Current setting: {appColorScheme}</Text>

        <Button onPress={() => setAppColorScheme('light')}>
          Light Mode
        </Button>
        <Button onPress={() => setAppColorScheme('dark')}>
          Dark Mode
        </Button>
        <Button onPress={() => setAppColorScheme('system')}>
          System Default
        </Button>
      </View>
    );
  }
  ```

  **Returns:**
  - `appColorScheme: 'system' | 'light' | 'dark'` - Current setting
  - `setAppColorScheme: (scheme) => void` - Change color scheme

  </td>
  <td>

  <p align="center">
    Theme control interface
  </p>

  </td>
  </tr>
</table>
</details>

<!-- pickFile -->

<details open>
<summary>pickFile (API)</summary>

File picker API for selecting files from device
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import { pickFile } from '@danielsrs/react-native-sdk';

  export function FilePickerExample() {
    const handlePickFile = async () => {
      try {
        const file = await pickFile();
        console.log('Selected file:', file);
      } catch (error) {
        console.log('File selection cancelled');
      }
    };

    return (
      <Button onPress={handlePickFile}>
        Pick File
      </Button>
    );
  }
  ```

  **Returns:**
  - `Promise<FileResult>` - Selected file information
  - Throws if cancelled or error occurs

  </td>
  <td>

  <p align="center">
    Native file picker integration
  </p>

  </td>
  </tr>
</table>
</details>

<!-- Observable States -->

<details open>
<summary>Observable States</summary>

Access reactive state observables for advanced use cases
<table>
  <tr>
    <th> Code </th>
    <th> Result </th>
  </tr>
  <tr>

  <td>

  ```tsx
  import {
    AppColorScheme$,
    ColorScheme$,
    SystemColorScheme$,
    RootSDKViewDimensions$,
    Breakpoint$
  } from '@danielsrs/react-native-sdk';
  import { Memo } from '@legendapp/state/react';

  export function ObservableExample() {
    return (
      <View>
        <Memo>
          {() => <Text>App Scheme: {AppColorScheme$.get()}</Text>}
        </Memo>
        <Memo>
          {() => <Text>Current Scheme: {ColorScheme$.get()}</Text>}
        </Memo>
        <Memo>
          {() => <Text>Breakpoint: {Breakpoint$.get().name}</Text>}
        </Memo>
        <Memo>
          {() => (
            <Text>
              Dimensions: {RootSDKViewDimensions$.width.get()} x {RootSDKViewDimensions$.height.get()}
            </Text>
          )}
        </Memo>
      </View>
    );
  }
  ```

  **Available Observables:**
  - `AppColorScheme$` - User's color scheme preference
  - `ColorScheme$` - Current active color scheme
  - `SystemColorScheme$` - OS color scheme
  - `RootSDKViewDimensions$` - App container dimensions
  - `Breakpoint$` - Current responsive breakpoint
  - `Colors$` - Current theme colors

  </td>
  <td>

  <p align="center">
    Reactive state management with observables
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
