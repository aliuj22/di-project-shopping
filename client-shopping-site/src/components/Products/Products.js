import './Products.css';

export default function Products(props) {
  async function postToCart(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

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
                  postToCart('http://localhost:4649/cart/', { products }).then(
                    (data) => {
                      console.log(data);
                    }
                  )
                }
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
