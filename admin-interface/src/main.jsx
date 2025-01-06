import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AllProducts from "./Components/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "products",
        element: <AllProducts />,
        loader: async () => {
          const response = await fetch(
            "https://fashion-delight.vercel.app/products"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        },
      },
    ],
  },
  {
    path: "/products/:id",
    element: <div>product</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
