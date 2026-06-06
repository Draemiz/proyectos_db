package com.krakedev.proyectos.services;

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
}