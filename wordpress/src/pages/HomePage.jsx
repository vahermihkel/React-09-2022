import { useEffect, useState } from 'react';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Product from '../components/Product';

function HomePage() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const api = new WooCommerceRestApi({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_4c8f2c8b92aefa4b33df8be478e13528787eb67f",
      consumerSecret: "cs_e45336d10786862f37682920989b8b916a4843d3",
      version: "wc/v3",
      axiosConfig: {
        headers: {}
      }
    });
    api.get("products", {
      per_page: 20, // 20 products per page
    })
      .then((response) => {
        // Successful request
        setProducts(response.data);
      })
  }, []);

  return ( 
    <div>
      {products.map((element,index) => 
          <Product key={index} element={element} />
        )}
    </div> );
}

export default HomePage;