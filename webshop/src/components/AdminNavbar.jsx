import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return ( 
    <div>
      <Link to="/admin/add-product">
        <Button>Add product</Button>
      </Link>
      <Link to="/admin/maintain-products">
        <Button>Maintain products</Button>
      </Link>
      <Link to="/admin/maintain-categories">
        <Button>Maintain categories</Button>
      </Link>
      <Link to="/admin/maintain-shops">
        <Button>Maintain shops</Button>
      </Link>

    </div>
   );
}

export default AdminNavbar;