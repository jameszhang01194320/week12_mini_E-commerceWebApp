import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import "../App.css";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/products");
      setProducts(response.data);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Error fetching products. Please try again later.");
    }
  };

  const selectProduct = (productId) => {
    setSelectedProductId((prevSelectedProductId) =>
      prevSelectedProductId === productId? null : productId
    );
  };

  const toggleView = () => {
    setShowAllDetails((prevShowAllDetails) =>!prevShowAllDetails);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
      setErrorMessage("Error deleting product. Please try again.");
    }
  };

  const startEditing = (product) => {
    setIsEditing(true);
    setEditedProduct(product);
  };

  const saveEditedProduct = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/products/${editedProduct.id}`,
        editedProduct
      );
      setIsEditing(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving edited product", error);
      setErrorMessage(
        "Error saving edited product. Please check your changes and try again."
      );
    }
  };

  return (
    <Container className="mt-5">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <h3>Products</h3>
      <button onClick={toggleView}>
        {showAllDetails? "Show Only Names" : "Show All Details"}
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={index % 2 === 0? "even-row" : "odd-row"}
            >
              <td>{product.name}</td>
              <td>
                {showAllDetails || selectedProductId === product.id
                 ? product.description
                  : null}
              </td>
              <td>
                {showAllDetails || selectedProductId === product.id
                 ? `$${product.price}`
                  : null}
              </td>
              <td>
                Stock: {showAllDetails || selectedProductId === product.id
                 ? product.stock_quantity
                  : null}
              </td>
              <td>
                {!isEditing || editedProduct.id!== product.id? (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => startEditing(product)}
                    >
                      EDIT
                    </button>
                  </>
                ) : null}
                {isEditing && editedProduct.id === product.id? (
                  <>
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({
                         ...editedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.description}
                      onChange={(e) =>
                        setEditedProduct({
                         ...editedProduct,
                          description: e.target.value,
                        })
                      }
                    />
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({
                         ...editedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                    <input
                      type="number"
                      value={editedProduct.stock_quantity}
                      onChange={(e) =>
                        setEditedProduct({
                         ...editedProduct,
                          stock_quantity: e.target.value,
                        })
                      }
                    />
                    <button
                      className="btn btn-secondary"
                      onClick={saveEditedProduct}
                    >
                      Submit
                    </button>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default ProductsList;