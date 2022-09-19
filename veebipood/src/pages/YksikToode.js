import { useParams } from "react-router-dom";

function YksikToode() {
  const { tooteNimi } = useParams();  // localhost:3000/toode/:tooteNimi/:tooteHind/:kategooria
  //const params = useParams();       //    params.tooteNimi         params.kategooria
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  // localStorage-s ei leita, on null
  // undefined      
  const leitudToode = tooted.find(element => element.nimi.toLowerCase().replaceAll(" ","-") === tooteNimi);

  //console.log(params);
  // ??
  // leitudToode !== undefined ?  <div>LeitudToode</div> :  <div>Ei leitud</div>

  return ( 
    <div>
        { leitudToode !== undefined &&
        <div>
          <div>{leitudToode.nimi}</div>
          <div>{leitudToode.hind}</div>
        </div>}
        { leitudToode === undefined &&
        <div>
          Toodet ei leitud!
        </div>}
    </div> );
}

export default YksikToode;