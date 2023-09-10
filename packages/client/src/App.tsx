// import { useState } from 'react'
// import reactLogo from "./assets/react.svg";

import axios from "axios";
import { useEffect } from "react";

function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get("/api/4").then((res) => console.log(res.data));
  });

  return <div>hi</div>;
}

export default App;
