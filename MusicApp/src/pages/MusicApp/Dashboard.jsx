import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavMenu from "../../components/NavMenu";
import BuscadorGlobal from "../../components/BuscadorGlobal";

const Dashboard = () => {
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/generos")
            .then((response) => {
                setGeneros(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener géneros: ", error);
                setLoading(false);
            });
    }, []);

    const handleGeneroClick = (idGenero) => {
        navigate(`/genero/${idGenero}`);
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <h1>MusicApp</h1>
                
                <BuscadorGlobal />
                
                <h2>Géneros</h2>
                
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <Row>
                        {generos.length === 0 ? (
                            <p>No hay géneros disponibles.</p>
                        ) : (
                            generos.map((genero) => (
                                <Col sm={12} md={6} lg={4} key={genero.id} className="mb-4">
                                    <Card onClick={() => handleGeneroClick(genero.id)} style={{ cursor: "pointer" }}>
                                        <Card.Body className="text-center">
                                            <Card.Title>{genero.nombre}</Card.Title>
                                            
                                            <img
                                                src={`http://localhost:3000/uploads/generos/${genero.id}.png`}
                                                alt={`Imagen del género ${genero.nombre}`}
                                                width="100"
                                                height="100"
                                            />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                )}
            </Container>
        </>
    );
};

export default Dashboard;
