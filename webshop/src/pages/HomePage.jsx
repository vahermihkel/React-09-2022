import { useEffect, useState } from 'react';
import { ThreeDots } from "react-loader-spinner"; // 1)
// import productsFromFile from '../data/products.json';

          // extends React.component
function HomePage() {
  // constructor()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // 2)

  // componentDidMount()
  useEffect(() => { // <- seda sisu mis siin funktsioonis on, tehakse täpselt 1x
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(json => setProducts(json))
      .finally(() => setLoading(false)) // 3)
  }, []); // <- siin loetletakse muutujaid mille väärtuse muutudes
  //  ta ikkagi läheb uuesti seda sisu tegema

  const addToCart = (productClicked) => {
    let cartSS = sessionStorage.getItem("cart");
    cartSS = JSON.parse(cartSS) || [];

          // {"id":14753896,"image":"https://i.ebayimg.com/thumbs/images/g/NE4AAOSwU3lh1Wz1/s-l225.webp","name":"50ft LED Strip","price":17.94,"description":"50ft LED Strip Lights USB 5050 RGB TV Back light Bluetooth Remote for Room 1-15m","category":"led","active":true}
          // [{product: {id: 147,name: "50FT"}, quantity: 1}, {product: {id: 148,name: "55FT"}, quantity: 1}]
    const index = cartSS.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cartSS[index].quantity++;
      // cartSS[index].quantity += 1;
      // cartSS[index].quantity = cartSS[index].quantity + 1;
    } else {
      cartSS.push({product: productClicked, quantity: 1});
    }

    cartSS = JSON.stringify(cartSS);
    sessionStorage.setItem("cart", cartSS);
  }

  return ( 
    <div>
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#000" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={loading === true}
        />
      {products.map(element => 
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          <button onClick={() => addToCart(element)}>Add to cart</button>
        </div>)}
    </div> );
}

export default HomePage;

// id - UNIKAALSUSE TUNNUS
// image - PILT
// name - NIMI
// price - HIND / ostukorvis kogusumma jaoks
// description - KIRJELDUS seda näeme siis kui toote peale vajutame
// category - SAAME AVALEHEL FILTREERIDA KATEGOORIATE ALUSEL
// active - AVALEHEL NÄITAME VAID AKTIIVSEID TOOTEID