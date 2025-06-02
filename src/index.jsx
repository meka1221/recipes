import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import RootContext from "./components/context/RootContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RootContext>
      <App />
    </RootContext>
  </BrowserRouter>
);
