
// simple react snippets

import { useState } from "react";

// ffc + enter
function Meist() {
  const telephone = localStorage.getItem("tel");
  const address = localStorage.getItem("address");
  const [showTel, setShowTel] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  return ( 
    <div>
      <div>Meie telefon:
        { showTel === false && <button onClick={() => setShowTel(true)}>Näita telefoni</button>} 
        { showTel === true && <span> {telephone}</span> }
      </div>

      <div>Meie aadress: 
        { showAddress === false && <button onClick={() => setShowAddress(true)}>Näita aadressi</button>} 
        { showAddress === true && <span> {address}</span> }
      </div>
    </div> );
}

export default Meist;