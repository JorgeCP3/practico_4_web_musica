import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormArtista = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [genero, setGenero] = useState("");
    const [generos, setGeneros] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getGeneros();
        if (id) {
            getArtistaById();
        }
    }, [id]);

    const getGeneros = async () => {
        try {
            const res = await axios.get("http://localhost:3000/generos");
            setGeneros(res.data);
        } catch (err) {
            console.error("Error al obtener géneros:", err);
        }
    };

    const getArtistaById = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/artistas/${id}`);
            const artista = res.data;
            setNombre(artista.nombre);
            setGenero(artista.genero?.id || "");
        } catch (err) {
            console.error("Error al obtener artista:", err);
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

        const artista = {
            nombre,
            genero: genero ? parseInt(genero) : null,
        };

        if (id) {
            editArtista(artista);
        } else {
            insertArtista(artista);
        }
    };

    const insertArtista = async (artista) => {
        try {
            const res = await axios.post("http://localhost:3000/artistas", artista);
            console.log("Artista creado:", res.data);
            navigate("/admin/artistas");
        } catch (err) {
            console.error("Error al crear el artista:", err);
        }
    };

    const editArtista = async (artista) => {
        try {
            const res = await axios.put(`http://localhost:3000/artistas/${id}`, artista);
            console.log("Artista actualizado:", res.data);
            navigate("/admin/artistas");
        } catch (err) {
            console.error("Error al actualizar el artista:", err);
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
                                    <h2>{id ? 'Editar Artista' : 'Agregar Nuevo Artista'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control 
                                            required 
                                            value={nombre} 
                                            type="text" 
                                            onChange={(e) => setNombre(e.target.value)} 
                                        />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un nombre.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Género:</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            value={genero} 
                                            onChange={(e) => setGenero(e.target.value)} 
                                            required
                                        >
                                            <option value="">Seleccione un género</option>
                                            {generos.map(genero => (
                                                <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">Por favor seleccione un género.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">{id ? "Actualizar" : "Guardar"} Artista</Button>
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

export default FormArtista;
