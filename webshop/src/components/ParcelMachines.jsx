import { useEffect, useRef, useState } from "react";

function ParcelMachines(props) {
  const [parcelMachines, setParcelMachines] = useState([]);

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => {
        json = json.filter(element => element.A0_NAME === "EE");
        setParcelMachines(json);
      })
  }, []);

  const pmRef = useRef(); // <- useRef import ka

  const pmChanged = () => {
    // console.log(event.target.value)
    const parcelMachineFound = parcelMachines.find(element => element.NAME === pmRef.current.value);
    props.updatePM(parcelMachineFound);
  }

  return ( 
    <>
      { props.cart.length > 0 && <select ref={pmRef} onChange={pmChanged}>
        { parcelMachines.map(element => <option key={element.NAME}>{element.NAME}</option>) }
      </select>}
    </> );
}

export default ParcelMachines;