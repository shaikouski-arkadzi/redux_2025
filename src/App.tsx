import { Counter } from "./Counter";
import { UsersList } from "./UsersList";
import "./App.css";

function App() {
  return (
    <>
      <Counter counterId="first" />
      <Counter counterId="second" />
      <UsersList />
    </>
  );
}

export default App;
