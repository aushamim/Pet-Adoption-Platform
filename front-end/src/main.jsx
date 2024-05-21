import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { register } from "swiper/element/bundle";
register();

import GlobalStateProvider from "./Hooks/GlobalStateProvider";
import Layout from "./Components/Layout/Layout";
import FourOFour from "./Components/FourOFour/FourOFour";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import Profile from "./Pages/User/Profile";
import EditProfile from "./Pages/User/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <FourOFour />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shelter/:id",
        element: <Profile />,
      },
      {
        path: "/shelter/edit",
        element: <EditProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStateProvider>
      <RouterProvider router={router} />
    </GlobalStateProvider>
  </React.StrictMode>
);
