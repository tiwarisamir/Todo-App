import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App.jsx";
import "./styles/app.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// export const server = "http://localhost:5000/api/v1/";
export const server = "https://backend-practice-todo.onrender.com/api/v1/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
