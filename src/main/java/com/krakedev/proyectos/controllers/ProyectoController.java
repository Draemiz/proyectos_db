package com.krakedev.proyectos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.krakedev.proyectos.entidades.Proyecto;
import com.krakedev.proyectos.services.ProyectoService;

@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {

    @Autowired
    private ProyectoService service;

    @PostMapping
    public ResponseEntity<?> guardar(
            @RequestBody Proyecto proyecto){

        try{ return ResponseEntity.ok(service.guardar(proyecto));
        }catch(Exception e){ return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Proyecto> listar(){
        return service.listar();
    }
}
