# react-flip-list

> Simple <List /> component that implements FLIP

[![NPM](https://img.shields.io/npm/v/react-flip-list.svg)](https://www.npmjs.com/package/react-flip-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-flip-list
```

```bash
yarn add react-flip-list
```

## Usage

```tsx
import * as React from 'react'

import List from 'react-flip-list'

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
