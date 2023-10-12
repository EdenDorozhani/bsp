import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RootParent from "./roots/RootParent";
import PropertiesPage from "./pages/PropertiesPage";
import EditAddFormPage from "./pages/EditAddFormPage";
import RootChild from "./roots/RootChild";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootParent />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/properties",
        element: <RootChild />,
        children: [
          {
            index: true,
            element: <PropertiesPage />,
          },
          { path: "addNewProperties", element: <EditAddFormPage /> },
          {
            path: "property/:id/:reference/",
            element: <EditAddFormPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
