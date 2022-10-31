import { Container } from "./app.styled";

export const App = () => {
  const message = "hello world";

  return <Container type={"primary"}> {message}</Container>;
};
