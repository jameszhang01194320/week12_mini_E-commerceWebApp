import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import "../App.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/customers");
      setCustomers(response.data);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setErrorMessage("Error fetching customers. Please try again later.");
    }
  };

  const selectCustomer = (customerId) => {
    setSelectedCustomerId((prevSelectedCustomerId) =>
      prevSelectedCustomerId === customerId? null : customerId
    );
  };

  const toggleView = () => {
    setShowAllDetails((prevShowAllDetails) =>!prevShowAllDetails);
  };

  const deleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/customers/${customerId}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer", error);
      setErrorMessage("Error deleting customer. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <h3>Customers</h3>
      <button onClick={toggleView}>
        {showAllDetails? "Show Only Names" : "Show All Details"}
      </button>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} onClick={() => selectCustomer(customer.id)}>
            <b className="clickable">{customer.name}</b>
            <br />
            {showAllDetails || selectedCustomerId === customer.id? (
              <>
                {customer.email}
                <br />
                {customer.phone}
                <br />
              </>
            ) : null}
            <Button
              variant="warning"
              onClick={(e) => {
                e.stopPropagation();
                deleteCustomer(customer.id);
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

export default CustomerList;