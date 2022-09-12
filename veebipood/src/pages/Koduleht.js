// delete -> vasakule
// tab - paremale

import { useState } from "react";

// bloki liigutamiseks - aktiveerin + tab
// tagasi bloki liigutamine - aktiiverin + shift + tab

// div on alati 1 rida, p on ka 1 rida
// ülejäänud kui nad mahuvad üksteise kõrvale, siis nad ka pannakse üksteise kõrvale

// teksti sisestamiseks variandid: div, p, h1, h2, h3, span

function Koduleht() {
  // const eesliidese abil kuulutan välja uue muutuja mille nimi on vahetult pärast consti
  // väärtus on jutumärkide järel
  // semikoolon ei ole javascriptis vajalik
  // semikoolon tähistab rea lõppu
  const [kogus, uuendaKogus] = useState(3);
  const [keel, uuendaKeel] = useState(localStorage.getItem("keel") || "est");

  // alt gr + <

  // vasakpoolne on muutuja
  // parempoolne on funktsioon mille abil saan
  //       vasakpoolset muutujat muuta

  // vasakpool läheb HTMLi  <p>{vasak}</p>
  // parem pool läheb JavaScripti funktsiooni
  //                  parem(UUS_VÄÄRTUS)

  const v2henda = () => {
    // kogus = 3; <-- tavalises JavaScriptises
    uuendaKogus( kogus - 1 );
  }

  const suurenda = () => {
    uuendaKogus( kogus + 1 );
  }

  // const muudaKeelEST = () => {
  //   uuendaKeel("est");
  //   localStorage.setItem("keel","est");
  // }

  // const muudaKeelENG = () => {
  //   uuendaKeel("eng");
  //   localStorage.setItem("keel","eng");
  // }

  // const muudaKeelRUS = () => {
  //   uuendaKeel("rus");
  //   localStorage.setItem("keel","rus");
  // }

  const muudaKeel = (uusKeel) => {
    uuendaKeel(uusKeel);
    localStorage.setItem("keel", uusKeel);
  }

  // parem klõps -> inspect -> Application (Chrome + Edge)     Storage (Firefox)

  return ( 
    <div>
      <div>Olen kodulehe lehel</div>
      <button>Nupp</button>
      <br /><br />
      <button onClick={v2henda}>-</button>
      <span>{kogus}</span>
      <button onClick={suurenda}>+</button>
      <br /><br />
      <button onClick={() => muudaKeel("est")}>Eesti keelseks</button>
      <button onClick={() => muudaKeel("eng")}>To English</button>
      <button onClick={() => muudaKeel("rus")}>Pycckuu</button>
      { keel === "est" && <div>Eesti keelne leht</div>}
      { keel === "eng" && <div>Inglise keelne leht</div>}
      { keel === "rus" && <div>Vene keelne leht</div>}
    </div> );
}

export default Koduleht;
// Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
// onClick={muudaKeel("dasdas")}   <--  () =>   puudu

// tumesinine - uue kuulutamine, liigi andmine - const, function, let
// sinine - minu loodud muutuja
// helesinine - JS enda loodud muutuja
// kollane - funktsioon
// punane/oranž - jutumärkides väärtus

// {} - HTMLs JavaScripti kasutamiseks
// {} - JavaScriptis koodiblokkide loomiseks
// const funktsioon = () => {}        if (true) {} else {}
// [] - useState sees vasak pool ja parem pool
// || - OR märk ;   kui on vasakul pool tühjus, võta parem pool
// && - AND märk ; kui on vasakul pool tõde, tee ka parem pool
// ; - semikoolon ; rea lõpetamiseks
// () => { }   - funktsiooni tähistus JavaScriptis
// () - funktsiooni käimapanemiseks