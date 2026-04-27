import { NavLink, Outlet } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

export default function AdminLayout({ user, onLogout }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Celluloid Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/admin/obras">
                Obras
              </Nav.Link>
              <Nav.Link as={NavLink} to="/admin/directores">
                Directores
              </Nav.Link>
              <Nav.Link as={NavLink} to="/admin/generos">
                Géneros
              </Nav.Link>
              <Nav.Link as={NavLink} to="/admin/usuarios">
                Usuarios
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title={`${user.name}`} align="end">
                <NavDropdown.Item onClick={onLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};