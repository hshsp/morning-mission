import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts/SUIT.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LoginPage";
import WritePlanPage from "./pages/WritePlanPage";
import ListPlanPage from "./pages/ListPlanPage";
import { setInitAxioSetting } from "./network/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/write-plan",
    element: <WritePlanPage />,
  },
  {
    path: "/list-plan",
    element: <ListPlanPage />,
  },
]);

// setInitAxioSetting();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
