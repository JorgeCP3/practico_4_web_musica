import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ListaGeneros from './pages/Genero/ListaGeneros';
import FormGenero from './pages/Genero/FormGenero';
import ListaArtistas from './pages/Artista/ListaArtistas';
import FormArtista from './pages/Artista/FormArtista';
import ListaAlbums from './pages/Album/ListaAlbums';
import FormAlbum from './pages/Album/FormAlbum';
import ListaCanciones from './pages/Cancion/ListaCanciones';
import FormCancion from './pages/Cancion/FormCancion';
import UploadImgGenero from './pages/Genero/UploadImgGenero.jsx';
import UploadImgArtista from './pages/Artista/UploadImgArtista.jsx';
import UploadImgAlbum from './pages/Album/UploadImgAlbum.jsx';
import UploadCancion from './pages/Cancion/UploadCancion.jsx';
import Dashboard from './pages/MusicApp/Dashboard.jsx';
import PagGenero from './pages/MusicApp/PagGenero.jsx';
import PagArtista from './pages/MusicApp/PagArtista.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/admin/artistas',
    element: <ListaArtistas />
  },
  {
    path: '/admin/artistas/:id',
    element: <FormArtista />
  },
  {
    path: '/admin/artistas/nuevo',
    element: <FormArtista />
  },
  {
    path: '/admin/albums',
    element: <ListaAlbums />
  },
  {
    path: '/admin/albums/:id',
    element: <FormAlbum />
  },
  {
    path: '/admin/albums/nuevo',
    element: <FormAlbum />
  },
  {
    path: '/admin/canciones',
    element: <ListaCanciones />
  },
  {
    path: '/admin/canciones/:id',
    element: <FormCancion />
  },
  {
    path: '/admin/canciones/nuevo',
    element: <FormCancion />
  },
  {
    path: '/admin/generos',
    element: <ListaGeneros />
  },
  {
    path: '/admin/generos/:id',
    element: <FormGenero />
  },
  {
    path: '/admin/generos/nuevo',
    element: <FormGenero />
  },
  {
    path: '/admin/generos/:id/upload',
    element: <UploadImgGenero />
  },
  {
    path : '/admin/artistas/:id/upload',
    element: <UploadImgArtista />
  },
  {
    path : '/admin/albums/:id/upload',
    element: <UploadImgAlbum />
  },
  {
    path : '/admin/canciones/:id/upload',
    element: <UploadCancion />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/genero/:id',
    element: <PagGenero />
  },
  {
    path: '/artista/:id',
    element: <PagArtista />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
