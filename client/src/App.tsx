import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import "./index.scss";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const router = createBrowserRouter([
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
    
      <div>
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
