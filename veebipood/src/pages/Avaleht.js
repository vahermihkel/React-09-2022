import { Link } from "react-router-dom";

function Avaleht() {
  // let tootedLS = localStorage.getItem("tooted");
  // tootedLS = JSON.parse(tootedLS) || [];
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];

                        // Tesla  -->   {nimi: "Tesla", hind: 1}
  const lisaOstukorvi = (klikitudToode) => {
    let ostukorvSS = sessionStorage.getItem("ostukorv");
    ostukorvSS = JSON.parse(ostukorvSS) || [];
    ostukorvSS.push(klikitudToode);
    ostukorvSS = JSON.stringify(ostukorvSS);
    sessionStorage.setItem("ostukorv", ostukorvSS);
  }

    // ["Nobe", "Tesla", "BMW"] --->  [{nimi: "Nobe", hind: 1}, {nimi: "Tesla", hind: 1}, {nimi: "BMW", hind: 1}] 
  return ( 
    <div>
      {tooted.filter(element => element.aktiivsus === true).map(element => 
        <div key={element.nimi}>
          {/* Objects are not valid as a React child (found: object with keys {nimi, hind, aktiivsus}) */}
         {/* <Link to={"/toode/" + element.nimi}> */}
         <Link to={`/toode/${element.nimi.toLowerCase().replaceAll(" ","-")}`}>
            <div>{element.nimi}</div>
            <div>{element.hind}</div>
            <div>{element.aktiivsus + 0}</div>
          </Link>
          <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
        </div>
      )}
    </div> );
}

export default Avaleht;

// .map is not a function <---- kui on mingil muul kujul kui [...]