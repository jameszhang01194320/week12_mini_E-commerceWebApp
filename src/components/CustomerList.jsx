import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap"; // 引入 Container 和 Button 组件
import "../App.css"; // 确保路径正确的导入

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showAllDetails, setShowAllDetails] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://127.0.0.1:5000/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const selectCustomer = (customerId) => {
    setSelectedCustomerId((prevSelectedCustomerId) =>
      prevSelectedCustomerId === customerId ? null : customerId
    );
  };

  const toggleView = () => {
    setShowAllDetails((prevShowAllDetails) => !prevShowAllDetails);
  };

  const deleteCustomer = (customerId) => {
    axios
      .delete(`http://127.0.0.1:5000/customers/${customerId}`)
      .then(() => {
        fetchCustomers();
      })
      .catch((error) => {
        console.error("Error deleting customer", error);
      });
  };

  return (
    <Container className="mt-5"> {/* 使用 Container 包裹内容 */}
      <h3>Customers</h3>
      <button onClick={toggleView}>
        {showAllDetails ? "Show Only Names" : "Show All Details"}
      </button>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} onClick={() => selectCustomer(customer.id)}>
             <b className="clickable">{customer.name}</b> {/* 添加 clickable 类 */}
            <br />
            {showAllDetails || selectedCustomerId === customer.id ? (
              <>
                {customer.email}
                <br />
                {customer.phone}
                <br />
              </>
            ) : null}
            <Button
              variant="warning"  // 使用 Bootstrap 的 'danger' 变体（红色按钮）
              onClick={(e) => {
                e.stopPropagation();
                deleteCustomer(customer.id);
              }}
              className="custom-delete-button" // 使用自定义样式
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
