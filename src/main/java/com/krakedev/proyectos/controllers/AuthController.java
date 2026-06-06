package com.krakedev.proyectos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.krakedev.proyectos.entidades.Usuario;

import com.krakedev.proyectos.services.UsuarioService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(
            @RequestBody Usuario usuario) {

        try {

            Usuario usuarioRegistrado =
                    usuarioService.registrar(usuario);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(usuarioRegistrado);

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al registrar usuario: "
                            + e.getMessage());
        }
    }
}