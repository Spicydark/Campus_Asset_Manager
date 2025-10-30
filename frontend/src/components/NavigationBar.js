import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const NavigationBar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          Campus Asset Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/assets">
              Assets
            </Nav.Link>
            <Nav.Link as={Link} to="/requests">
              Requests
            </Nav.Link>
            {isAdmin() && (
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <NavDropdown
              title={
                <span>
                  <FaUser className="me-2" />
                  {user?.username} ({user?.role})
                </span>
              }
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={handleLogout}>
                <FaSignOutAlt className="me-2" />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
