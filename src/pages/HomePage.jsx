import React from "react";
import products from "../data/products";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const HomePage = () => {
  const { addToCart } = useCart();
  return (
    <div className="home-container">
      <h2>Products</h2>
      <div className="products-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product?.id}`}>
              <img src={product.image} alt={product?.name} />
              <h3>{product.name}</h3>
            </Link>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
