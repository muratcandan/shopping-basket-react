import React from 'react';

const Product = ({ product, onAddToCart, onRemoveFromCart }) => {
  const { name, price, stock, img, description } = product;

  return (
    <div className="product-card">
      <img src={img} alt={name} />
      <h2>{name}</h2>
      <div id="price"><p >Tutar: {price} TL</p></div>
      <p>Stok: {stock}</p>
      <p>{description}</p>
      <div className="product-actions">
        <button class="plus" onClick={() => onAddToCart(product)}>+</button>
        <button class="minus" onClick={() => onRemoveFromCart(product)}>-</button>
      </div>
    </div>
  );
};

export default Product;
