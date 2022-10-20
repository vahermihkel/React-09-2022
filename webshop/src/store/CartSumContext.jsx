import { createContext, useState } from "react";

const CartSumContext = createContext(null);

export const CartSumContextProvider = (props) => {
  const [cartSum, setCartSum] = useState(50);

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