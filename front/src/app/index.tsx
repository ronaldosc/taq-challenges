import React from "react";
import { ContainerCustom } from "./app.styled";

export const App = () => {
  const [count, setCount] = React.useState(0);

  const sum = () => {
    setCount(count + 1);
  };

  const sub = () => {
    setCount(count - 1);
  };

  return (
    <ContainerCustom>
      <p>Contador: {count}</p>
      <button onClick={sum}>+</button>
      <button onClick={sub}>-</button>
    </ContainerCustom>
  );
};
