# React + Storybook + TypeScript

This is a template/starter to create a React UI library using Storybook and TypeScript

## Setup

```
npm install
```

## Develop

```
npm start
```

## Build

```
npm run build
```

# Usage

After publishing your lib (ie `my-react-lib`) you can use it by importing the styles in your App's entry point:

```tsx
// index.tsx
import 'my-react-lib/lib/styles.css'
```

Then you can import and use your components:

```tsx
//
import React from 'react'
import { Example } from 'my-react-lib'

export class App extends React.Component {
  render() {
    return <Example />
  }
}
```
