
function Product(props) {

  const addToCart = (productClicked) => {
    let cartSS = sessionStorage.getItem("cart");
    cartSS = JSON.parse(cartSS) || [];
    const index = cartSS.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cartSS[index].quantity++;
    } else {
      cartSS.push({product: productClicked, quantity: 1});
    }
    cartSS = JSON.stringify(cartSS);
    sessionStorage.setItem("cart", cartSS);
  }

  return ( 
    <div key={props.element.id}>
      <img src={props.element.image} alt="" />
      <div>{props.element.name}</div>
      <div>{props.element.price}</div>
      <button onClick={() => addToCart(props.element)}>Add to cart</button>
    </div> );
}

export default Product;