import axios from "axios";
import { useState, useEffect } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UploadCancion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [audioFile, setAudioFile] = useState(null);  
    const [audioPreview, setAudioPreview] = useState(null); 
    const [validated, setValidated] = useState(false);  

    const onChangeAudio = (e) => {
        const file = e.target.files[0];
        setAudioFile(file);
        
        if (file) {
            setAudioPreview(file.name);
        }
    };

    const onSaveClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        if (audioFile && audioFile.type !== 'audio/mpeg') {
            alert('Por favor, seleccione un archivo MP3.');
            return;
        }

        const formData = new FormData();
        formData.append('audio', audioFile);

        axios.post(`http://localhost:3000/canciones/${id}/audio`, formData)
            .then(res => {
                console.log(res.data);
                navigate(`/admin/canciones`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        return () => {
            if (audioPreview) {
                setAudioPreview(null);
            }
        };
    }, [audioPreview]);

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Subir Canción</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onSaveClick}>
                                    <Form.Group>
                                        <Form.Label>Seleccione un archivo de audio (MP3):</Form.Label>
                                        <Form.Control 
                                            required 
                                            type="file" 
                                            accept="audio/mp3"
                                            onChange={onChangeAudio} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un archivo MP3.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {audioPreview && ( 
                                        <Form.Group className="mt-3">
                                            <p><strong>Archivo seleccionado:</strong> {audioPreview}</p>
                                        </Form.Group>
                                    )}
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Canción</Button>
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

export default UploadCancion;
