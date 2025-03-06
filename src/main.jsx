import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ProductDetail from "./views/DetailProduk.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import { AuthContext, AuthProvider } from "./contexts/AuthContext.jsx";
import CreateProduct from "./views/CreateProductAdmin.jsx";
import axios from "axios";
import ListProductAdmin from "./views/ListProductAdmin.jsx";

const token = localStorage.getItem("accessToken");
if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

const ProtectedRoute = ({ element, roleRequired }) => {
  const { role } = useContext(AuthContext);
  return role === roleRequired ? element : <Navigate to="/" />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/createproductadmin"
            element={
              <ProtectedRoute
                element={<CreateProduct />}
                roleRequired="admin"
              />
            }
          />
          <Route
            path="/listproductadmin"
            element={
              <ProtectedRoute
                element={<ListProductAdmin />}
                roleRequired="admin"
              />
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
