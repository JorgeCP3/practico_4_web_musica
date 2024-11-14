import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaArtistas = () => {
    const [listaArtistas, setListaArtistas] = useState([]);
    const [listaGeneros, setListaGeneros] = useState([]);
    const [listaAlbums, setListaAlbums] = useState([]);

    useEffect(() => {
        getListaGeneros();
        getListaArtistas();
        getListaAlbums();
        document.title = "Lista de Artistas";
    }, []);

    const getListaGeneros = async () => {
        axios.get("http://localhost:3000/generos")
        .then(res => {
            setListaGeneros(res.data);
        }).catch(err => {
            console.error(err);
        });
    };

    const getListaArtistas = async () => {
        axios.get("http://localhost:3000/artistas")
        .then(res => {
            setListaArtistas(res.data);
        }).catch(err => {
            console.error(err);
        });
    };

    const getListaAlbums = async () => {
        axios.get("http://localhost:3000/albums")
        .then(res => {
            setListaAlbums(res.data);
        }).catch(err => {
            console.error(err);
        });
    };

    const eliminar = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este artista?");
        if (!confirmar) {
            return;
        }
        axios.delete(`http://localhost:3000/artistas/${id}`)
        .then(() => {
            getListaArtistas();
        }).catch(err => {
            console.error(err);
        });
    };

    const obtenerGenero = (artistaId) => {
        const genero = listaGeneros.find(g => g.artistas.some(a => a.id === artistaId));
        return genero ? genero.nombre : "Sin género";
    };

    const obtenerCantidadAlbums = (artistaId) => {
        return listaAlbums.filter(album => album.artista.id === artistaId).length;
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Artistas</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Género</th>
                                            <th>Álbumes</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaArtistas.map(artista => (
                                            <tr key={artista.id}>
                                                <td>
                                                <img 
                                                        src={`http://localhost:3000/uploads/artistas/${artista.id}.png`} 
                                                        alt={`Imagen del tipo ${artista.nombre}`} 
                                                        width="100"
                                                        height="100"
                                                    />
                                                </td>
                                                <td>{artista.id}</td>
                                                <td>{artista.nombre}</td>
                                                <td>{obtenerGenero(artista.id)}</td>
                                                <td>{obtenerCantidadAlbums(artista.id)}</td>
                                                <td>
                                                    <Link className="btn btn-success" to={`/admin/artistas/${artista.id}/upload`}>Cambiar Imagen</Link>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary me-2" to={`/admin/artistas/${artista.id}`}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => eliminar(artista.id)}>
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListaArtistas;
