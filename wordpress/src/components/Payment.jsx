
function Payment(props) {
  const pay = () => {
    // setPaymentLoading(true);
    // paneme andmebaasi (maksmata kujul) -> saame orderi numbri
    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": props.total,
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
    <button onClick={pay}>Maksma</button> );
}

export default Payment;