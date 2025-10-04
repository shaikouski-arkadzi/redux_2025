import { selectCounter, useAppSelector, type CounterId } from "./store";
import { useDispatch } from "react-redux";
import "./App.css";

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();

  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId)
  );

  return (
    <>
      counter: {counterState?.counter}
      <div className="card">
        <button
          onClick={() =>
            dispatch({ type: "increment", payload: { counterId } })
          }
        >
          increment
        </button>
        <button
          onClick={() =>
            dispatch({ type: "decrement", payload: { counterId } })
          }
        >
          decrement
        </button>
      </div>
    </>
  );
}
