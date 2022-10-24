import { useEffect, useState } from 'react';
import { ThreeDots } from "react-loader-spinner"; 
import Pagination from 'react-bootstrap/Pagination';
import SortButtons from '../components/SortButtons';
import Product from '../components/Product';
// import productsFromFile from '../data/products.json';

// lehele tulles???
// 1. kõik tooted (kõikidest kategooriatest)
// 2. mingi kindel kategooria nähtaval -> "esimene kategooria"
// 3. pole ühtegi toodet nähtaval ja peab valima ühe kategooria

          // extends React.component
function HomePage() {
  // constructor()
  const [dbProducts, setDbProducts] = useState([]); // 720tk andmebaasist saadud tooted -> kategooriate võtmiseks
  const [categoryProducts, setCategoryProducts] = useState([]); // 2tk/230tk/240tk  ---> tk, kui ka lehekülgede vahetuseks
  const [products, setProducts] = useState([]); // 30tk (va viimane leht) -> kasutajale lehel näitamiseks
  const [loading, setLoading] = useState(true);
  // [{name: "Nobe", category: "car"}, {name: "BMW", category: "car"}, {name: "Tesla", category: "car"}]
  // .map(element => element.name + "-EST")    ----->    Nobe-EST     BMW-EST     Tesla-EST
  // ["car", "car", "car"]
  const categories = [...new Set(dbProducts.map(element => element.category))];

  const [activePage, setActivePage] = useState(1);
  const pages = [];
  for (let number = 1; number <= Math.ceil(categoryProducts.length/30); number++) {
    pages.push(number);
  }

  // componentDidMount()
  useEffect(() => { // <- seda sisu mis siin funktsioonis on, tehakse täpselt 1x
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(json => {
        setProducts(json.slice(0,30));
        setCategoryProducts(json);
        setDbProducts(json);
      })
      .finally(() => setLoading(false)) 
  }, []); // <- siin loetletakse muutujaid mille väärtuse muutudes
  //  ta ikkagi läheb uuesti seda sisu tegema


  const showByCategory = (categoryClicked) => {
    //    .filter(element => element.includes(searchedRef.current.vale))
    //    .filter(element => element.startsWith("M"))
    //    .filter(element => element.endWith("y"))
    //    .filter(element => element.length === 6)
    //    .filter(element => element.includes("mäe"))
    const result = dbProducts.filter(element => element.category === categoryClicked);
    setCategoryProducts(result);
    setProducts(result.slice(0,30));
    setActivePage(1);
  }

  const updatePage = (newPage) => {
    setActivePage(newPage);
    //    1-30      1    0,30 
    //   31-60      2   30,60
    //   61-90      3   60,90
    setProducts(categoryProducts.slice(newPage*30-30,newPage*30));
  }

  return ( 
    <div>
      <Pagination>{pages.map(number =>
           <Pagination.Item onClick={() => updatePage(number)} key={number} active={number === activePage}>
            {number}
          </Pagination.Item>,
        )}
      </Pagination>
      <div>{categoryProducts.length} tk</div>
      {categories.map(element => <button key={element} onClick={() => showByCategory(element)}>{element}</button>)}
      <br /><br /><br />
      <SortButtons
        categoryProducts={categoryProducts}
        setProducts={setProducts}
        setActivePage={setActivePage} />
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
          <Product key={element.id} element={element} />
        )}
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