import { useRef, useState } from "react";
// import andjateFail from "../nimed.json";

function Poed() {
  const [poed, uuendaPoed] = useState([
    {nimi: "Õismäe", aeg: "10-22"}, 
    {nimi: "Kristiine", aeg: "7-22"}, 
    {nimi: "Lasnamäe", aeg: "9-22"},
    {nimi: "Telliskivi", aeg: "9-23"},
    {nimi: "Kesklinn", aeg: "8-22"},
    {nimi: "Ülemiste", aeg: "9-22"},
    {nimi: "Xasdasdasd", aeg: "9-22"},
    {nimi: "Saku", aeg: "7-19"}
  ]);
  // const [sortAZ, setSortAZ] = useState(false);
  const poodRef = useRef();
  const aegRef = useRef();    //'aegRef' is not defined  no-undef

  // poed = poed.map(pood => pood.charAt(0)) // ["K", "M".....]

  const lisaUusPood = () => {
    poed.push({nimi: poodRef.current.value, aeg: aegRef.current.value}); // lisab kõige lõppu juurde
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
    
    // võtab vasakpoolse  ja parempoolse ja võrdleb neid omavahel
    //                     
    poed.sort((a, b) => a.nimi.localeCompare(b.nimi));
    // console.log(poed);
    uuendaPoed(poed.slice());     // poed   -> uuendaPoed ->   poed  // xxxx
        // .slice() <--- koopia tegemiseks     //     poed2  -> uuendaPoed -> poed
  }

  const filtreeri = () => {
    // {nimi: "Kristiine", aeg: "9-22"}  -> "Kristiine".includes("mäe") -> false
    // {nimi: "Lasnamäe", aeg: "9-22"}  -> "Lasnamäe".includes("mäe") -> true
    const result = poed.filter(e => e.nimi.includes("mäe"));
    uuendaPoed(result);
  }

  const filtreeriAeg = () => {
    // {nimi: "Kristiine", aeg: "9-22"}  -> "Kristiine".includes("mäe") -> false
    // {nimi: "Lasnamäe", aeg: "9-22"}  -> "Lasnamäe".includes("mäe") -> true
    // "9-22".split("-")   ---> ["9","22"]  ---> "9" ---> 9       <    9
    const result = poed.filter(e => Number(e.aeg.split("-")[0]) < 9);
    uuendaPoed(result);
  }

  // palun selgita mis vahe on split, splice, slice
  // split tükeldab sõnalise muutuja array-ks
  // splice võimaldab kustutada array-st ühte või enamat elementi + juurde lisada array keskele
  // slice teeb koopia array-st + võtab mõne tüki array keskelt

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
      <label>Nimi</label> <br />
      <input ref={poodRef} type="text" /> <br />
      <label>Lahtioleku (sisesta kujul "0-0")</label> <br />
      <input ref={aegRef} type="text" /> <br />
      <button onClick={lisaUusPood}>Lisa</button>
      <br />
      <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
      <button onClick={filtreeri}>Jäta alles "mäe"-d sisaldavad</button>
      <button onClick={filtreeriAeg}>Jäta alles varem kui 9 avanevad</button>
      <div>Poode on {poed.length} tk</div>
      {poed.map((pood,index) => 
        <div key={pood.nimi}>
            <span>{pood.nimi} </span>
            <span>{pood.aeg}</span>
            <button onClick={() => kustuta(index)}>x</button> 
        </div>)}
    </div> 

    // Objects are not valid as a React child (found: object with keys {nimi, aeg})
    // {pood.nimi}
    
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