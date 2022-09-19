import { useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooteid() {
  // useState - kui tahan HTMLi uuendada
  //1. kogus - + / -
  //2. s6num - "Lisa uus toode" / "Toode lisatud"
  //3. keel  - "Leht on inglise keelne"
  //4. ostukorv - 
  const dbProducts = JSON.parse(localStorage.getItem("tooted")) || [];
  const [tooted, muudaTooted] = useState(dbProducts);

  const kustuta = (index) => {
    tooted.splice(index,1);
    muudaTooted(tooted.slice());
    localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  const aktiivsed = () => {
    const vastus = tooted.filter(element => element.aktiivsus === true);
    muudaTooted(vastus);
  }

  const k6ik = () => {
    muudaTooted(dbProducts);
  }

  return ( 
    <div>
      <button onClick={aktiivsed}>Näita aktiivseid</button>
      <button onClick={k6ik}>Näita kõiki</button>
      {tooted.map((element,index) => 
        <div key={element.nimi}>
          <div>{element.nimi}</div>
          <div>{element.hind}</div>
          <div>{element.aktiivsus + 0}</div>
          <Link to={`/muuda/${element.nimi.toLowerCase().replaceAll(" ","-")}`}>
            <button>Muuda</button>
          </Link>
          <button onClick={() => kustuta(index)}>Kustuta</button>
        </div>
      )}
    </div> );
}

export default HaldaTooteid;