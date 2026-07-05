CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL
);

SELECT * FROM usuarios;
SELECT * FROM empleados;
SELECT * FROM proyectos;
SELECT * FROM tareas;
SELECT * FROM tarea_empleados;