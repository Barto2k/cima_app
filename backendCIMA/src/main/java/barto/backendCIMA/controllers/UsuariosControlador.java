package barto.backendCIMA.controllers;

import barto.backendCIMA.DTOs.UsuariosDTO;
import barto.backendCIMA.Services.UsuariosService;
import barto.backendCIMA.entities.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
public class UsuariosControlador {
    private final UsuariosService service;

    @Autowired
    public UsuariosControlador(UsuariosService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UsuariosDTO> crearUsuario(@RequestBody Usuarios usuario) {
        Usuarios creado = service.createUsuario(usuario);
        UsuariosDTO dto = service.convertirADTO(creado);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<UsuariosDTO> actualizarUsuario(@RequestBody Usuarios usuario) {
        Usuarios actualizado = service.updateUsuario(usuario.getId(), usuario);
        UsuariosDTO dto = service.convertirADTO(actualizado);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Integer id) {
        service.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<UsuariosDTO>> obtenerUsuarios() {
        List<Usuarios> usuarios = service.getAllUsuarios();
        List<UsuariosDTO> dtos = service.convertirADTOs(usuarios);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuariosDTO> obtenerUsuarioPorId(@PathVariable Integer id) {
        return service.getUsuarioById(id)
                .map(service::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}