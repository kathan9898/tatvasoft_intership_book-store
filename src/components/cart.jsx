import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import WithAuth from '../layout/WithAuth';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromCookies = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, "$1");
    fetch(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${userIdFromCookies}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setCartItems(data.result);
        }
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const deleteCartItem = async (itemId) => {
    try {
      const response = await fetch(`https://book-e-sell-node-api.vercel.app/api/cart?id=${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted item from the cartItems state
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
      } else {
        console.error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const placeOrder = async () => {
    const userIdFromCookies = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, "$1");
    const cartIds = cartItems.map(item => item.id);

    try {
      const response = await fetch('https://book-e-sell-node-api.vercel.app/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userIdFromCookies,
          cartIds: cartIds,
        }),
      });

      if (response.ok) {
        // Order placed successfully, clear cart
        setCartItems([]);
        alert('Order placed successfully!');
        toast.success("Order Placed...",{position:"top-right"});
        navigate("/books");

      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const tableContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'left',
    border: '1px solid #ccc',
    marginTop: '20px',
  };

  const cellStyle = {
    padding: '12px',
    borderBottom: '1px solid #ccc',
    verticalAlign: 'middle',
  };

  const deleteButtonStyle = {
    backgroundColor: 'white',
    border: '1px solid red',
    color: 'red',
    padding: '6px 12px',
    cursor: 'pointer',
  };

  const emptyCartMessageStyle = {
    fontStyle: 'italic',
    color: 'red',
  };

  const placeOrderButtonStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
    marginTop: '20px',
    opacity: cartItems.length === 0 ? 0.5 : 1,
  };

  return (
    <div style={containerStyle}>
      <h1>Your Cart</h1>
      <div style={tableContainerStyle}>
        {cartItems.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Book Name</th>
                <th style={cellStyle}>Price</th>
                <th style={cellStyle}>Quantity</th>
                <th style={cellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td style={cellStyle}>{item.book.name}</td>
                  <td style={cellStyle}>₹{item.book.price} X {item.quantity}</td>
                  <td style={cellStyle}>{item.quantity}</td>
                  <td style={cellStyle}>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => deleteCartItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={emptyCartMessageStyle}>Your cart is empty.</p>
        )}
      </div>
      <button
        style={placeOrderButtonStyle}
        onClick={placeOrder}
        disabled={cartItems.length === 0}
      >
        Place Order
      </button>
    </div>
  );
};

export default WithAuth(Cart);
