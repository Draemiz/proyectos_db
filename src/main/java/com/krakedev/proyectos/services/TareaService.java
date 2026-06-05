package com.krakedev.proyectos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.krakedev.proyectos.entidades.Tarea;
import com.krakedev.proyectos.repositories.TareaRepository;

@Service
public class TareaService {

	@Autowired
    private TareaRepository repository;

    public List<Tarea> listar() {
        return repository.findAll();
    }

    public Tarea guardar(Tarea empleado) {
        return repository.save(empleado);
    }

    public Optional<Tarea> buscarPorId(int id) {
        return repository.findById(id);
    }

    public void eliminar(int id) {
        repository.deleteById(id);
    }
}