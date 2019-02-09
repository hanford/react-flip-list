# react-flip-component

> Simple <List /> component that implements FLIP

[![NPM](https://img.shields.io/npm/v/react-flip-component.svg)](https://www.npmjs.com/package/react-flip-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-flip-component
```

```bash
yarn add react-flip-component
```

## Usage

```tsx
import * as React from 'react'

import List from 'react-flip-component'

class Example extends React.Component {
  render () {
    const { items } = this.props

    return (
      <List>
        {items.map(k => <Item key={k.id} {...k} />)}
      </List>
    )
  }
}
```

## License

MIT © [hanford](https://github.com/hanford)
