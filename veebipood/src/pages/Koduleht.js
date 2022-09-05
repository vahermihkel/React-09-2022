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

  return ( 
    <div>
      <div>Olen kodulehe lehel</div>
      <button>Nupp</button>
      <br /><br />
      <button onClick={v2henda}>-</button>
      <span>{kogus}</span>
      <button onClick={suurenda}>+</button>
    </div> );
}

export default Koduleht;