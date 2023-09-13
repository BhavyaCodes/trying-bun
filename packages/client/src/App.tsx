import axios from "axios";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import classes from "./App.module.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [result, setResult] = useState(null);
  useEffect(() => {
    axios.get("/api/4").then((res) => console.log(res.data));
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const numberString = inputRef.current?.value;

    if (!numberString) return;
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
    </main>
  );
}

export default App;
