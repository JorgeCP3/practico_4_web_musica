import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../components/NavMenu";
import BuscadorGlobal from "../../components/BuscadorGlobal";

const PagGenero = () => {
    const { id } = useParams();
    const [genero, setGenero] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/generos/${id}`)
            .then((response) => {
                setGenero(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener el género: ", error);
                setLoading(false);
            });
    }, [id]);

    const handleArtistaClick = (artistaId) => {
        navigate(`/artista/${artistaId}`);
    };


    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
            <BuscadorGlobal />
                <h1>Género: {genero ? genero.nombre : 'Cargando...'}</h1>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <div>
                        <h3>Artistas</h3>
                        {genero.artistas.length === 0 ? (
                            <p>No hay artistas disponibles para este género.</p>
                        ) : (
                            <Row>
                                {genero.artistas.map((artista) => (
                                    <Col sm={12} md={6} lg={4} key={artista.id} className="mb-4">
                                        <Card onClick={() => handleArtistaClick(artista.id)} style={{ cursor: "pointer" }}>
                                            <Card.Body className="text-center">
                                                <Card.Title>{artista.nombre}</Card.Title>
                                                <div style={{ maxWidth: "100%", maxHeight: "100%", overflow: "hidden" }}>
                                                    <img 
                                                        src={`http://localhost:3000/uploads/artistas/${artista.id}.png`} 
                                                        alt={`Imagen del artista ${artista.nombre}`} 
                                                        style={{
                                                            width: "auto",
                                                            height: "auto",
                                                            objectFit: "cover",
                                                        }} 
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                )}
            </Container>
        </>
    );
};

export default PagGenero;
