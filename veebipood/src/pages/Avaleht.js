
function Avaleht() {
  // let tootedLS = localStorage.getItem("tooted");
  // tootedLS = JSON.parse(tootedLS) || [];
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];

                        // Tesla
  const lisaOstukorvi = (klikitudToode) => {
    let ostukorvSS = sessionStorage.getItem("ostukorv");
    ostukorvSS = JSON.parse(ostukorvSS) || [];
    ostukorvSS.push(klikitudToode);
    ostukorvSS = JSON.stringify(ostukorvSS);
    sessionStorage.setItem("ostukorv", ostukorvSS);
  }

    // ["Nobe", "Tesla", "BMW"]
  return ( 
    <div>
      {tooted.map(element => 
        <div key={element}>
          <div>{element}</div>
          <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
        </div>
      )}
    </div> );
}

export default Avaleht;

// .map is not a function <---- kui on mingil muul kujul kui [...]