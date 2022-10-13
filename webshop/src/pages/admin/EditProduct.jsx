import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ThreeDots } from "react-loader-spinner"; // <---------------
// import productsFromFile from "../../data/products.json";

function EditProduct() {
  const { id } = useParams();      // element / product / e
  const [products, setProducts] = useState([]);
  const productFound = products.find(element => element.id === Number(id));
  const productIndex = products.indexOf(productFound);
  const [loading, setLoading] = useState(true); // <---------------

  useEffect(() => {
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(json => setProducts(json))
      .finally(() => setLoading(false))
  }, []);

  // const productIndex2 = productsFromFile.findIndex(element => element.id === Number(id));
  // const productFound2 = productsFromFile[productIndex2];

                                                      // 14753896 === "14753896"

                                                      // element.id === Number(id)
                                                      // 14753896   === 14753896

                                                      // element.id.toString() === id
                                                      // "14753896" === "14753896"
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();
  const navigate = useNavigate();

  // muutmine eesti keelse järgi
  const updateProduct = () => {

    const newProduct = {
      "id": Number(idRef.current.value),
      "image": imageRef.current.value,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "description": descriptionRef.current.value,
      "category": categoryRef.current.value,
      "active": activeRef.current.checked
    }

    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products/"+ productIndex +".json", {
      method: "PUT",
      body: JSON.stringify(newProduct)
    }).then(() => navigate("/admin/maintain-products"))

    // products[productIndex] = newProduct;
    // fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
    //   method: "PUT",
    //   body: JSON.stringify(products)
    // }).then(() => navigate("/admin/maintain-products"))

       // navigate("") <-- see peab olema .then sees, sellepärast et muidu ta 
          // navigeerib enne ära kui ta on jõudnud API otspunkti kaudu toodet uuendada
          // -- sellepärast, et fetch on asünkroone (lubab koodil edasi liikuda)
  }

  const [idUnique, setIdUnique] = useState(true);

  const checkIfIdUnique = () => {
    if (idRef.current.value === id) {
      setIdUnique(true);
    } else {
      const found = products.find(element => element.id === Number(idRef.current.value));
      if (found === undefined) {
        setIdUnique(true);
      } else {
        setIdUnique(false);
      }
    }
  }

  return (                                                          
    <div>
      <AdminNavbar />
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
      { productFound !== undefined && 
      <div>
        { idUnique === false && <div>Sisestatud ID ei ole unikaalne!</div>}
        <label>ID</label> <br />
        <input onChange={checkIfIdUnique} ref={idRef} defaultValue={productFound.id} type="number" /> <br />
        <label>Name</label> <br />
        <input ref={nameRef} defaultValue={productFound.name} type="text" /> <br />
        <label>Price</label> <br />
        <input ref={priceRef} defaultValue={productFound.price} type="number" /> <br />
        <label>Image</label> <br />
        <input ref={imageRef} defaultValue={productFound.image} type="text" /> <br />
        <label>Category</label> <br />
        <input ref={categoryRef} defaultValue={productFound.category} type="text" /> <br />
        <label>Description</label> <br />
        <input ref={descriptionRef} defaultValue={productFound.description} type="text" /> <br />
        <label>Active</label> <br />
        <input ref={activeRef} defaultChecked={productFound.active} type="checkbox" /> <br />
        <button disabled={idUnique === false} onClick={updateProduct}>Muuda</button>
      </div>}
      { productFound === undefined && <div>Toodet ei leitud!</div>}
    </div> );
}

  /* string - ""  <--- false 
          string - " "  <--- true
          number - 0 <--- false
          number - mitte0 <--- true */

export default EditProduct;