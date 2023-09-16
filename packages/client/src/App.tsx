import { FormEventHandler, useRef, useState } from "react";
import classes from "./App.module.css";
import { slashNumberApi } from "./api";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const numberString = inputRef.current?.value;

    if (!numberString) return;

    slashNumberApi[":number"]
      .$get({ param: { number: numberString } })
      .then((res) => res.json())
      .then((data) => {
        setInput(numberString);
        setResult(data.result);
      });
  };

  return (
    <main className={classes.app}>
      <h1 className={classes.heading}>Bun Fibonacci Calculator</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          ref={inputRef}
          placeholder="Max 40"
          type="number"
          max="40"
          min="0"
          className={classes.input}
        />
        <button type="submit" className={classes.button}>
          Calculate
        </button>
      </form>
      {result ? (
        <p className={classes.result}>
          Fib({input}): {result}
        </p>
      ) : (
        <p> </p>
      )}
    </main>
  );
}

export default App;
