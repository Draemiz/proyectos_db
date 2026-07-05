const API_URL = 'http://localhost:8080/api/auth';

function Navbar({ rol, vistaActual, cambiarVista, onLogout }) {

  async function manejarLogout() {

    const token = localStorage.getItem('token');

    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Error al cerrar sesion en el servidor:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('username');
      onLogout();
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">SP</div>
        <span className="navbar-title">Sistema de Proyectos</span>
      </div>

      <div className="navbar-links">
        <button
          className={`nav-btn ${vistaActual === 'proyectos' ? 'active' : ''}`}
          onClick={() => cambiarVista('proyectos')}
        >
          Ver Proyectos
        </button>

        {rol === 'ADMIN' && (
          <button
            className={`nav-btn ${vistaActual === 'gestionar' ? 'active' : ''}`}
            onClick={() => cambiarVista('gestionar')}
          >
            Gestionar Proyectos
          </button>
        )}

        {rol === 'ADMIN' && (
          <button
            className={`nav-btn ${vistaActual === 'tareas' ? 'active' : ''}`}
            onClick={() => cambiarVista('tareas')}
          >
            Crear Tareas
          </button>
        )}

        <span className="role-chip">ROL: {rol}</span>

        <button className="logout-btn" onClick={manejarLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;