import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaCanciones = () => {
    const [listaCanciones, setListaCanciones] = useState([]);
    const [listaAlbumes, setListaAlbumes] = useState([]);

    useEffect(() => {
        getListaCanciones();
        getListaAlbumes();
        document.title = "Lista de Canciones";
    }, []);

    const getListaCanciones = async () => {
        axios.get("http://localhost:3000/canciones")
        .then(res => {
            setListaCanciones(res.data);
        }).catch(err => {
            console.error(err);
        });
    };

    const getListaAlbumes = async () => {
        axios.get("http://localhost:3000/albums")
        .then(res => {
            setListaAlbumes(res.data);
        }).catch(err => {
            console.error(err);
        });
    };

    const eliminar = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta canción?");
        if (!confirmar) {
            return;
        }
        axios.delete(`http://localhost:3000/canciones/${id}`)
        .then(() => {
            getListaCanciones();
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
                                    <h2>Lista de Canciones</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <td>Cancion</td>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Álbum</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaCanciones.map(cancion => {
                                            const album = listaAlbumes.find(album => 
                                                album.canciones.some(c => c.id === cancion.id)
                                            );

                                            return (
                                                <tr key={cancion.id}>
                                                    <td>
                                                        <audio controls>
                                                            <source src={`http://localhost:3000/uploads/mp3/${cancion.id}.mp3`} type="audio/mpeg"/>
                                                        </audio>
                                                    </td>
                                                    <td>{cancion.id}</td>
                                                    <td>{cancion.nombre}</td>
                                                    <td>{album ? album.nombre : "Sin álbum"}</td>
                                                    <td>
                                                    <Link className="btn btn-success" to={`/admin/canciones/${cancion.id}/upload`}>Cambiar Cancion</Link>
                                                </td>
                                                    <td>
                                                        <Link className="btn btn-primary me-2" to={`/admin/canciones/${cancion.id}`}>
                                                            Editar
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => eliminar(cancion.id)}>
                                                            Eliminar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default ListaCanciones;
