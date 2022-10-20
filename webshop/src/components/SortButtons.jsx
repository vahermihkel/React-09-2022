
function SortButtons(props) {
  const sortAZ = () => {
    props.categoryProducts.sort((a,b)=> a.name.localeCompare(b.name));
    props.setProducts(props.categoryProducts.slice(0,30));
    props.setActivePage(1);
  }

  const sortZA = () => {
    props.categoryProducts.sort((a,b)=> b.name.localeCompare(a.name));
    props.setProducts(props.categoryProducts.slice(0,30));
    props.setActivePage(1);
  }

  const sortPriceAsc = () => {
    props.categoryProducts.sort((a,b)=> a.price - b.price);
    props.setProducts(props.categoryProducts.slice(0,30));
    props.setActivePage(1);
  }

  const sortPriceDesc = () => {
    props.categoryProducts.sort((a,b)=> b.price - a.price);
    props.setProducts(props.categoryProducts.slice(0,30));
    props.setActivePage(1);
  }

  return ( 
  <>
      <button onClick={sortAZ}>Sorteeri A-Z</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
      <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
  </> );
}

export default SortButtons;