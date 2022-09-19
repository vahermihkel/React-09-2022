import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import HaldaTooteid from './pages/HaldaTooteid';
import Koduleht from './pages/Koduleht';
import LisaToode from './pages/LisaToode';
import Meist from './pages/Meist';
import MuudaToode from './pages/MuudaToode';
import Ostukorv from './pages/Ostukorv';
import Poed from './pages/Poed';
import Seaded from './pages/Seaded';
import YksikToode from './pages/YksikToode';

function App() {
  return (
    <div className="App">
      <button className="nupp">mm</button>
      <img className="pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" />
    
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="/koduleht">
        <button>Koduleht</button>
      </Link>
      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>
      <Link to="/meist">
        <button>Meist</button>
      </Link>
      <Link to="/lisa-toode">
        <button>Lisa toode</button>
      </Link>
      <Link to="/seaded">
        <button>Seaded</button>
      </Link>
      <Link to="/poed">
        <button>Poed</button>
      </Link>
      <Link to="/halda-tooteid">
        <button>Halda tooteid</button>
      </Link>

{/* path="" <-- mis järgneb localhost:3000le
localhost:3000/ostukorv    -----     <div>Olen ostukorvis</div> */}
      <Routes>
        <Route path="" element={ <Avaleht /> } />
        <Route path="koduleht" element={ <Koduleht /> } />
        <Route path="ostukorv" element={ <Ostukorv /> } />
        <Route path="meist" element={ <Meist /> } />
        <Route path="lisa-toode" element={ <LisaToode /> } />
        <Route path="halda-tooteid" element={ <HaldaTooteid /> } />
        <Route path="seaded" element={ <Seaded /> } />
        <Route path="poed" element={ <Poed /> } />
        <Route path="toode/:tooteNimi" element={ <YksikToode /> } />
        <Route path="muuda/:tooteNimi" element={ <MuudaToode /> } />
        <Route path="*" element={ <div>404</div> } />
      </Routes>
    </div>
  );
}

export default App;

// tumesinine - tag mida ei pea importima (HTML-s olemas)
// roheline - suure tähega ja selle peab faili kõige üleval importima
// helesinine - HTML atribuut, saan väärtust anda läbi võrdusmärgi
// punane/oranž - jutumärkides väärtus
// valge - väljanäidatav tekst