import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaGeneros = () => {
    const [listaGeneros, setListaGeneros] = useState([]);

    useEffect(() => {
        getListaGeneros();
        document.title = "Lista de Géneros";
    }, []);	

    const getListaGeneros = async () => {
        try {
            const res = await axios.get("http://localhost:3000/generos");
            setListaGeneros(res.data);
        } catch (err) {
            console.error("Error al obtener la lista de géneros:", err);
        }
    }

    const eliminarGenero = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este género?");
        if (!confirmar) return;

        try {
            await axios.delete(`http://localhost:3000/generos/${id}`);
            getListaGeneros();
        } catch (err) {
            console.error("Error al eliminar el género:", err);
        }
    }

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Géneros</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaGeneros.map(genero => (
                                            <tr key={genero.id}>
                                                <td>
                                                <img 
                                                        src={`http://localhost:3000/uploads/generos/${genero.id}.png`} 
                                                        alt={`Imagen del tipo ${genero.nombre}`} 
                                                        width="100"
                                                        height="100"
                                                    />
                                                </td>
                                                <td>{genero.id}</td>
                                                <td>{genero.nombre}</td>
                                                <td>
                                                    <Link className="btn btn-success" to={`/admin/generos/${genero.id}/upload`}>Cambiar Imagen</Link>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary me-2" to={`/admin/generos/${genero.id}`}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => eliminarGenero(genero.id)}>
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

export default ListaGeneros;
