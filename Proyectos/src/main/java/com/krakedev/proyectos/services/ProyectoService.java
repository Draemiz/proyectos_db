package com.krakedev.proyectos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.krakedev.proyectos.entidades.Proyecto;
import com.krakedev.proyectos.repositories.ProyectoRepository;

@Service
public class ProyectoService {

    @Autowired
    private ProyectoRepository repository;

    public List<Proyecto> listar(){
        return repository.findAll();
    }

    public Proyecto guardar(Proyecto proyecto){
        return repository.save(proyecto);
    }

    public Optional<Proyecto> buscarPorId(int id){
        return repository.findById(id);
    }

    public void eliminar(int id){
        repository.deleteById(id);
    }

    public Long contarProyectos(){
        return repository.count();
    }
}