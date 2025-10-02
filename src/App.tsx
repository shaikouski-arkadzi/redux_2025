import { useEffect, useReducer } from "react";
import { store } from "./store";
import "./App.css";

function App() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate());

    return unsubscribe;
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      counter: {store.getState().counter}
      <div className="card">
        <button onClick={() => store.dispatch({ type: "increment" })}>
          increment
        </button>
        <button onClick={() => store.dispatch({ type: "decrement" })}>
          decrement
        </button>
      </div>
    </>
  );
}

export default App;
