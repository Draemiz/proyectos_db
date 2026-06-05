package com.krakedev.proyectos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.krakedev.proyectos.entidades.Tarea;
import com.krakedev.proyectos.services.TareaService;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    @Autowired
    private TareaService service;

    @PostMapping
    public ResponseEntity<?> guardar(
            @RequestBody Tarea tarea){

        try{ return ResponseEntity.ok(service.guardar(tarea));
        }catch(Exception e){ return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Tarea> listar(){
        return service.listar();
    }
}
