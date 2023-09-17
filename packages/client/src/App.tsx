import { FormEventHandler, useEffect, useRef, useState } from "react";
import classes from "./App.module.css";
import { slashAllApi, slashNumberApi } from "./api";
import { CachedValues } from "./components/CachedValues";
import { TechUsed } from "./components/TechUsed";
import { About } from "./components/About";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    slashAllApi["all"]
      .$get()
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

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
      <div className={classes.container}>
        <section>
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
            <p className={classes.result}>&nbsp;</p>
          )}
        </section>
        <section>
          <CachedValues />
        </section>
        <section>
          <About />
        </section>
        <section>
          <TechUsed />
        </section>
      </div>
    </main>
  );
}

export default App;
