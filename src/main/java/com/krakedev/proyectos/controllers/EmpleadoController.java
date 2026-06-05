package com.krakedev.proyectos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.krakedev.proyectos.entidades.Empleado;
import com.krakedev.proyectos.services.EmpleadoService;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoService service;

    @PostMapping
    public ResponseEntity<?> guardar(
            @RequestBody Empleado empleado){

        try{ return ResponseEntity.ok(service.guardar(empleado));
        }catch(Exception e){ return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Empleado> listar(){
        return service.listar();
    }
}