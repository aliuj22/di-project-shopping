import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Home,
  Products,
  Orders,
  Cart,
  Whoops404,
  Nav,
} from './components/pages';

function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4649/products/')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  console.log(products);

  const [cartId, setCartId] = useState(
    JSON.parse(localStorage.getItem('items'))
  );

  const [cart, setCart] = useState(null);
  useEffect(() => {
    if (cartId) {
      fetch(`http://localhost:4649/cart/${cartId.cartId}/`)
        .then((res) => res.json())
        .then(setCart);
    }
  }, [cartId]);

  console.log('cart', cart);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products products={products} cart={cart} setCartId={setCartId} />
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/cart"
          element={
            cart ? <Cart products={products} cart={cart} /> : <Whoops404 />
          }
        />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}

export default App;
