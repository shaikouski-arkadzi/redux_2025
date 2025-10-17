import { Counter } from "./Counter";
import "./Counters.css";

export function Counters() {
  return (
    <div className="counters">
      <Counter counterId="first" />
      <Counter counterId="second" />
    </div>
  );
}
