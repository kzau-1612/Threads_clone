import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { decrement, increment, incrementByAmount } from "../../stores/slices/counterSlice";

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())} // Gửi action increment
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())} // Gửi action decrement
        >
          Decrement
        </button>
      </div>
      <div>
        <input
          type="number"
          defaultValue="2"
          onChange={(e) => {
            const amount = Number(e.target.value) || 0;
            dispatch(incrementByAmount(amount)); // Gửi action incrementByAmount với payload
          }}
        />
      </div>
    </div>
  );
}
