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

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}

export default App;
