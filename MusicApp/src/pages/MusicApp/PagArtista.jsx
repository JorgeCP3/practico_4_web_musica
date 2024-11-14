import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavMenu from "../../components/NavMenu";
import BuscadorGlobal from "../../components/BuscadorGlobal";

const PagArtista = () => {
    const { id } = useParams();
    const [artista, setArtista] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/artistas/${id}`)
            .then((response) => {
                setArtista(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener el artista: ", error);
                setLoading(false);
            });

        axios.get("http://localhost:3000/albums")
            .then((response) => {
                const filteredAlbums = response.data.filter(album => album.artista.id === parseInt(id));
                setAlbums(filteredAlbums);
            })
            .catch((error) => {
                console.error("Error al obtener los álbumes: ", error);
            });
    }, [id]);

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
            <BuscadorGlobal />
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <div>
                        <h1>Artista: {artista ? artista.nombre : 'Cargando...'}</h1>

                        <div className="text-center mb-4">
                            <img 
                                src={`http://localhost:3000/uploads/artistas/${artista.id}.png`} 
                                alt={`Imagen del artista ${artista.nombre}`} 
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "300px",
                                    objectFit: "cover"
                                }}
                            />
                        </div>

                        <h3>Álbumes</h3>
                        {albums.length === 0 ? (
                            <p>No hay álbumes disponibles para este artista.</p>
                        ) : (
                            <Row>
                                {albums.map((album) => (
                                    <Col sm={12} md={6} lg={4} key={album.id} className="mb-4">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className="text-center">{album.nombre}</Card.Title>

                                                <div className="text-center mb-3">
                                                    <img 
                                                        src={`http://localhost:3000/uploads/albums/${album.id}.png`} 
                                                        alt={`Imagen del álbum ${album.nombre}`} 
                                                        style={{
                                                            width: "200px",
                                                            height: "auto",
                                                            objectFit: "cover",
                                                        }} 
                                                    />
                                                </div>

                                                <h5>Canciones:</h5>
                                                {album.canciones.length === 0 ? (
                                                    <p>No hay canciones en este álbum.</p>
                                                ) : (
                                                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                                        {album.canciones.map((cancion) => (
                                                            <li key={cancion.id} className="d-flex justify-content-between align-items-center mb-3">
                                                                <span style={{ flex: 1, paddingRight: "10px" }}>{cancion.nombre}</span>

                                                                <audio controls style={{ flexShrink: 0, maxWidth: "200px", width: "100%" }}>
                                                                    <source 
                                                                        src={`http://localhost:3000/uploads/mp3/${cancion.id}.mp3`} 
                                                                        type="audio/mpeg" 
                                                                    />
                                                                    Tu navegador no soporta el elemento de audio.
                                                                </audio>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
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

export default PagArtista;
