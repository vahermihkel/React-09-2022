import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ThreeDots } from "react-loader-spinner";

function EditProduct() {
  const { id } = useParams(); 
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const productFound = products.find(element => element.id === Number(id));
  const productIndex = products.indexOf(productFound);
  const [loading, setLoading] = useState(true); 
  const [idUnique, setIdUnique] = useState(true);
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(json => setProducts(json || []))
      .finally(() => setLoading(false))

    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json")
      .then(res => res.json())
      .then(json => setCategories(json || []))
  }, []);

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
  }

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
        <select ref={categoryRef} defaultValue={productFound.category}>
          {categories.map(element => <option key={element.id}>{element.name}</option>)}
        </select> <br />
        <label>Description</label> <br />
        <input ref={descriptionRef} defaultValue={productFound.description} type="text" /> <br />
        <label>Active</label> <br />
        <input ref={activeRef} defaultChecked={productFound.active} type="checkbox" /> <br />
        <button disabled={idUnique === false} onClick={updateProduct}>Muuda</button>
      </div>}
      { productFound === undefined && <div>Toodet ei leitud!</div>}
    </div> );
}

export default EditProduct;