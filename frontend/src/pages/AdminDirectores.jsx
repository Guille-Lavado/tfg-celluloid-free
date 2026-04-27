import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import api from "../api/axios";

export default function AdminDirectores() {
    const [directores, setDirectores] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [form, setForm] = useState({ nombre: "", fecha_de_nacimiento: "", biografia: "", img: "" });
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        fetchDirectores();
    }, []);

    const fetchDirectores = async () => {
        try {
            const res = await api.get("/api/directores");
            setDirectores(res.data);
        } catch {
            setError("Error al cargar los directores");
        }
    };

    const abrirCrear = () => {
        setEditando(null);
        setForm({ nombre: "", fecha_de_nacimiento: "", biografia: "", img: "" });
        setShowModal(true);
    };

    const abrirEditar = (director) => {
        setEditando(director);
        setForm({
            nombre:              director.nombre,
            fecha_de_nacimiento: director.fecha_de_nacimiento ?? "",
            biografia:           director.biografia ?? "",
            img:                 director.img ?? "",
        });
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
                const res = await api.put(`/api/directores/${editando.id}`, form);
                setDirectores(directores.map(d => d.id === editando.id ? res.data : d));
            } else {
                const res = await api.post("/api/directores", form);
                setDirectores([...directores, res.data]);
            }
            cerrarModal();
        } catch (err) {
            setError(err.response?.data?.message ?? "Error al guardar el director.");
        } finally {
            setGuardando(false);
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este director?")) return
        try {
            await api.delete(`/api/directores/${id}`);
            setDirectores(directores.filter(d => d.id !== id));
        } catch (err) {
            setError(err.response?.data?.message ?? "Error al eliminar el director.");
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Directores</h2>
                <Button variant="primary" onClick={abrirCrear}>+ Nuevo director</Button>
            </div>

            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Fecha de nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {directores.map(director => (
                        <tr key={director.id}>
                            <td>{director.id}</td>
                            <td>
                                {director.img
                                    ? <img src={director.img} alt={director.nombre} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }} />
                                    : <div style={{ width: 40, height: 40, background: "#e0e0e0", borderRadius: "50%" }} />
                                }
                            </td>
                            <td>{director.nombre}</td>
                            <td>{director.fecha_de_nacimiento ?? "—"}</td>
                            <td className="d-flex gap-2">
                                <Button size="sm" variant="warning" onClick={() => abrirEditar(director)}>Editar</Button>
                                <Button size="sm" variant="danger" onClick={() => handleEliminar(director.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? "Editar director" : "Nuevo director"}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleGuardar}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <Form.Control type="date" name="fecha_de_nacimiento" value={form.fecha_de_nacimiento} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Biografía</Form.Label>
                            <Form.Control as="textarea" rows={3} name="biografia" value={form.biografia} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL de la foto</Form.Label>
                            <Form.Control name="img" value={form.img} onChange={handleChange} />
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
