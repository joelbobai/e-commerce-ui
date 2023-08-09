// import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/store";
import Verification from "./components/verification/Verification";
import DashboardLayout from "./layouts/dashboard";
import HomePage from "./pages/HomePage";
import Form from "./components/form/Form";
import Page404 from "./pages/Page404";
import "./App.css";

/** root routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { element: <Navigate to="/app" replace />, index: true },
      { path: "app", element: <HomePage /> },
      // { path: "ai", element: <AIGeneralApp /> },

      { path: "404", element: <Page404 /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
  { path: "*", element: <Navigate to="/404" replace /> },
  {
    path: "/form",
    element: <Form></Form>,
  },
  {
    path: "/verification",
    element: <Verification></Verification>,
  },
]);
function App() {
  // see the data
  //useAuthStore((state) => console.log(state));

  return (
    <div className="mainBoby">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
