import './Products.css';
import { useEffect, useState } from 'react';

export default function Products(props) {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')));

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    props.setCartId(items)
  }, [items, props]);

  console.log(items);

  async function postToCart(data = {}) {
    if (!items) {
      const url = 'http://localhost:4649/cart/';
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((r) => r.json());
      alert('Item Added To Cart');
      setItems(response);
      return response;
    } else if (items) {
      const url = `http://localhost:4649/cart/${items.cartId}/`;
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      alert('Item Added To Cart');
      return response.json();
    }
    // setItems(props.cart[0]._id )
  }

  // async function buyNow(url = '') {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(props.products.title),
  //   });
  //   return response.json();
  // }

  return (
    <section id="productsSection">
      <h1 id="productsTitle">[OUR SEVICES]</h1>
      {props.products && (
        <ul className="list">
          {props.products.map((products, i) => (
            <li id="productsList" key={i}>
              <img id="productsImg" src={products.img} alt="i" />
              <h3>{products.title}</h3>
              <p>{products.description}</p>
              <p>Price Per Hour: {products.pricePerHr}</p>
              <button
                onClick={() =>
                  postToCart({
                    products: [
                      {
                        productId: products._id,
                        qty: 1,
                      },
                    ],
                  })
                }
              >
                Add to Cart
              </button>
              {/* <button onClick={() => buyNow('http://localhost:4649/orders/')}>
                Buy Now
              </button> */}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
