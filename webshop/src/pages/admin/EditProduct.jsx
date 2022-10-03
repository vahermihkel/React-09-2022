import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import productsFromFile from "../../data/products.json";

function EditProduct() {
  const { id } = useParams();      // element / product / e
  const productFound = productsFromFile.find(element => element.id === Number(id));
  const productIndex = productsFromFile.indexOf(productFound);

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

    productsFromFile[productIndex] = newProduct;
    navigate("/admin/maintain-products");
  }

  return (                                                          
    <div>
      <AdminNavbar />
      <label>ID</label> <br />
      <input ref={idRef} defaultValue={productFound.id} type="number" /> <br />
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
      <button onClick={updateProduct}>Muuda</button>
    </div> );
}

export default EditProduct;