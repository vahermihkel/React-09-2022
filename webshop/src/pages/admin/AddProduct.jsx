import AdminNavbar from "../../components/AdminNavbar";
import { useEffect, useRef, useState } from "react";

function AddProduct() {
  const [products, setProducts] = useState([]);
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
      .then(json => setProducts(json))
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

  return ( 
    <div>
      <AdminNavbar />
      <label>ID</label> <br />
      <input ref={idRef} type="number" /> <br />
      <label>Name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Price</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Image</label> <br />
      <input ref={imageRef} type="text" /> <br />
      <label>Category</label> <br />
      <input ref={categoryRef} type="text" /> <br />
      <label>Description</label> <br />
      <input ref={descriptionRef} type="text" /> <br />
      <label>Active</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <button onClick={addNewProduct}>Add new</button>
    </div> );
}

export default AddProduct;