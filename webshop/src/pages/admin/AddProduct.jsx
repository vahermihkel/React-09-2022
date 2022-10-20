import AdminNavbar from "../../components/AdminNavbar";
import { useEffect, useRef, useState } from "react";
import FileUpload from "../../components/FileUpload";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();

  useEffect(() => {
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(json => setProducts(json || []))

    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json")
      .then(res => res.json())
      .then(json => setCategories(json || []))
  }, []);

  const addNewProduct = () => {
    const newProduct = {
      "id": Number(idRef.current.value),
      "image": imageRef.current.value,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "description": descriptionRef.current.value,
      "category": categoryRef.current.value,
      "active": activeRef.current.checked
    }
    products.push(newProduct);
    fetch("https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: "PUT",
      body: JSON.stringify(products)
    }).then(() => {
      idRef.current.value = "";
      imageRef.current.value = "";
      nameRef.current.value = "";
      priceRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
      activeRef.current.checked = false;
    })
  }

  const [idUnique, setIdUnique] = useState(true);

  const checkIfIdUnique = () => {
    const found = products.find(element => element.id === Number(idRef.current.value));
    if (found === undefined) {
      setIdUnique(true);
    } else {
      setIdUnique(false);
    }
  }

  return ( 
    <div>
      <AdminNavbar />
      { idUnique === false && <div>Sisestatud ID ei ole unikaalne!</div>}
      <label>ID</label> <br />
      <input onChange={checkIfIdUnique} ref={idRef} type="number" /> <br />
      <label>Name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Price</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Image</label> <br />
      {/* <input ref={imageRef} type="text" /> <br /> */}
      <FileUpload />
      <label>Category</label> <br />
      {/* <input ref={categoryRef} type="text" /> <br /> */}
      <select ref={categoryRef}>
        {categories.map(element => <option key={element.id}>{element.name}</option>)}
      </select> <br />
      <label>Description</label> <br />
      <input ref={descriptionRef} type="text" /> <br />
      <label>Active</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <button disabled={idUnique === false} onClick={addNewProduct}>Add new</button>
    </div> );
}

export default AddProduct;