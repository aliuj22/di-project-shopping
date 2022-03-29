const OrderInProgress = (props) => {
  console.log('from order, products:', props.cart);
  return (
    <>
      <h1>ORDER IN PROGRESS</h1>
      <label htmlFor="email">Your Email: </label>
      <input type="email" name="email" id="email" />
    </>
  );
};

export default OrderInProgress;
