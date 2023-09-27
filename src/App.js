import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import Root from "./pages/Root";
import PropertiesPage from "./pages/PropertiesPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/properties",
      element: <Root />,
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
  ]);

  return (
    <>
      <ToastContainer autoClose={3000} pauseOnFocusLoss={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
