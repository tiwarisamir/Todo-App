import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/app.scss";
import App from "./App";

// export const server = "http://localhost:5000/api/v1/";
export const server = "https://backend-practice-todo.onrender.com/api/v1/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
