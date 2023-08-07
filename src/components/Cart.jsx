import React from 'react';

const Cart = ({ cartItems, onDiscountChange, discountApplied, total, onPurchase, onCheckout  }) => {
  return (
    <div className="cart">
      <h2 class="sepet">Sepetim</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} <b>x{item.quantity}</b> &nbsp;&nbsp; {item.price * item.quantity} TL
            <button id='minus-btn' onClick={() => onPurchase(item)}>-</button>
          </li>
        ))}
      </ul>
      <label>
        <p class="indirim"> %20 İndirim Uygula:</p>
        <input id="checkbox" type="checkbox" checked={discountApplied} onChange={onDiscountChange} />
      </label>
      <p class="tutar">Toplam Tutar: {total} TL</p>
      <button id="checkout-btn" className="checkout-btn" onClick={onCheckout} >Alışverişi tamamla</button>

    </div>
  );
};




export default Cart;
