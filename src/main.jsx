import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductDetail from "./views/DetailProduk.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path= "/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
