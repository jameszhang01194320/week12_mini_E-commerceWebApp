import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap"; // 引入 Container 和 Button 组件
import "../App.css"; // 确保路径正确的导入

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showAllDetails, setShowAllDetails] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://127.0.0.1:5000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const selectProduct = (productId) => {
    setSelectedProductId((prevSelectedProductId) =>
      prevSelectedProductId === productId ? null : productId
    );
  };

  const toggleView = () => {
    setShowAllDetails((prevShowAllDetails) => !prevShowAllDetails);
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`http://127.0.0.1:5000/products/${productId}`)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };

  return (
    <Container className="mt-5"> {/* 使用 Container 包裹内容 */}
      <h3>Products</h3>
      <button onClick={toggleView}>
        {showAllDetails ? "Show Only Names" : "Show All Details"}
      </button>
      <ul>
        {products.map((product) => (
          <li key={product.id} onClick={() => selectProduct(product.id)}>
            <b className="clickable">{product.name}</b>
            <br />
            {showAllDetails || selectedProductId === product.id ? (
              <>
                {product.description}
                <br />
                ${product.price}
                <br />
                Stock: {product.stock_quantity}
                <br />
              </>
            ) : null}
            <Button
              variant="warning"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(product.id);
              }}
              className="custom-delete-button"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default ProductsList;
