import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import App from "./App.jsx";
import Home from "./pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <h1 className="display-2">We can't find the page you are looking for.</h1>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
