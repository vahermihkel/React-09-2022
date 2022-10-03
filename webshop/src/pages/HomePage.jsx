import { useEffect, useState } from 'react';
// import productsFromFile from '../data/products.json';

          // extends React.component
function HomePage() {
  // constructor()
  const [products, setProducts] = useState([]);

  // componentDidMount()
  useEffect(() => {
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(json => setProducts(json))
  }, []);

  const addToCart = (productClicked) => {
    // KODUS ---- samamoodi nagu siiamaani teinud oleme
    // sessionStorage.setItem("cart", cart);
  }

  return ( 
    <div>
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