import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/api/proyectos';

function TablaProyectos({ recargarSenal }) {

  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarProyectos();
  }, [recargarSenal]);

  async function cargarProyectos() {

    setCargando(true);
    setError('');

    const token = localStorage.getItem('token');

    try {

      const respuesta = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!respuesta.ok) {
        setError('No se pudieron cargar los proyectos');
        setCargando(false);
        return;
      }

      const datos = await respuesta.json();
      setProyectos(datos);

    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div>
      <div className="section-header">
        <h2>Proyectos registrados</h2>
        <span className="section-count">{proyectos.length} en total</span>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="table-wrapper">
        {cargando ? (
          <div className="empty-state">Cargando proyectos...</div>
        ) : proyectos.length === 0 ? (
          <div className="empty-state">
            Todavía no hay proyectos registrados.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha inicio</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>{proyecto.id}</td>
                  <td>{proyecto.nombre}</td>
                  <td>{proyecto.descripcion}</td>
                  <td>{proyecto.fechaInicio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TablaProyectos;