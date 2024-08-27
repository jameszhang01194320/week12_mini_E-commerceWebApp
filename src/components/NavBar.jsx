import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavBar({ isLoggedIn, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="e-commerce.png" alt="e-comm logo" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register">
              Register
            </Nav.Link>
            <Nav.Link as={NavLink} to="/customerlist">
              Customers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productlist">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/addproduct">
              Add Products
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link as={NavLink} to="/" onClick={onLogout}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
