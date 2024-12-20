import React from "react";
import ReactDOM from "react-dom/client";
import EditUser from "./components/EditUser";
import SearchUser from "./components/SearchUser";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HandleManager from "./components/HandleManager";
import EditManager from "./components/EditManager";
import SearchManager from "./components/SearchManager";
import EditBook from "./components/EditBook";
import HandleBook from "./components/HandleBook";
import SearchBook from "./components/SearchBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/manager",
    element: <HandleManager />,
  },
  {
    path: "/book",
    element: <HandleBook />,
  },
  {
    path: "/edit/:id",
    element: <EditUser />,
  },
  {
    path: "/manager/edit/:id",
    element: <EditManager />,
  },
  {
    path: "/book/edit/:id",
    element: <EditBook />,
  },
  {
    path: "/search",
    element: <SearchUser />,
  },
  {
    path: "/search/manager",
    element: <SearchManager />,
  },
  {
    path: "/search/book",
    element: <SearchBook />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
