import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormCancion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [albumId, setAlbumId] = useState("");
    const [albums, setAlbums] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getAlbums();
        if (id) {
            getCancionById();
        }
    }, [id]);

    const getAlbums = async () => {
        axios.get("http://localhost:3000/albums")
        .then(res => {
            setAlbums(res.data);
        }).catch(err => {
            console.error(err);
        });
    };

    const getCancionById = async () => {
        axios.get(`http://localhost:3000/canciones/${id}`)
        .then(res => {
            const cancion = res.data;
            setNombre(cancion.nombre);
            setAlbumId(cancion.album?.id || "");
        }).catch(err => {
            console.error(err);
        });
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const cancion = {
            nombre,
            album: albumId ? parseInt(albumId) : null,
        };

        if (id) {
            editCancion(cancion);
        } else {
            insertCancion(cancion);
        }
    };

    const insertCancion = async (cancion) => {
        axios.post("http://localhost:3000/canciones", cancion)
        .then(() => {
            navigate("/admin/canciones");
        }).catch(err => {
            console.error(err);
        });
    };

    const editCancion = async (cancion) => {
        axios.put(`http://localhost:3000/canciones/${id}`, cancion)
        .then(() => {
            navigate("/admin/canciones");
        }).catch(err => {
            console.error(err);
        });
    };

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>{id ? 'Editar Canción' : 'Agregar Nueva Canción'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un nombre.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Álbum:</Form.Label>
                                        <Form.Control as="select" value={albumId} onChange={(e) => setAlbumId(e.target.value)} required>
                                            <option value="">Seleccione un álbum</option>
                                            {albums.map(album => (
                                                <option key={album.id} value={album.id}>{album.nombre}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">Por favor seleccione un álbum.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">{id ? "Actualizar" : "Guardar"} Canción</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormCancion;
