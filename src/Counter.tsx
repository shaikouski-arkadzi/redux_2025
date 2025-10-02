import { useEffect, useReducer } from "react";
import { store, type CounterId } from "./store";
import "./App.css";

export function Counter({ counterId }: { counterId: CounterId }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate());

    return unsubscribe;
  }, []);

  return (
    <>
      counter: {store.getState().counters[counterId]?.counter}
      <div className="card">
        <button
          onClick={() =>
            store.dispatch({ type: "increment", payload: { counterId } })
          }
        >
          increment
        </button>
        <button
          onClick={() =>
            store.dispatch({ type: "decrement", payload: { counterId } })
          }
        >
          decrement
        </button>
      </div>
    </>
  );
}
