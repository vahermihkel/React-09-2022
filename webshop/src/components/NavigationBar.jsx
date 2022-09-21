import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function NavigationBar() {
  const { t, i18n } = useTranslation();

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  }

  return ( 
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="admin">{t('nav.admin')}</Nav.Link>
            <Nav.Link as={Link} to="cart">{t('nav.cart')}</Nav.Link>
            <Nav.Link as={Link} to="about-us">{t('nav.about-us')}</Nav.Link>
            <Nav.Link as={Link} to="shops">{t('nav.shops')}</Nav.Link>
          </Nav>
          <img className="lang" onClick={() => changeLang("en")} src={require("../images/english.png")} alt="" />
          <img className="lang" onClick={() => changeLang("ee")} src={require("../images/estonia.png")}  alt="" />
          <img className="lang" onClick={() => changeLang("ru")} src={require("../images/russia.png")}  alt="" />
        </Container>
      </Navbar>
   );
}

export default NavigationBar;