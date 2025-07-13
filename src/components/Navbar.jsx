import React, { use, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartProvider, useCart } from "../contexts/CartContext";

const Navbar = () => {
  const { getTotalItems } = useCart();
  const location = useLocation();

  console.log(getTotalItems, "getTotalItems in Navbar");
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        My store
      </Link>

      <div className="link">
        {location.pathname !== "/admin/login" && (
          <Link className="cart-link" to="/cart">
            Cart{" "}
            {getTotalItems > 0 && (
              <span className="cart-count">{getTotalItems}</span>
            )}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
