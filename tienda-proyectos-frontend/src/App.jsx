import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import TablaProyectos from './components/TablaProyectos';
import FormularioProyecto from './components/FormularioProyecto';
import FormularioTarea from './components/FormularioTarea';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [rol, setRol] = useState(localStorage.getItem('rol'));
  const [vistaActual, setVistaActual] = useState('proyectos');
  const [recargarSenal, setRecargarSenal] = useState(0);

  function manejarLoginExitoso(nuevoToken, nuevoRol) {
    setToken(nuevoToken);
    setRol(nuevoRol);
    setVistaActual('proyectos');
  }

  function manejarLogout() {
    setToken(null);
    setRol(null);
  }

  function manejarProyectoCreado() {
    setRecargarSenal((valorAnterior) => valorAnterior + 1);
  }

  if (!token) {
    return (
      <div className="app-shell">
        <Login onLoginExitoso={manejarLoginExitoso} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar
        rol={rol}
        vistaActual={vistaActual}
        cambiarVista={setVistaActual}
        onLogout={manejarLogout}
      />

      <main className="main-content">
        {vistaActual === 'proyectos' && (
          <TablaProyectos recargarSenal={recargarSenal} />
        )}

        {vistaActual === 'gestionar' && (
          <div className={`layout-grid ${rol === 'ADMIN' ? 'con-formulario' : ''}`}>
            <TablaProyectos recargarSenal={recargarSenal} />
            <FormularioProyecto rol={rol} onProyectoCreado={manejarProyectoCreado} />
          </div>
        )}

        {vistaActual === 'tareas' && (
          <FormularioTarea rol={rol} />
        )}
      </main>
    </div>
  );
}

export default App;