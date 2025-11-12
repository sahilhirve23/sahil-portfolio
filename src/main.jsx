import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Loader from "./components/Loader";
import App from "./App";

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <Loader onComplete={() => setIsLoading(false)} />
  ) : (
    <App />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
