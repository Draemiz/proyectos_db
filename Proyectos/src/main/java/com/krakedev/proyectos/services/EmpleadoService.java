package com.krakedev.proyectos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.krakedev.proyectos.entidades.Empleado;
import com.krakedev.proyectos.repositories.EmpleadoRepository;

@Service
public class EmpleadoService {

	@Autowired
    private EmpleadoRepository repository;

    public List<Empleado> listar() {
        return repository.findAll();
    }

    public Empleado guardar(Empleado empleado) {
        return repository.save(empleado);
    }

    public Optional<Empleado> buscarPorId(int id) {
        return repository.findById(id);
    }

    public void eliminar(int id) {
        repository.deleteById(id);
    }
}