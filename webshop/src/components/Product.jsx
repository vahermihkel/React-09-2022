import { useContext } from "react";
import CartSumContext from "../store/CartSumContext";

function Product(props) {
  const cartSumCtx = useContext(CartSumContext);

  const addToCart = (productClicked) => {
    let cartSS = sessionStorage.getItem("cart");
    cartSS = JSON.parse(cartSS) || [];
    const index = cartSS.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cartSS[index].quantity++;
    } else {
      cartSS.push({product: productClicked, quantity: 1});
    }
    
    let cartSum = 0;
    cartSS.forEach(element => cartSum += element.product.price * element.quantity)
    cartSumCtx.setCartSum(cartSum.toFixed(2));

    cartSS = JSON.stringify(cartSS);
    sessionStorage.setItem("cart", cartSS);
  }

  return ( 
    <div>
      <img src={props.element.image} alt="" />
      <div>{props.element.name}</div>
      <div>{props.element.price.toFixed(2)}</div>
      <button onClick={() => addToCart(props.element)}>Add to cart</button>
    </div> );
}

export default Product;