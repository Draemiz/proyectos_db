package com.krakedev.proyectos.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.krakedev.proyectos.entidades.Usuario;
import com.krakedev.proyectos.repositories.UsuarioRepository;
import com.krakedev.proyectos.security.JwtUtil;
import com.krakedev.proyectos.services.TokenBlacklistService;
import com.krakedev.proyectos.services.UsuarioService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final TokenBlacklistService blacklistService;

    public AuthController(
            UsuarioService usuarioService,
            UsuarioRepository usuarioRepository,
            TokenBlacklistService blacklistService) {

        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.blacklistService = blacklistService;
    }

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

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String,String> credenciales) {

        try {

            String username =
                    credenciales.get("username");

            String password =
                    credenciales.get("password");

            boolean autenticado =
                    usuarioService.autenticar(
                            username,
                            password);

            if(autenticado) {

                Usuario usuario =
                        usuarioRepository
                        .findByUsername(username)
                        .get();

                String token =
                        JwtUtil.generarToken(
                                usuario.getUsername(),
                                usuario.getRol());

                return ResponseEntity.ok(
                        Map.of("token", token));
            }

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Usuario o contraseña incorrecta");

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al iniciar sesión: "
                            + e.getMessage());
        }
    }

    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(
            @RequestHeader(
                    value = "Authorization",
                    required = false)
            String authHeader) {

        if(authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Acceso Denegado");
        }

        String token =
                authHeader.substring(7);

        if(blacklistService.estaInvalidado(token)) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Token invalidado");
        }

        DecodedJWT datosToken =
                JwtUtil.validarToken(token);

        if(datosToken == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Token inválido");
        }

        String usuario =
                datosToken.getSubject();

        String rol =
                datosToken.getClaim("rol")
                .asString();

        return ResponseEntity.ok(
                Map.of(
                        "Usuario", usuario,
                        "Rol", rol,
                        "Estado", "Autenticado"
                ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @RequestHeader(
                    value = "Authorization",
                    required = false)
            String authHeader) {

        if(authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            return ResponseEntity
                    .badRequest()
                    .body("Token no proporcionado");
        }

        String token =
                authHeader.substring(7);

        DecodedJWT jwt =
                JwtUtil.validarToken(token);

        if(jwt == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Token inválido");
        }

        blacklistService.invalidarToken(token);

        return ResponseEntity.ok(
                Map.of(
                        "mensaje",
                        "Sesión cerrada exitosamente"
                ));
    }
}