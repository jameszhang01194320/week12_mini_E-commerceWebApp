import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AddProduct = () => {
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/products', inputs);
      navigate('/productlist'); // success, redirect to product list
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Add New Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            required
            placeholder="Enter product price"
          />
        </Form.Group>
        <Form.Group controlId="formStockQuantity">
          <Form.Label>Stock Quantity</Form.Label>
          <Form.Control
            type="number"
            name="stock_quantity"
            value={inputs.stock_quantity}
            onChange={handleChange}
            required
            placeholder="Enter stock quantity"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Add Product
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{JSON.stringify(error)}</Alert>}
    </Container>
  );
};

export default AddProduct;
