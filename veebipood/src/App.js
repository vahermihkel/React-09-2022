import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Koduleht from './pages/Koduleht';
import Meist from './pages/Meist';

function App() {
  return (
    <div className="App">
      <button className="nupp">mm</button>
      <img className="pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" />
    
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>
      <Link to="/meist">
        <button>Meist</button>
      </Link>

{/* path="" <-- mis järgneb localhost:3000le
localhost:3000/ostukorv    -----     <div>Olen ostukorvis</div> */}
      <Routes>
        <Route path="" element={ <Koduleht /> } />
        <Route path="ostukorv" element={ <div>Olen ostukorvis</div> } />
        <Route path="meist" element={ <Meist /> } />
      </Routes>
    </div>
  );
}

export default App;
