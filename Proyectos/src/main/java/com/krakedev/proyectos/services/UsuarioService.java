package com.krakedev.proyectos.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.krakedev.proyectos.entidades.Usuario;
import com.krakedev.proyectos.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registrar(Usuario usuario) {

        String passwordEncriptada =
                BCrypt.hashpw(
                        usuario.getPassword(),
                        BCrypt.gensalt()
                );

        usuario.setPassword(passwordEncriptada);

        return usuarioRepository.save(usuario);
    }
    
    public boolean autenticar(
            String username,
            String password) {

        Optional<Usuario> usuarioEncontrado =
                usuarioRepository.findByUsername(username);

        if(usuarioEncontrado.isPresent()) {

            Usuario usuario =
                    usuarioEncontrado.get();

            if(BCrypt.checkpw(
                    password,
                    usuario.getPassword())) {

                return true;
            }
        }

        return false;
    }
}