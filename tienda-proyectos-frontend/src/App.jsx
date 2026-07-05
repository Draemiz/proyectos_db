import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [rol, setRol] = useState(localStorage.getItem('rol'));
  const [vistaActual, setVistaActual] = useState('proyectos');

  function manejarLoginExitoso(nuevoToken, nuevoRol) {
    setToken(nuevoToken);
    setRol(nuevoRol);
    setVistaActual('proyectos');
  }

  function manejarLogout() {
    setToken(null);
    setRol(null);
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
        <p>Vista actual: <strong>{vistaActual}</strong></p>
        <p style={{ color: 'var(--color-ink-soft)', fontSize: '0.9rem' }}>
          (Aquí conectaremos la tabla de proyectos y el formulario en la Parte 2.2)
        </p>
      </main>
    </div>
  );
}

export default App;