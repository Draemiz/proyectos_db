import { useState } from 'react';

const API_URL = 'http://localhost:8080/api/proyectos';

function FormularioProyecto({ rol, onProyectoCreado }) {

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (rol !== 'ADMIN') {
    return null;
  }

  async function manejarSubmit(evento) {

    evento.preventDefault();
    setError('');
    setMensaje('');
    setEnviando(true);

    const token = localStorage.getItem('token');

    try {

      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, descripcion, fechaInicio })
      });

      if (respuesta.status === 403) {
        setError('Acceso denegado: tu rol no tiene permiso para crear proyectos.');
        setEnviando(false);
        return;
      }

      if (!respuesta.ok) {
        setError('No se pudo crear el proyecto. Verifica los datos.');
        setEnviando(false);
        return;
      }

      setMensaje('Proyecto creado exitosamente.');
      setNombre('');
      setDescripcion('');
      setFechaInicio('');
      onProyectoCreado();

    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="form-card">
      <h3>Registrar nuevo proyecto</h3>

      {mensaje && <div className="alert-success">{mensaje}</div>}
      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={manejarSubmit} className="form-grid">
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="fechaInicio">Fecha de inicio</label>
          <input
            id="fechaInicio"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Guardar proyecto'}
        </button>
      </form>
    </div>
  );
}

export default FormularioProyecto;