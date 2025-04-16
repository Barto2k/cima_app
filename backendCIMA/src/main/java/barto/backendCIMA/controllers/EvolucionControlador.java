package barto.backendCIMA.controllers;

import barto.backendCIMA.DTOs.EvolucionDTO;
import barto.backendCIMA.Services.EvolucionService;
import barto.backendCIMA.entities.Evolucion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evolucion")
public class EvolucionControlador {
    private final EvolucionService service;

    @Autowired
    public EvolucionControlador(EvolucionService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EvolucionDTO> crearEvolucion(@RequestBody Evolucion evolucion) {
        Evolucion creada = service.createEvolucion(evolucion);
        EvolucionDTO dto = service.convertirADTO(creada);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<EvolucionDTO> actualizarEvolucion(@RequestBody Evolucion evolucion) {
        Evolucion actualizada = service.updateEvolucion(evolucion.getCodigo(), evolucion);
        EvolucionDTO dto = service.convertirADTO(actualizada);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEvolucion(@PathVariable Integer id) {
        service.deleteEvolucion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<EvolucionDTO>> obtenerEvoluciones() {
        List<Evolucion> evoluciones = service.getAllEvoluciones();
        List<EvolucionDTO> dtos = service.convertirADTOs(evoluciones);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvolucionDTO> obtenerEvolucionPorId(@PathVariable Integer id) {
        return service.getEvolucionById(id)
                .map(service::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}