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
      prevSelectedProductId === productId? null : productId
    );
  };

  const toggleView = () => {
    setShowAllDetails((prevShowAllDetails) =>!prevShowAllDetails);
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

  const startEditing = (product) => {
    setIsEditing(true);
    setEditedProduct(product);
  };

  const saveEditedProduct = () => {
    axios
     .put(`http://127.0.0.1:5000/products/${editedProduct.id}`, editedProduct)
     .then(() => {
        setIsEditing(false);
        fetchProducts();
      })
     .catch((error) => {
        console.error("Error saving edited product", error);
      });
  };

  return (
    <Container className="mt-5">
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
              <td>{showAllDetails || selectedProductId === product.id? product.description : null}</td>
              <td>${showAllDetails || selectedProductId === product.id? product.price : null}</td>
              <td>Stock: {showAllDetails || selectedProductId === product.id? product.stock_quantity : null}</td>
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
                    <button className="btn btn-secondary" onClick={saveEditedProduct}>
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