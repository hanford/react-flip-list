import ReactDOM from "react-dom";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { css } from 'emotion'
import { shuffle } from 'lodash'
import List from 'react-flip-component'

import Item from './Item'

export default function App() {
  const [items, setItems] = useState([]);

  const addItems = () =>
    setItems([
      ...items,
      { ...defaultQuestion, id: ids[items.length] }
    ]);
  const removeItems = index => () => {
    return setItems([
      ...items.slice(0, index),
      ...items.slice(index + 1)
    ]);
  };

  const shuffleItems = () => {
    setItems(shuffle(items))
  }

  const moveItems = (fromIndex, toIndex) => () => {
    console.log(fromIndex, toIndex);
    if (toIndex < 0 || toIndex > items.length) return;
    const element = items[fromIndex];
    const clone = [...items];

    clone.splice(fromIndex, 1);
    clone.splice(toIndex, 0, element);
    return setItems([...clone]);
  };

  return (
    <div
      className={css`
        display: grid;
        max-width: 800px;
        margin: 20px auto 0;
      `}
    >
      <div
        className={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px;
        `}
      >
        <button
          className={Button}
          onClick={addItems}
        >
          Add Item
        </button>

        <button
          className={Button}
          onClick={shuffleItems}
        >
          Shuffle
        </button>
      </div>

      <List>
        {items.map((q, index) => (
          <div key={q.id}>
            <Item
              removeItems={removeItems(index)}
              question={q}
              index={index}
              moveItems={moveItems}
            />
          </div>
        ))}
      </List>
    </div>
  );
}

const Button = css`
  padding: 8px 16px;
  background-color: rgba(0,0,0,0.1);
  color: black;
  outline: none;
  cursor: pointer;
  font-size: 14px;
`

const defaultQuestion = {
  name: "",
  private: false,
  comment: false
};

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const ids = Array.from({ length: 1000 }, () => uuid());
