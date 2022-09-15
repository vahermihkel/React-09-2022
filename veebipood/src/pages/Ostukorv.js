import { useState } from "react";

function Ostukorv() {
  // ["Nobe","Tesla","Nobe","Nobe","BMW"] --> 
//[{nimi: "Samsung", hind: 700}, {nimi: "iPhone", hind: 900}, {nimi: "Samsung", hind: 700}] 
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

  const arvutaKogusumma = () => {
    let summa = 0;
// [{nimi: "Samsung", hind: 700}, {nimi: "iPhone", hind: 900}, {nimi: "Samsung", hind: 700}] 
//      {nimi: "Samsung", hind: 700} =>  700  =  0  +  700
//      {nimi: "iPhone", hind: 900}  =>  1600 =  700 + 900
//      {nimi: "Samsung", hind: 700} =>  2500 =  1600 + 700
    ostukorv.forEach(element => summa = summa + element.hind);
    // ostukorv.forEach(element => summa += element.hind);
    return summa;
  }

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
          {/* Error: Objects are not valid as a React child (found: object with keys {nimi, hind, aktiivsus}) */}
          <span>{element.nimi} - </span>
          <span>{element.hind} € </span>
          <button onClick={() => kustuta(index)}>x</button>
        </div>  
      )}
      { ostukorv.length > 0 && <div>Kokku {arvutaKogusumma()}€</div> }
    </div> );
}

export default Ostukorv;