// UsuariosService.java
package barto.backendCIMA.Services;

import barto.backendCIMA.Repository.UsuariosRepository;
import barto.backendCIMA.entities.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuariosService {

    @Autowired
    private UsuariosRepository usuariosRepository;

    // Crear un nuevo usuario
    public Usuarios createUsuario(Usuarios usuario) {
        return usuariosRepository.save(usuario);
    }

    // Obtener todos los usuarios
    public List<Usuarios> getAllUsuarios() {
        return usuariosRepository.findAll();
    }

    // Buscar un usuario por ID
    public Optional<Usuarios> getUsuarioById(Integer id) {
        return usuariosRepository.findById(id);
    }

    // Actualizar un usuario
    public Usuarios updateUsuario(Integer id, Usuarios usuarioDetails) {
        Usuarios usuario = usuariosRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setNombre(usuarioDetails.getNombre());
        usuario.setClave(usuarioDetails.getClave());
        usuario.setRol(usuarioDetails.getRol());
        return usuariosRepository.save(usuario);
    }

    // Eliminar un usuario
    public void deleteUsuario(Integer id) {
        Usuarios usuario = usuariosRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuariosRepository.delete(usuario);
    }
}