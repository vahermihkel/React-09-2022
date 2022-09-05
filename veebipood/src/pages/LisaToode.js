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
      uuendaS6num("Tühja nimega ei saa uut toodet lisada!")
    } else {
      uuendaS6num("Uus toode lisatud!")
    }
  }

  return ( 
    <div>
      <div>{s6num}</div>
      <input ref={nimiRef} type="text" />
      <button onClick={lisaUusToode}>Lisa uus toode</button>
    </div> );
}

export default LisaToode;