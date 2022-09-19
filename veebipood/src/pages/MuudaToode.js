import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const { tooteNimi } = useParams();
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted.find(element => element.nimi.toLowerCase().replaceAll(" ","-") === tooteNimi);
  // const index = tooted.findIndex(element => element.nimi.toLowerCase().replaceAll(" ","-") === tooteNimi);
  //[{name: 'apples', quantity: 2},
    // {name: 'bananas', quantity: 0},
    // {name: 'cherries', quantity: 5}].indexOf({name: 'cherries', quantity: 5})
  const index = tooted.indexOf(leitudToode);
  const nimiRef = useRef();
  const hindRef = useRef();
  const aktiivsusRef = useRef();
  const navigate = useNavigate(); // useHistory()

  const uuendaToode = () => {
    // kui panen <form> tagi
    //event.preventDefault(); // default käitumine JavaScriptis on vormi sisestades refresh teha
    // console.log("tere");
    // [{name: 'apples', quantity: 2},
    // {name: 'bananas', quantity: 0},
    // {name: 'cherries', quantity: 5}][2] = {name: "datel", quantity: 4};
    tooted[index] = {
      nimi: nimiRef.current.value, 
      hind: Number(hindRef.current.value), 
      aktiivsus: aktiivsusRef.current.checked
    }
    localStorage.setItem("tooted", JSON.stringify(tooted));
    navigate("/halda-tooteid");      // .push("")
  }

  return ( 
  <div>
    {leitudToode !== undefined && 
      <div>
        <label>Nimi</label> <br />
        <input ref={nimiRef} defaultValue={leitudToode.nimi} type="text" /> <br />
        <label>Hind</label> <br />
        <input ref={hindRef} defaultValue={leitudToode.hind} type="number" /> <br />
        <label>Aktiivsus</label> <br />
        <input ref={aktiivsusRef} defaultChecked={leitudToode.aktiivsus} type="checkbox" /> <br />
        <button onClick={uuendaToode}>Uuenda toode</button>
      </div>}
    {leitudToode === undefined && 
      <div>
        Toodet ei leitud!
      </div>}
  </div> );
}

export default MuudaToode;