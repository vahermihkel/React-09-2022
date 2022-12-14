import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import Shops from './pages/Shops';
import SingleProduct from './pages/SingleProduct';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainShops from './pages/admin/MaintainShops';
import MaintainCategories from './pages/admin/MaintainCategories';
import NavigationBar from './components/NavigationBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import PaymentCompleted from './pages/PaymentCompleted';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">

      <NavigationBar />
      
      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="cart" element={ <Cart /> } />
        <Route path="about-us" element={ <AboutUs /> } />
        <Route path="shops" element={ <Shops /> } />
        <Route path="products/:id" element={ <SingleProduct /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="signup" element={ <Signup /> } />
        <Route path="tellimus" element={ <PaymentCompleted /> } />
        { authCtx.isLoggedIn === true && <>
          <Route path="admin" element={ <AdminHome /> } />
          <Route path="admin/add-product" element={ <AddProduct /> } />
          <Route path="admin/edit-product/:id" element={ <EditProduct /> } />
          <Route path="admin/maintain-products" element={ <MaintainProducts /> } />
          <Route path="admin/maintain-shops" element={ <MaintainShops /> } />
          <Route path="admin/maintain-categories" element={ <MaintainCategories /> } />
        </>}
        { authCtx.isLoggedIn === false && <>
          <Route path="admin/*" element={ <Navigate to="/login" /> } />
        </>}
        <Route path="*" element={ <div>404 Not Found</div> } />
      </Routes>
    </div>
  );
}

export default App;
