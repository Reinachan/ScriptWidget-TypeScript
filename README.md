# TypeScript Typing for ScriptWidget

Helps you develop widgets in ScriptWidget confidently knowing that your code will run ahead of time.

## Usage

Setup with

```bash
npm i --save-dev scriptwidget-typescript typescript
```

In your widget file you need to import any global ScriptWidget functions you use from `scriptwidget-typescript`

```ts
import {
  $getenv,
  $http,
  $render,
  $device,
  $json,
  $gradient,
} from 'scriptwidget-typescript';

/* ... */
```

Then when you've built your code and are ready to test it, you need to remove the imports at the top of the compiled file.

## Tips

You can declare custom components with the `Component` type helper which automatically adds an optional children prop.

```ts
import type { Component, Font } from 'scriptwidget-typescript';

interface CustomComponentProps {
  text: string;
  font: Font;
}

const CustomComponent: Component<CustomComponentProps> = ({
  prop1,
  font,
  children,
}) => {
  return <text font={font}>{children}</text>;
};
```

Other helper types are:

- NumberString
- Decimal

And some useful types are

- Font
- Color
- HashColor
- Frame
- GridProp

There are more but you can look through those when importing using `ctrl + .` (in VSCode) or directly in the sourcefiles

## Project template recommendations

tsconfig.json

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node",
    "target": "ES2020",
    "jsx": "preserve",
    "noImplicitAny": true,
    "removeComments": false,
    "outDir": "dist",
    "watch": true
  },
  "include": ["src/**.*"]
}
```

package.json

```json
{
  //...
  "scripts": {
    "start": "tsc",
    "build": "tsc --build && prettier ./dist/**.* -w"
  }
  // ...
}
```
