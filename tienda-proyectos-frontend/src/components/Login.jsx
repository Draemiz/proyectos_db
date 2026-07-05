import { useState } from 'react';

const API_URL = 'http://localhost:8080/api/auth';

function Login({ onLoginExitoso }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function manejarSubmit(evento) {

    evento.preventDefault();
    setError('');
    setCargando(true);

    try {

      const respuesta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!respuesta.ok) {
        setError('Usuario o contraseña incorrecta');
        setCargando(false);
        return;
      }

      const datos = await respuesta.json();
      const token = datos.token;

      const partes = token.split('.');
      const payload = JSON.parse(atob(partes[1]));
      const rol = payload.rol;

      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);
      localStorage.setItem('username', username);

      onLoginExitoso(token, rol);

    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <p className="login-eyebrow">Acceso restringido</p>
        <h1>Iniciar sesión</h1>
        <p className="login-subtitle">
          Ingresa tus credenciales para acceder al sistema de proyectos.
        </p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={manejarSubmit}>
          <div className="field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;