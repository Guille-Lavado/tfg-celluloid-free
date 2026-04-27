import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import api from "../api/axios";

export default function AdminGeneros() {
    const [generos, setGeneros]     = useState([]);
    const [error, setError]         = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando]   = useState(null);
    const [form, setForm]           = useState({ nombre: "" });
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        fetchGeneros();
    }, []);

    const fetchGeneros = async () => {
        try {
            const res = await api.get("/api/generos");
            setGeneros(res.data)
        } catch {
            setError("Error al cargar los géneros.");
        }
    };

    const abrirCrear = () => {
        setEditando(null);
        setForm({ nombre: "" });
        setShowModal(true);
    };

    const abrirEditar = (genero) => {
        setEditando(genero);
        setForm({ nombre: genero.nombre });
        setShowModal(true);
    };

    const cerrarModal = () => {
        setShowModal(false);
        setEditando(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        setGuardando(true);
        try {
            if (editando) {
                const res = await api.put(`/api/generos/${editando.id}`, form);
                setGeneros(generos.map(g => g.id === editando.id ? res.data : g));
            } else {
                const res = await api.post("/api/generos", form);
                setGeneros([...generos, res.data]);
            }
            cerrarModal();
        } catch (err) {
            setError(err.response?.data?.message ?? "Error al guardar el género.");
        } finally {
            setGuardando(false);
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este género?")) return;
        try {
            await api.delete(`/api/generos/${id}`);
            setGeneros(generos.filter(g => g.id !== id));
        } catch (err) {
            // Captura el 409 cuando el género tiene obras asociadas
            setError(err.response?.data?.message ?? "Error al eliminar el género.");
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Géneros</h2>
                <Button variant="primary" onClick={abrirCrear}>+ Nuevo género</Button>
            </div>

            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {generos.map(genero => (
                        <tr key={genero.id}>
                            <td>{genero.id}</td>
                            <td>{genero.nombre}</td>
                            <td className="d-flex gap-2">
                                <Button size="sm" variant="warning" onClick={() => abrirEditar(genero)}>Editar</Button>
                                <Button size="sm" variant="danger" onClick={() => handleEliminar(genero.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? "Editar género" : "Nuevo género"}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleGuardar}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrarModal}>Cancelar</Button>
                        <Button variant="primary" type="submit" disabled={guardando}>
                            {guardando ? <Spinner size="sm" animation="border" /> : "Guardar"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};
