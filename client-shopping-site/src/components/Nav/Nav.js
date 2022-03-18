import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="nav content-center">
      <Link to="/" className="home link">
        Home
      </Link>
      <Link to="products" className="link">
        Products
      </Link>
      <Link to="orders" className="link">
        Orders
      </Link>
      <Link to="cart" className="link">
        Cart
      </Link>

    </nav>
  );
};

export default Nav;
