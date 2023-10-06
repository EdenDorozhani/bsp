import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RootParent from "./roots/RootParent";
import PropertiesPage from "./pages/PropertiesPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
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
          { path: "addNewProperties", element: <AddPropertyPage /> },
          {
            path: "property/:id/:reference/",
            element: <EditPropertyPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
