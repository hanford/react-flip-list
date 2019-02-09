import React, { useRef, memo, useState } from "react";
import { css } from "emotion";

const Item = memo(props => {
  const { index, question, removeItems, moveItems } = props;

  return (
    <div
      role="button"
      className={css`
        padding: 8px 16px;
        margin: 10px 0;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
        max-width: 100%;
        border-radius: 5px;

        line-height: 90px;
        padding-left: 32px;
        font-size: 14.5px;
        background: lightblue;
        text-transform: uppercase;
        letter-spacing: 2px;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
      `}
    >
        {index + 1}

        <button onClick={moveItems(index, index - 1)}>Up</button>
        <button onClick={moveItems(index, index + 1)}>Down</button>
        <button onClick={props.removeItems}>Remove</button>
    </div>
  );
});

export default Item;
