import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import productsFromFile from '../../data/products.json';

function MaintainProducts() {

  const [products, setProducts] = useState(productsFromFile); // <--

  const removeProduct = (index) => {
    // HILJEM: otsin ta ID järgi ülesse, võtan järjekorranumbri ja kustutame
    productsFromFile.splice(index,1); // <---
    setProducts(productsFromFile.slice()); // <--
  }

  return ( 
    <div>
      <AdminNavbar />
      {products.map((element, index) =>  /* <-- */
        <div>
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