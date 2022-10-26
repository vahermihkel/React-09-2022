import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import CartSumContext from '../store/CartSumContext';
import AuthContext from '../store/AuthContext';

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const cartSumCtx = useContext(CartSumContext);
  const authCtx = useContext(AuthContext);

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  }

  // const login = () => {
  //   authCtx.setIsLoggedIn(true);
  // }

  const logout = () => {
    authCtx.logout();
  }

  return ( 
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
          <Nav className="me-auto">
            { authCtx.isLoggedIn === true && <Nav.Link as={Link} to="admin">{t('nav.admin')}</Nav.Link>}
            <Nav.Link as={Link} to="cart">{t('nav.cart')}</Nav.Link>
            <Nav.Link as={Link} to="about-us">{t('nav.about-us')}</Nav.Link>
            <Nav.Link as={Link} to="shops">{t('nav.shops')}</Nav.Link>
            { authCtx.isLoggedIn === false && <Nav.Link as={Link} to="login">Logi sisse</Nav.Link>}
            { authCtx.isLoggedIn === false && <Nav.Link as={Link} to="signup">Registreeru</Nav.Link>}
            { authCtx.isLoggedIn === true && <Nav.Link onClick={logout}>Logi välja</Nav.Link>}
          </Nav>
          <div>{cartSumCtx.cartSum}</div>
          <img className="lang" onClick={() => changeLang("en")} src="/images/english.png" alt="" />
          <img className="lang" onClick={() => changeLang("ee")} src="/images/estonia.png"  alt="" />
          <img className="lang" onClick={() => changeLang("ru")} src="/images/russia.png"  alt="" />
        </Container>
      </Navbar>
   );
}

export default NavigationBar;