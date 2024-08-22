import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.scss";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Single from "./pages/Single";
import UserInfo from "./pages/UserInfo";
import Update from "./pages/update";
import Profile from "./pages/Profile";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/post/:id",
          element: <Single />,
        },
        {
          path: "/edit/:id",
          element: <Update />,
        },
        {
          path: "/user/:userId",
          element: <UserInfo />,
        },
        {
          path: "/profile/:userId",
          element: <Profile />,
        },
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
