import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/store.types";
import {
  decrementAction,
  incrementAction,
  selectCounter,
  type CounterId,
} from "./counters.slice";
import { bindActionCreators } from "@reduxjs/toolkit";

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();

  const counterState = useAppSelector((state) =>
    selectCounter(state.counters, counterId)
  );

  const actions = bindActionCreators(
    { incrementAction, decrementAction },
    dispatch
  );

  return (
    <>
      counter: {counterState?.counter}
      <div className="card">
        <button onClick={() => actions.incrementAction({ counterId })}>
          increment
        </button>
        <button onClick={() => actions.decrementAction({ counterId })}>
          decrement
        </button>
      </div>
    </>
  );
}
