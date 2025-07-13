import React from "react";
import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, getTotalPrice, removeFromCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="cart-item-info">
                  <img src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>
                <div className="controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>{item?.price * item?.quantity}</td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="total">Total: ${getTotalPrice}</h3>
    </div>
  );
};

export default CartPage;
