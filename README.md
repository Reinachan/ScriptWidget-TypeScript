# TypeScript Typing for ScriptWidget

Helps you develop widgets for [ScriptWidget](https://scriptwidget.app/) confidently knowing that your code will run ahead of time.

![GitHub package.json version](https://img.shields.io/github/package-json/v/Reinachan/scriptwidget-typescript?style=for-the-badge) [![npm](https://img.shields.io/npm/v/scriptwidget-typescript?style=for-the-badge)](https://www.npmjs.com/package/scriptwidget-typescript) ![NPM](https://img.shields.io/npm/l/scriptwidget-typescript?style=for-the-badge)

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
  "//": "...",
  "scripts": {
    "start": "tsc",
    "build": "tsc --build && prettier ./dist/**.* -w"
  },
  "//": "..."
}
```
