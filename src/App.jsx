import React, { useState } from 'react';
import './index.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import jsonData from '../products.json';

const generateEmailContent = (cartItems, total) => {
  let content = 'Ürün İsmi\t\tMiktarı\t\tTutar\n';

  cartItems.forEach((item) => {
    const amount = item.price * item.quantity;
    content += `${item.name}\t\t${item.quantity}\t\t${amount} TL\n`;
  });

  content += `\nToplam Tutar: ${total} TL\n`;

  return encodeURIComponent(content);
};

const App = () => {
  const [products] = useState(jsonData.products);
  const [cartItems, setCartItems] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.some((item) => item.id === product.id)
        ? prevCartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCartItems, { ...product, quantity: 1 }]
    );
  };

  const removeFromCart = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleDiscountChange = () => {
    setDiscountApplied((prevDiscountApplied) => !prevDiscountApplied);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return discountApplied ? subtotal * 0.8 : subtotal;
  };

  const handlePurchase = (item) => {
    removeFromCart(item);
  };

  const generateEmailContent = (cartItems) => {
    let content = 'Ürün İsmi\t\tMiktarı\t\tTutar\n';

    cartItems.forEach((item) => {
      const amount = item.price * item.quantity;
      content += `\n${item.name}\t\t${item.quantity}\t\t${amount} TL\n\n`;
    });

    return encodeURIComponent(content);
  };

  const handleCheckout = () => {
    const totalAmount = calculateTotal();
    const emailContent = generateEmailContent(cartItems);
    const emailSubject = 'Sipariş Ayrıntısı';
    const recipientEmail = 'info@siparis.com';
    const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailContent}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="app">
      <ProductList
        products={products}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        cartItems={cartItems}
      />
      <Cart
        cartItems={cartItems}
        onDiscountChange={handleDiscountChange}
        discountApplied={discountApplied}
        total={calculateTotal()}
        onPurchase={handlePurchase}
        onCheckout={handleCheckout}
      />
    </div>
    
  );
};

export default App;