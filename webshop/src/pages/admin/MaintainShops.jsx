import { useEffect, useRef, useState } from "react";

function MaintainShops() {
  const [shops, setShops] = useState([]);
  const shopRef = useRef();
  const openTimeRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const dbUrl = "https://react-09-22-default-rtdb.europe-west1.firebasedatabase.app/shops.json";

  useEffect(() => {
    fetch(dbUrl)
      .then(response => response.json())
      .then(responseBody => setShops(responseBody || []));
  },[]);
  
  const addShop = () => {
    const newShop = {
      name: shopRef.current.value,
      openTime: openTimeRef.current.value,
      latitude: latitudeRef.current.value,
      longitude: longitudeRef.current.value,
    }
    shops.push(newShop);
    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(shops)
    })
    setShops(shops.slice());
    shopRef.current.value = "";
    openTimeRef.current.value = "";
    latitudeRef.current.value = "";
    longitudeRef.current.value = "";
  }

  const deleteShop = (index) => {
    shops.splice(index,1);
    setShops(shops.slice());
    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(shops)
    })
  }

  return (
    <div>
      <label>Poe nimi</label> <br />
      <input ref={shopRef} type="text" /> <br />
      <label>Poe lahtiolekuaeg</label> <br />
      <input ref={openTimeRef} type="text" /> <br />
      <label>Poe laiuskraad</label> <br />
      <input ref={latitudeRef} type="text" /> <br />
      <label>Poe pikkuskraad</label> <br />
      <input ref={longitudeRef} type="text" /> <br />
      <button onClick={addShop}>Lisa</button> <br />
      {shops.map((element,index) => 
      <div>
        <span>{element.name}</span> <br />
        <span>{element.openTime}</span> <br />
        <span>{element.latitude}</span> <br />
        <span>{element.longitude}</span> <br />
        <button onClick={() => deleteShop(index)}>X</button>
      </div>)}
    </div>)
}

export default MaintainShops;