import { useEffect, useState } from 'react';
import { ThreeDots } from "react-loader-spinner"; 
// import productsFromFile from '../data/products.json';

          // extends React.component
function HomePage() {
  // constructor()
  const [dbProducts, setDbProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // [{name: "Nobe", category: "car"}, {name: "BMW", category: "car"}, {name: "Tesla", category: "car"}]
  // .map(element => element.name + "-EST")    ----->    Nobe-EST     BMW-EST     Tesla-EST
  // ["car", "car", "car"]
  const categories = [...new Set(dbProducts.map(element => element.category))];

  // componentDidMount()
  useEffect(() => { // <- seda sisu mis siin funktsioonis on, tehakse täpselt 1x
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setDbProducts(json);
      })
      .finally(() => setLoading(false)) 
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

  const sortAZ = () => {
    products.sort((a,b)=> a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  const sortZA = () => {
    products.sort((a,b)=> b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  const sortPriceAsc = () => {
    products.sort((a,b)=> a.price - b.price);
    setProducts(products.slice());
  }

  const sortPriceDesc = () => {
    products.sort((a,b)=> b.price - a.price);
    setProducts(products.slice());
  }

  const showByCategory = (categoryClicked) => {
    //    .filter(element => element.includes(searchedRef.current.vale))
    //    .filter(element => element.startsWith("M"))
    //    .filter(element => element.endWith("y"))
    //    .filter(element => element.length === 6)
    //    .filter(element => element.includes("mäe"))
    const result = dbProducts.filter(element => element.category === categoryClicked);
    setProducts(result);
  }

  return ( 
    <div>
      {categories.map(element => <button onClick={() => showByCategory(element)}>{element}</button>)}
      <br /><br /><br />
      <button onClick={sortAZ}>Sorteeri A-Z</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
      <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
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