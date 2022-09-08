import { useRef } from "react";

function Seaded() {
  const telRef = useRef();
  const addressRef = useRef();
  const defaultTelephone = localStorage.getItem("tel");
  const defaultAddress = localStorage.getItem("address");

  const uuendaSeaded = () => {
    localStorage.setItem("tel", telRef.current.value);  // localStorage.getItem("tel");
    localStorage.setItem("address", addressRef.current.value);  // localStorage.getItem("address");
  }

  // telRef.current.value
  // document.getElementById("telephone").value // <--- sest käib kõik failid läbi
  //                1. efektiivsus            2. kui on mitu sarnast ID-d, siis leiab esimese

  return ( 
    <div>
      <label>Telefoninumber</label> <br />
      <input ref={telRef} defaultValue={defaultTelephone} type="text" /> <br />
      <label>Aadress</label> <br />
      <input ref={addressRef} defaultValue={defaultAddress}  type="text" /> <br />
      <button onClick={uuendaSeaded}>Sisesta</button>
    </div>
   );
}

export default Seaded;