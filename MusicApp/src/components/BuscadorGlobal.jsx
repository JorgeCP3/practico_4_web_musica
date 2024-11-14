import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, ListGroup } from 'react-bootstrap';
import _ from 'lodash';

const BuscadorGlobal = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const fetchResults = async (query) => {
        try {
            const response = await axios.get(`http://localhost:3000/buscar`, {
                params: { query }
            });
            const { generos, artistas, albums, canciones } = response.data;

            const formattedResults = [
                ...generos.map((item) => ({ id: item.id, name: item.nombre, type: 'genero' })),
                ...artistas.map((item) => ({ id: item.id, name: item.nombre, type: 'artista' })),
                ...albums.map((item) => ({
                    id: item.id,
                    name: item.nombre,
                    type: 'album',
                    artistaId: item.artista.id
                })),
                ...canciones.map((item) => ({
                    id: item.id,
                    name: item.nombre,
                    type: 'cancion',
                    albumId: item.album.id
                }))
            ];

            setResults(formattedResults);
        } catch (error) {
            console.error("Error al realizar la búsqueda:", error);
        }
    };

    const debouncedFetchResults = _.debounce(fetchResults, 300);

    useEffect(() => {
        if (query) {
            debouncedFetchResults(query);
        } else {
            setResults([]);
        }
    }, [query]);

    const getAlbumAndArtist = async (songId) => {
        try {
            const albumResponse = await axios.get(`http://localhost:3000/albums`);
            const albums = albumResponse.data;

            const album = albums.find(album => album.canciones.some(c => c.id === songId));

            if (album) {
                navigate(`/artista/${album.artista.id}`);
            } else {
                console.error("No se encontró el álbum para esta canción.");
            }
        } catch (error) {
            console.error("Error al obtener los álbumes:", error);
        }
    };

    const handleResultClick = (result) => {
        if (result.type === 'artista') {
            navigate(`/artista/${result.id}`);
        } else if (result.type === 'album') {
            if (result.artistaId) {
                navigate(`/artista/${result.artistaId}`);
            } else {
                console.error("No se encontró el artista asociado con el álbum.");
            }
        } else if (result.type === 'cancion') {
            getAlbumAndArtist(result.id);
        } else if (result.type === 'genero') {
            navigate(`/genero/${result.id}`);
        }

        setQuery("");
        setResults([]);
    };

    return (
        <Form inline className="mb-4">
            <FormControl
                type="text"
                placeholder="Buscar por género, artista, álbum o canción"
                className="mr-sm-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
                <ListGroup style={{ position: 'absolute', zIndex: 1000, width: '100%' }}>
                    {results.map((result, index) => (
                        <ListGroup.Item
                            key={index}
                            action
                            onClick={() => handleResultClick(result)}
                        >
                            {result.name} ({result.type})
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Form>
    );
};

export default BuscadorGlobal;
