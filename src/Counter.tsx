import { useEffect, useReducer, useRef } from "react";
import { store, type AppState, type CounterId } from "./store";
import "./App.css";

const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export function Counter({ counterId }: { counterId: CounterId }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const lastStateRef = useRef<ReturnType<typeof selectCounter>>(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentState = selectCounter(store.getState(), counterId);
      const lastState = lastStateRef.current;

      if (currentState !== lastState) {
        forceUpdate();
      }

      lastStateRef.current = currentState;
    });

    return unsubscribe;
  }, []);

  const counterState = selectCounter(store.getState(), counterId);

  return (
    <>
      counter: {counterState?.counter}
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
