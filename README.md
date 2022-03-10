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
