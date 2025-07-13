import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isAdminLoggedIn") === "true");
  }, [localStorage.getItem("isAdminLoggedIn")]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              isLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />
            }
          ></Route>
          <Route
            path="/admin/login"
            element={
              !isLoggedIn ? <AdminLogin /> : <Navigate to="/admin/dashboard" />
            }
          ></Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="*"
            element={<Navigate to="/admin/login" replace />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
