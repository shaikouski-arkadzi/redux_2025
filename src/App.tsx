import { Counter } from "./modules/counters/Counter";
import { UsersList } from "./modules/users/UsersList";
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
