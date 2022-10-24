import { createContext, useState } from "react";

const CartSumContext = createContext({
  cartSum: 0,
  setCartSum: (newCartSum) => {}
});

export const CartSumContextProvider = (props) => {
  const [cartSum, setCartSum] = useState(calculateCartSum());

  function calculateCartSum() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    let cartSum = 0;
    cart.forEach(element => cartSum += element.product.price * element.quantity)
    return cartSum.toFixed(2);
  }

  return (
    <CartSumContext.Provider value={{
      cartSum: cartSum,
      setCartSum: setCartSum
    }}>
      {props.children}
    </CartSumContext.Provider>
  )
}

export default CartSumContext;