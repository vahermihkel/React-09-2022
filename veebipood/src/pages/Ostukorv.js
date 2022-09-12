import { useState } from "react";

function Ostukorv() {
  // ["Nobe","Tesla","Nobe","Nobe","BMW"]
  const [ostukorv, uuendaOstukorv] = useState(JSON.parse(sessionStorage.getItem("ostukorv")) || []);


  const kustuta = (index) => {
    ostukorv.splice(index,1);
    sessionStorage.setItem("ostukorv", JSON.stringify(ostukorv)); // uuendab salvestust
    uuendaOstukorv(ostukorv.slice()); // uuendab HTMLi
  }

  const tyhjenda = () => {
    // sessionStorage.setItem("ostukorv", JSON.stringify([]));
    sessionStorage.setItem("ostukorv", "[]");
    uuendaOstukorv([]);
  }

  // const tyhjenda2 = () => {
  //   ostukorv.splice(0); // --> []
  //   sessionStorage.setItem("ostukorv", JSON.stringify(ostukorv)); 
  //   uuendaOstukorv(ostukorv.slice());
  // }

  // element <- 1 tk array-st  massiivist   listist
  // e
  // ostukorviEse / cartProduct
  return ( 
    <div>
      { ostukorv.length > 0 && <button onClick={tyhjenda}>Tühjenda</button> }
      { ostukorv.length > 1 && <div>Ostukorvis on {ostukorv.length} eset</div> }
      { ostukorv.length === 1 && <div>Ostukorvis on {ostukorv.length} ese</div> }
      { ostukorv.length === 0 && <div>Ostukorv on tühi</div> }
      { ostukorv.map( (element,index) => 
        <div key={index}>
          <span>{element} </span>
          <button onClick={() => kustuta(index)}>x</button>
        </div>  
      )}
    </div> );
}

export default Ostukorv;