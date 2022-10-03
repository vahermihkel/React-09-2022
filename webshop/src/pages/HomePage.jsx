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
    // KODUS ---- samamoodi nagu siiamaani teinud oleme
    // sessionStorage.setItem("cart", cart);
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
        <div>
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