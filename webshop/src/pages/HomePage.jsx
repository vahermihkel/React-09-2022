import productsFromFile from '../data/products.json';

function HomePage() {

  const addToCart = (productClicked) => {
    // KODUS ---- samamoodi nagu siiamaani teinud oleme
    // sessionStorage.setItem("cart", cart);
  }

  return ( 
    <div>
      {productsFromFile.map(element => 
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