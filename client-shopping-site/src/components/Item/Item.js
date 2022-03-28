const Item = (props) => {
  let currentProduct = props.products.find((product) => {
    return props.cart.productId === product._id;
  });

  console.log(currentProduct, 'curr');
  return (
    <>
      <p>{currentProduct.title}</p>
      <p>{currentProduct.pricePerHr}</p>
    </>
  );
};

export default Item;
