import { useEffect, useState } from 'react';

const API_TAREAS = 'http://localhost:8080/api/tareas';
const API_PROYECTOS = 'http://localhost:8080/api/proyectos';

function FormularioTarea({ rol }) {

  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [costoEstimado, setCostoEstimado] = useState('');
  const [prioridad, setPrioridad] = useState('ALTA');
  const [proyectoId, setProyectoId] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarProyectos();
  }, []);

  async function cargarProyectos() {

    const token = localStorage.getItem('token');

    try {
      const respuesta = await fetch(API_PROYECTOS, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();
        setProyectos(datos);
        if (datos.length > 0) {
          setProyectoId(String(datos[0].id));
        }
      }
    } catch (err) {
      console.error('Error al cargar proyectos:', err);
    }
  }

  if (rol !== 'ADMIN') {
    return null;
  }

  async function manejarSubmit(evento) {

    evento.preventDefault();
    setError('');
    setMensaje('');
    setEnviando(true);

    const token = localStorage.getItem('token');

    const cuerpo = {
      descripcion,
      fechaLimite,
      costoEstimado: Number(costoEstimado),
      prioridad,
      proyecto: { id: Number(proyectoId) }
    };

    try {

      const respuesta = await fetch(API_TAREAS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cuerpo)
      });

      if (respuesta.status === 403) {
        setError('Acceso denegado: tu rol no tiene permiso para crear tareas.');
        setEnviando(false);
        return;
      }

      if (respuesta.status === 400) {
        const datos = await respuesta.json();
        setError(datos.error || 'Prioridad no válida');
        setEnviando(false);
        return;
      }

      if (!respuesta.ok) {
        setError('No se pudo crear la tarea. Verifica los datos.');
        setEnviando(false);
        return;
      }

      setMensaje('Tarea creada exitosamente.');
      setDescripcion('');
      setFechaLimite('');
      setCostoEstimado('');
      setPrioridad('ALTA');

    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="form-card">
      <h3>Registrar nueva tarea</h3>

      {mensaje && <div className="alert-success">{mensaje}</div>}
      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={manejarSubmit} className="form-grid">

        <div className="field">
          <label htmlFor="proyecto">Proyecto</label>
          <select
            id="proyecto"
            value={proyectoId}
            onChange={(e) => setProyectoId(e.target.value)}
            required
          >
            {proyectos.length === 0 && <option value="">No hay proyectos</option>}
            {proyectos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="fechaLimite">Fecha límite</label>
          <input
            id="fechaLimite"
            type="date"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="costoEstimado">Costo estimado</label>
          <input
            id="costoEstimado"
            type="number"
            step="0.01"
            value={costoEstimado}
            onChange={(e) => setCostoEstimado(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="prioridad">Prioridad</label>
          <select
            id="prioridad"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="ALTA">Alta</option>
            <option value="MEDIA">Media</option>
            <option value="BAJA">Baja</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={enviando || proyectos.length === 0}>
          {enviando ? 'Guardando...' : 'Guardar tarea'}
        </button>
      </form>
    </div>
  );
}

export default FormularioTarea;