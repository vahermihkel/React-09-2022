import { useRef, useState } from "react";
// import andjateFail from "../nimed.json";

function Poed() {
  const [poed, uuendaPoed] = useState(["Õismäe", "Kristiine", "Lasnamäe"]);
  // const [sortAZ, setSortAZ] = useState(false);
  const poodRef = useRef();

  // poed = poed.map(pood => pood.charAt(0)) // ["K", "M".....]

  const lisaUusPood = () => {
    poed.push(poodRef.current.value); // lisab kõige lõppu juurde
    uuendaPoed(poed.slice()); // HTMLi uuendamiseks
  }

  const sorteeriAZ = () => {
    // if (sortAZ === true) {
    //    poed.sort();
    //    setSortAZ(false);
    // } else {
    //   poed.sort().reverse();
    //   setSortAZ(true);
    // }
    
    poed.sort();
    // console.log(poed);
    uuendaPoed(poed.slice());     // poed   -> uuendaPoed ->   poed  // xxxx
        // .slice() <--- koopia tegemiseks     //     poed2  -> uuendaPoed -> poed
  }

  const filtreeri = () => {
    const result = poed.filter(e => e.includes("mäe"));
    uuendaPoed(result);
  }

  const kustuta = (index) => {
    // JS kõik kustutamised ja kõik muutmised käivad läbi järjekorranumbri
    poed.splice(index,1);       //   .delete(index)     .remove(index)
    uuendaPoed(poed.slice());
  }

  // pood "Kristiine"   index 0
  // pood "Mustamäe"   index 1
  // pood "Kesklinn"   index 2 jnejne
  return ( 
    <div>
      <label>Pood</label>
      <input ref={poodRef} type="text" />
      <button onClick={lisaUusPood}>Lisa</button>
      <br />
      <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
      <button onClick={filtreeri}>Jäta alles "mäe"-d sisaldavad</button>
      <div>Poode on {poed.length} tk</div>
      {poed.map((pood,index) => 
        <div key={pood}>
            <span>{pood} </span>
            <button onClick={() => kustuta(index)}>x</button> 
        </div>)}
    </div> 
    
  //  <div>
  //     <div>Kristiine <button>x</button></div>
  //     <div>Mustamäe <button>x</button></div>
  //     <div>Kesklinn <button>x</button></div>
  //     <div>Lasnamäe <button>x</button></div>
  //     <div>Telliskivi <button>x</button></div>
  //     <div>Õismäe <button>x</button></div>
  //  </div>
    );
}

export default Poed;