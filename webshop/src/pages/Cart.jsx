import { useState } from "react";
import cartStyles from "../css/Cart.module.css";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);

  const decreaseQuantity = (index) => {
    // ["Nobe", "BMW", "Tesla"][1] = "Opel";  ---> ["Nobe", "Opel", "Tesla"]
    // [{n:"Nobe",h:3}, {n:"BMW",h:5}, {n:"Tesla",h:9}][1].quantity--;
    cart[index].quantity--;
    if (cart[index].quantity <= 0) {
      remove(index);
    }

    setCart(cart.slice()); // HTMLi uuenduseks
    sessionStorage.setItem("cart", JSON.stringify(cart)); // SS uuenduseks
  }

  const increaseQuantity = (index) => {
    cart[index].quantity++;
    setCart(cart.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cart)); 
  }

  const remove = (index) => {
    cart.splice(index,1);
    setCart(cart.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cart)); 
  }

  const calculateCartSum = () => {
    let cartSum = 0;
    // cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity)
    cart.forEach(element => cartSum += element.product.price * element.quantity)
    return cartSum;
  }

  const calculateCartItems = () => {
    let cartItems = 0;
    cart.forEach(element => cartItems += element.quantity)
    return cartItems;
  }

  const emptyCart = () => {
    setCart([]); 
    sessionStorage.setItem("cart", JSON.stringify([])); 
  }

  return ( 
    <div>
      <div className={cartStyles.top}>
        { cart.length === 0 && <div>Cart is empty</div> }
        { cart.length > 0 && <button onClick={emptyCart}>Empty cart</button> }
        { cart.length > 0 && <div>Total different cart items: {cart.length}</div> }
        { cart.length > 0 && <div>Total cart items: {calculateCartItems()}</div> }
      </div>
      { cart.map((element,index) => 
        <div className={cartStyles.product} key={index}>
          <img className={cartStyles.image} src={element.product.image} alt="" />
          <div className={cartStyles.name}>{element.product.name}</div>
          <div className={cartStyles.price}>{element.product.price} €</div>
          <div className={cartStyles.quantity}>
            <img className={cartStyles.button} onClick={() => decreaseQuantity(index)} src={require("../images/minus.png")} alt="" />
            <div>{element.quantity} tk</div>
            <img className={cartStyles.button} onClick={() => increaseQuantity(index)} src={require("../images/plus.png")} alt="" />
          </div>
          <div className={cartStyles.total}>{(element.product.price * element.quantity).toFixed(2)} €</div>
          <img className={cartStyles.button} onClick={() => remove(index)} src={require("../images/remove.png")} alt="" />
        </div> ) }
      { cart.length > 0 && <div className={cartStyles.sum}>Total: {calculateCartSum()} €</div> }
    </div> );
}

export default Cart;