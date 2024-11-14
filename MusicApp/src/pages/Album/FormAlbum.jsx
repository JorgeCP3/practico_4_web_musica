import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormAlbum = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [artista, setArtista] = useState("");
    const [artistas, setArtistas] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getArtistas();
        if (id) {
            getAlbumById();
        }
    }, [id]);

    const getArtistas = async () => {
        try {
            const res = await axios.get("http://localhost:3000/artistas");
            setArtistas(res.data);
        } catch (err) {
            console.error("Error al obtener artistas:", err);
        }
    };

    const getAlbumById = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/albums/${id}`);
            const album = res.data;
            setNombre(album.nombre);
            setArtista(album.artista?.id || "");
        } catch (err) {
            console.error("Error al obtener álbum:", err);
        }
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const album = {
            nombre,
            artista: artista ? parseInt(artista) : null,
        };

        if (id) {
            editAlbum(album);
        } else {
            insertAlbum(album);
        }
    };

    const insertAlbum = async (album) => {
        try {
            await axios.post("http://localhost:3000/albums", album);
            navigate("/admin/albums");
        } catch (err) {
            console.error("Error al crear el álbum:", err);
        }
    };

    const editAlbum = async (album) => {
        try {
            await axios.put(`http://localhost:3000/albums/${id}`, album);
            navigate("/admin/albums");
        } catch (err) {
            console.error("Error al actualizar el álbum:", err);
        }
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
                                    <h2>{id ? 'Editar Álbum' : 'Agregar Nuevo Álbum'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un nombre.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Artista:</Form.Label>
                                        <Form.Control as="select" value={artista} onChange={(e) => setArtista(e.target.value)} required>
                                            <option value="">Seleccione un artista</option>
                                            {artistas.map(artista => (
                                                <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">Por favor seleccione un artista.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">{id ? "Actualizar" : "Guardar"} Álbum</Button>
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

export default FormAlbum;
