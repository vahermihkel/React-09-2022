import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
// import productsFromFile from '../../data/products.json';

function MaintainProducts() {

  const [products, setProducts] = useState([]); 

  useEffect(() => {
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(json => setProducts(json))
  }, []);

  const removeProduct = (index) => {
    // HILJEM: otsin ta ID järgi ülesse, võtan järjekorranumbri ja kustutame
    products.splice(index,1); 
    
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: "PUT",
      body: JSON.stringify(products)
    }).then(() => setProducts(products.slice()))
  }

  // GET - võtmiseks
  // PUT - asendamiseks
  // PATCH - muudan ainult ühte üksikut kirjet - nt koguse muutmine
  // DELETE - kustutamiseks
  // POST - ühe juurde panemiseks

  return ( 
    <div>
      <AdminNavbar />
      {products.map((element, index) =>  /* <-- */
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          <div>{element.description}</div>
          <div>{element.id}</div>
          <div>{element.category}</div>
          <button onClick={() => removeProduct(index)}>x</button>
          <Link to={"/admin/edit-product/" + element.id}>
          {/* <Link to={`/admin/edit-product/${element.id}`}> */}
            <button>Muuda</button>
          </Link>
        </div>)}
    </div> );
}

export default MaintainProducts;