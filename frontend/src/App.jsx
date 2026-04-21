import axios from "axios"
import React, { useState, useEffect } from "react";
import { Table, Container, Image, Alert } from 'react-bootstrap';

const TablaObras = ({ obras }) => {
  return (
    <>
      <h2 className="mb-4">Catálogo de Obras</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Póster</th>
            <th>Título</th>
            <th>Género</th>
            <th>Director</th>
            <th>Sinopsis</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {obras.map((obra) => (
            <tr key={obra.id}>
              <td>{obra.id}</td>
              <td>
                <Image 
                  src={obra.poster} 
                  alt={obra.titulo} 
                  style={{ width: '60px', height: '90px', objectFit: 'cover' }} 
                  rounded 
                />
              </td>
              <td className="fw-bold">{obra.titulo}</td>
              <td>{obra.genero}</td>
              <td>{obra.director}</td>
              <td style={{ fontSize: '0.9rem', maxWidth: '300px' }}>
                {obra.sinopsis}
              </td>
              <td>
                <span className={`badge ${obra.peli_video ? "pelicula" : "serie"}`}>
                  {obra.peli_video ? "Película" : "Serie"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  withXSRFToken: true,
});

function App() {
  const [obras, setObras] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    const getData = async () => {
        try {
          const res = await api.get("/api/obras");
          setObras(res.data.data)
          console.log(res.data.data);
        } catch (error) {
          setError("No se pudieron cargar las obras.");
          console.log(error);
        } finally {
          setLoading(false);
        }
    };

    getData();
  }, []);

  return (
    <Container className="container mt-4">
      { loading 
        ? <Alert variant="dark">Cargando obras...</Alert> 
        : error 
          ? <Alert variant="danger">{error}</Alert> 
          : <TablaObras obras={obras}/> 
      }
    </Container>
  );
}

export default App;
