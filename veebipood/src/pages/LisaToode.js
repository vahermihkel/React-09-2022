import { useRef, useState } from "react";

// ffc
function LisaToode() {
  // HOOK - tähendab use algusega funktsionaalsust
  // importida saamiseks - kirjutades vajutage mingi hetk "enter" ja tuleb automaatselt
  // kui kirjutades ei tule, siis saab kirjutada valmis ja selle sõna lõpus vajutada
  //      ctrl + space
  const nimiRef = useRef();
        // ref läheb HTMLs input sisse
        // ref kuulab mida inputi sisse sisestatakse reaalajas
  const [s6num, uuendaS6num] = useState("Lisa uus toode!");

  const lisaUusToode = () => {
    // logib brauseri konsooli teateid
    console.log(nimiRef.current.value);
    // avan lehel parem klõps -> inspect -> console
    if (nimiRef.current.value === "") {
      uuendaS6num("Tühja nimega ei saa uut toodet lisada!");
    } else {
      uuendaS6num("Uus toode lisatud!");
      // localStorage-sse lisada
      // ["Samsung", "iPhone", "Xiaomi", ...]
      // 1. võta juba olevad localStorage väärtused      .getItem()
      //      .getItem võtab alati sõnalise tüübina väärtused    "["Samsung", "iPhone"]"
      // 2a. võta jutumärgid maha       JSON.parse()
      // 2b. kui on tühjus, võta tühi massiiv
      // 3. lisa üks juurde           .push()
      // 4. pane jutumärgid tagasi talle    JSON.stringify()
      // 5. pane localStorage-sse tagasi    .setItem()
      // ["Samsung", "iPhone"]
      let tootedLS = localStorage.getItem("tooted");
            console.log(tootedLS); // null   ----      "["Nobe"]"
            console.log(typeof tootedLS); // object      string
      tootedLS = JSON.parse(tootedLS) || []; 
            console.log(tootedLS);  // []              ["Nobe"]
            console.log(typeof tootedLS); // object     object
      tootedLS.push(nimiRef.current.value);
            console.log(tootedLS); // ["Nobe"]         ["Nobe", "Tesla"]
            console.log(typeof tootedLS); // object     object
      tootedLS = JSON.stringify(tootedLS);
            console.log(tootedLS); // "["Nobe"]"       "["Nobe", "Tesla"]"
            console.log(typeof tootedLS); // string     string
      localStorage.setItem("tooted",tootedLS);
    }
  }

  // .push is not a function
  // .map is not a function
  // Teeme valele tüübile seda funktsiooni

  //     key     |          value
  //   "tooted"  |    "["adasd","dasdas"]"

  return ( 
    <div>
      <div>{s6num}</div>
      <input ref={nimiRef} type="text" />
      <button onClick={lisaUusToode}>Lisa uus toode</button>
    </div> );
}

export default LisaToode;