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
import MoreMenuPage from "./pages/MoreMenuPage";
import ChangePassword from "./pages/ChangePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.log(`ENV : ${process.env.REACT_APP_ENV}`);
console.log(`CURRENT_VER : ${process.env.REACT_APP_CURRENT_VER}`);

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
  {
    path: "/more",
    element: <MoreMenuPage />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);

setInitAxioSetting();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <React.Fragment>
      <ToastContainer />
      {/* Same as */}
      <ToastContainer />
      <RouterProvider router={router} />
    </React.Fragment>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
