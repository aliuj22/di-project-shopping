import { useState, useEffect } from 'react';
import './Cart.css';

export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4649/cart/')
      .then((res) => res.json())
      .then(setCart);
  }, []);

  console.log('cart', cart);

  async function deleteFromCart(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  //   async function postToOrders(url = '', data = {}) {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     return response.json();
  //   }



  return (
    <div id="cartContainer">
      <h1 id="cartHeader">[Cart]</h1>
      {cart && (
        <ul id="cartList">
          {cart.map((cart, i) => (
            <li id="productsList" key={i}>
              <h3>{cart.products.title}</h3>
              <p>Price Per Hour: {cart.products.pricePerHr}</p>
              <button
                onClick={() =>
                  deleteFromCart(`http://localhost:4649/cart/${cart._id}`)
                }
              >
                Remove from Cart
              </button>
            </li>
          ))}
        </ul>
      )}
      <button>BUY</button>
    </div>
  );
}
