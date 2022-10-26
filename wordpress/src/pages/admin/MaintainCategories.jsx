import { useEffect, useRef, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

// hook:
// 1) alati use eesliidesega
// 2) alati importida
// 3) alati funktsioon - kõikide hookide taga on sulud
// 4) hook ei saa olla dünaamiline (ma ei tee talle if-i)
// 5) hook ei saa olla funktsiooni sees (alati top-level)

function MaintainCategories() {
  const [categories, setCategories] = useState([]);                           //    !!!!!!!!!!
  const dbUrl = "https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const idRef = useRef(); // import useRef-st!
  const nameRef = useRef();

  useEffect(() => {
    fetch(dbUrl)
      .then(res => res.json())
      .then(json => {
        setCategories(json || []); // null
      })
  }, []);

  const addCategory = () => {
    const newCategory = {
      "id": idRef.current.value,
      "name": nameRef.current.value
    }
    categories.push(newCategory);
    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(categories)
    }).then(() => {
      idRef.current.value = "";
      nameRef.current.value = "";
      setCategories(categories.slice());
    })
  }

  const remove = (index) => {
    categories.splice(index,1); 
    
    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(categories)
    }).then(() => {
      setCategories(categories.slice());
    })
  }

  return ( 
  <div>
    <AdminNavbar />

    <label>ID</label> <br />
    <input ref={idRef} type="text" /> <br />
    <label>Nimi</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <button onClick={addCategory}>Lisa kategooria</button>

    {categories.map((element,index) => 
      <div key={index}>
        <div>{element.name}</div>
        <button onClick={() => remove(index)}>x</button>
      </div>)}
  </div> );
}

export default MaintainCategories;