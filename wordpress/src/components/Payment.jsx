import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

function Payment(props) {

  const api = new WooCommerceRestApi({
    url: "http://localhost/wordpress/",
    consumerKey: "ck_4c8f2c8b92aefa4b33df8be478e13528787eb67f",
    consumerSecret: "cs_e45336d10786862f37682920989b8b916a4843d3",
    version: "wc/v3",
    axiosConfig: {
      headers: {
        "Content-Type": "application/json"
      }
    }
  });

  const pay = () => {
    let cartItems = JSON.parse(sessionStorage.getItem("cart"));
    cartItems = cartItems.map(element => 
      { return {product_id: element.product.id, quantity: element.quantity} 
    });

    api.post("orders", {
      "line_items": cartItems
      // "line_items": JSON.parse(sessionStorage.getItem("cart")) || []
    }).then(res => makePayment(res.data.id))
  }

  const makePayment = (orderId) => {
    //  setPaymentLoading(true);
    // paneme andmebaasi (maksmata kujul) -> saame orderi numbri
    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": props.total,
      "order_reference": orderId,
      "nonce": "a9b7f7ekjk" + orderId + new Date(),
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
    <button onClick={pay}>Maksma</button> );
}

export default Payment;