import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { selectCounter, type CounterId } from "./counters.slice";

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
