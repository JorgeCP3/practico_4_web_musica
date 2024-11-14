import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaAlbums = () => {
    const [listaAlbums, setListaAlbums] = useState([]);

    useEffect(() => {
        getListaAlbums();
        document.title = "Lista de Álbumes";
    }, []);

    const getListaAlbums = async () => {
        axios.get("http://localhost:3000/albums")
        .then(res => {
            setListaAlbums(res.data);
        }).catch(err => {
            console.error(err);
        });
    };

    const eliminar = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este álbum?");
        if (!confirmar) {
            return;
        }
        axios.delete(`http://localhost:3000/albums/${id}`)
        .then(() => {
            getListaAlbums();
        }).catch(err => {
            console.error(err);
        });
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
                                    <h2>Lista de Álbumes</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Artista</th>
                                            <th>Canciones</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaAlbums.map(album => (
                                            <tr key={album.id}>
                                                <td>
                                                <img 
                                                        src={`http://localhost:3000/uploads/albums/${album.id}.png`} 
                                                        alt={`Imagen del tipo ${album.nombre}`} 
                                                        width="100"
                                                        height="100"
                                                    />
                                                </td>
                                                <td>{album.id}</td>
                                                <td>{album.nombre}</td>
                                                <td>{album.artista?.nombre || "Sin artista"}</td>
                                                <td>{album.canciones ? album.canciones.length : 0}</td>
                                                <td>
                                                    <Link className="btn btn-success" to={`/admin/albums/${album.id}/upload`}>Cambiar Imagen</Link>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary me-2" to={`/admin/albums/${album.id}`}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => eliminar(album.id)}>
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

export default ListaAlbums;
