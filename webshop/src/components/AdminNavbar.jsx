import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function AdminNavbar() {
  const { t } = useTranslation();

  // roheline - success
  // punane - danger
  // kollane - warning
  // hall - secondary
  return ( 
    <div>
      <NavLink to="/admin/add-product" className={({isActive}) => (isActive ? "active-nav" : undefined)}>
        <Button variant="success">{t('admin.add-product')}</Button>
      </NavLink>
      <NavLink to="/admin/maintain-products" className={({isActive}) => (isActive ? "active-nav" : undefined)}>
        <Button>{t('admin.maintain-products')}</Button>
      </NavLink>
      <NavLink to="/admin/maintain-categories" className={({isActive}) => (isActive ? "active-nav" : undefined)}>
        <Button>{t('admin.maintain-categories')}</Button>
      </NavLink>
      <NavLink to="/admin/maintain-shops" className={({isActive}) => (isActive ? "active-nav" : undefined)}>
        <Button>{t('admin.maintain-shops')}</Button>
      </NavLink>

    </div>
   );
}

export default AdminNavbar;