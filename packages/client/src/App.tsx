import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios.get("/api/4").then((res) => console.log(res.data));
  });

  return <div>hi</div>;
}

export default App;
