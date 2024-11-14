import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/dashboard">MusicApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <>
                            <NavDropdown title="Artistas" id="artistas-dropdown">
                                <Link className="dropdown-item" to="/admin/artistas">Lista de Artistas</Link>
                                <Link className="dropdown-item" to="/admin/artistas/nuevo">Crear Artista</Link>
                            </NavDropdown>
                            <NavDropdown title="Álbumes" id="albums-dropdown">
                                <Link className="dropdown-item" to="/admin/albums">Lista de Álbumes</Link>
                                <Link className="dropdown-item" to="/admin/albums/nuevo">Crear Álbum</Link>
                            </NavDropdown>
                            <NavDropdown title="Canciones" id="canciones-dropdown">
                                <Link className="dropdown-item" to="/admin/canciones">Lista de Canciones</Link>
                                <Link className="dropdown-item" to="/admin/canciones/nuevo">Crear Canción</Link>
                            </NavDropdown>
                            <NavDropdown title="Géneros" id="generos-dropdown">
                                <Link className="dropdown-item" to="/admin/generos">Lista de Géneros</Link>
                                <Link className="dropdown-item" to="/admin/generos/nuevo">Crear Género</Link>
                            </NavDropdown>
                        </>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;
