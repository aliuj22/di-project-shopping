import './Cart.css';
import Item from '../Item/Item';
import { Link } from 'react-router-dom';

import { Whoops404 } from '../pages';

export default function Cart(props) {
  console.log('from cart', props.cart.products);

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

      {props.cart.products && (
        <ul id="cartList">
          {props.cart.products.map((cart, i) => (
            <li id="productsList" key={i}>
              {props.products ? (
                <Item cart={cart} products={props.products} />
              ) : (
                <Whoops404 />
              )}
              <button
                onClick={() =>
                  deleteFromCart(
                    `http://localhost:4649/cart/${props.cart._id}/${cart.productId}/`
                  )
                }
              >
                Remove from Cart
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link to="orderInProgress">
        <button>BUY</button>
      </Link>
    </div>
  );
}
