import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { useTranslation } from 'react-i18next'; // <-------------------------
// import productsFromFile from '../../data/products.json';

function MaintainProducts() {
  const { t } = useTranslation(); // <---------------------
  const [products, setProducts] = useState([]); 
  const [dbProducts, setDbProducts] = useState([]); // siia panen kõik tooted, mida kunagi ei muuda
                                                    // siit ainult teen .filter()
  const searchedRef = useRef();

  useEffect(() => {
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setDbProducts(json);
      })
  }, []);

  const removeProduct = (productClicked) => {
    // HILJEM: otsin ta ID järgi ülesse, võtan järjekorranumbri ja kustutame
    const index = dbProducts.findIndex(element => element.id === productClicked.id);
    dbProducts.splice(index,1); 
    
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: "PUT",
      body: JSON.stringify(dbProducts)
    }).then(() => {
      setDbProducts(dbProducts.slice());
      searchFromProducts();
    })
  }

  // GET - võtmiseks
  // PUT - asendamiseks
  // PATCH - muudan ainult ühte üksikut kirjet - nt koguse muutmine
  // DELETE - kustutamiseks
  // POST - ühe juurde panemiseks

  const searchFromProducts = () => {
    const result = dbProducts.filter(element => 
      element.name.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
      element.description.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
      element.id.toString().includes(searchedRef.current.value)
      );
    setProducts(result);
  }

  return ( 
    <div>
      <AdminNavbar />
      <input ref={searchedRef} onChange={searchFromProducts} type="text" />
      <span>{products.length} {t("product.pcs")}</span>
      {products.map(element =>  /* <-- */
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          <div>{element.description}</div>
          <div>{element.id}</div>
          <div>{element.category}</div>
          <button onClick={() => removeProduct(element)}>x</button>
          <Link to={"/admin/edit-product/" + element.id}>
          {/* <Link to={`/admin/edit-product/${element.id}`}> */}
            <button>{t("btn.edit")}</button>
          </Link>
        </div>)}
    </div> );
}

export default MaintainProducts;