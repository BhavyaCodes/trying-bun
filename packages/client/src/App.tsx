import axios from "axios";
import { useEffect } from "react";
import classes from "./App.module.css";

function App() {
  useEffect(() => {
    axios.get("/api/4").then((res) => console.log(res.data));
  });

  return (
    <main className={classes.app}>
      <h1 className={classes.heading}>Bun Fibonacci Calculator</h1>
    </main>
  );
}

export default App;
