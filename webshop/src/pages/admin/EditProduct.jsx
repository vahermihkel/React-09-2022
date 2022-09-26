import { useRef } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import productsFromFile from "../../data/products.json";

function EditProduct() {
  const { id } = useParams();      // element / product / e
  const productFound = productsFromFile.find(element => element.id === Number(id));
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

  // muutmine eesti keelse järgi
  const updateProduct = () => {
    const newProducts = {//..
      // id: idRef.current.value, jne
    }
  }

  return (                                                          
    <div>
      <AdminNavbar />
      { productFound.name }
      { productFound.price }
    </div> );
}

export default EditProduct;