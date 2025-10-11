import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import {
  decrementAction,
  incrementAction,
  selectCounter,
  type CounterId,
} from "./counters.slice";

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();

  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId)
  );

  return (
    <>
      counter: {counterState?.counter}
      <div className="card">
        <button onClick={() => dispatch(incrementAction({ counterId }))}>
          increment
        </button>
        <button onClick={() => dispatch(decrementAction({ counterId }))}>
          decrement
        </button>
      </div>
    </>
  );
}
