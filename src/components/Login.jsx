import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Login = ({ onLogin }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
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
      // 这里模拟登录成功
      await axios.post('http://127.0.0.1:5000/login', inputs); 
      onLogin(); // 更新登录状态
      navigate('/'); // 登录成功后重定向到主页
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{JSON.stringify(error)}</Alert>}
    </Container>
  );
};

export default Login;
