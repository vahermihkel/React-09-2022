import { useEffect, useRef, useState } from "react";
import cartStyles from "../css/Cart.module.css";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const [parcelMachines, setParcelMachines] = useState([]);

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => {
        json = json.filter(element => element.A0_NAME === "EE");
        setParcelMachines(json);
      })
  }, []);

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
    if (cart.length === 0) {
      setSelectedPM({});
    }
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
    setSelectedPM({});
  }

  const pmRef = useRef(); // <- useRef import ka

  const [selectedPM, setSelectedPM] = useState({});

  const pmChanged = () => {
    // console.log(event.target.value)
    const parcelMachineFound = parcelMachines.find(element => element.NAME === pmRef.current.value);
    setSelectedPM(parcelMachineFound);
  }

  const pay = () => {
    // setPaymentLoading(true);
    // paneme andmebaasi (maksmata kujul) -> saame orderi numbri
    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": calculateCartSum(),
      "order_reference": Math.random() * 99999999,
      "nonce": "a9b7f7ekjk" + Math.random() * 99999999 + new Date(),
      "timestamp": new Date(),
      "customer_url": "https://react-0922.web.app/tellimus"
      }
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff",{
      "method": "POST",
      "body": JSON.stringify(paymentData),
      "headers": {
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => window.location.href = json.payment_link)
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
      { cart.length > 0 && <div className={cartStyles.sum}>Total: {calculateCartSum().toFixed(2)} €</div> }

      { cart.length > 0 && <select ref={pmRef} onChange={pmChanged}>
        { parcelMachines.map(element => <option key={element.NAME}>{element.NAME}</option>) }
      </select>}
      { selectedPM.NAME !== undefined && <div>{selectedPM.NAME} - {selectedPM.A1_NAME}</div>}
      <br />
      { selectedPM.NAME !== undefined && <button onClick={pay}>Maksma</button>}
      {/* paymentLoading === true && <Spinner /> */}
    </div> );
}

export default Cart;