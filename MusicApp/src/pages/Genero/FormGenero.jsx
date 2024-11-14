import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormGenero = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getGeneroById();
    }, [id]);

    const getGeneroById = async () => {
        axios.get(`http://localhost:3000/generos/${id}`)
        .then(res => {
            const genero = res.data;
            setNombre(genero.nombre);
            setDescripcion(genero.descripcion);
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

        const genero = {
            nombre,
            descripcion
        };

        if (id) {
            editGenero(genero);
        } else {
            insertGenero(genero);
        }
    };

    const insertGenero = async (genero) => {
        axios.post("http://localhost:3000/generos", genero)
        .then(() => {
            navigate("/admin/generos");
        }).catch(err => {
            console.error(err);
        });
    };

    const editGenero = async (genero) => {
        axios.put(`http://localhost:3000/generos/${id}`, genero)
        .then(() => {
            navigate("/admin/generos");
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
                                    <h2>{id ? 'Editar Género' : 'Agregar Nuevo Género'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un nombre.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">{id ? "Actualizar" : "Guardar"} Género</Button>
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

export default FormGenero;
