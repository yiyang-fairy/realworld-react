import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Article from "../pages/Article";
import Auth from "../components/Auth";
import User from "../pages/User";
import Setting from "../pages/Setting";
import CreateArticle from "../pages/CreateArticle";
import Layout from "../components/Layout";

// 创建路由对象
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // path: "/",
        index: true,
        element: <Home />,
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
        path: "/article/:slug",
        element: (
          <Auth>
            <Article />
          </Auth>
        ),
      },
      {
        path: "/user/:username",
        element: (
          <Auth>
            <User />
          </Auth>
        ),
      },
      {
        path: "/setting",
        element: (
          <Auth>
            <Setting />
          </Auth>
        ),
      },
      {
        path: "/create/:slug?",
        element: (
          <Auth>
            <CreateArticle />
          </Auth>
        ),
      },
    ],
  },
]);
