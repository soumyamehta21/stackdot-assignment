import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../contexts/CartContext";

const ProductPage = ({}) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  if (!product) {
    return <div style={{ padding: "32px" }}>Product not found</div>;
  }

  return (
    <div className="product-page">
      <img src={product.image} alt={product.name}></img>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
        <p className="description">Price: ${product.price}</p>
        <div className="actions">
          <button onClick={() => handleQuantity(-1)}>-</button>
          <span className="quantity">{quantity}</span>
          <button onClick={() => handleQuantity(1)}>+</button>
        </div>
        <button
          className="add-button"
          onClick={() => addToCart(product, quantity)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
