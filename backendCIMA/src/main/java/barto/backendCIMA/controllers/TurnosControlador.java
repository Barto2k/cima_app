package barto.backendCIMA.controllers;

import barto.backendCIMA.DTOs.TurnosDTO;
import barto.backendCIMA.Services.TurnosService;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/turnos")
public class TurnosControlador {
    private final TurnosService service;

    @Autowired
    public TurnosControlador(TurnosService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TurnosDTO> crearTurno(@RequestBody Turnos turno) {
        Turnos creado = service.createTurno(turno);
        TurnosDTO dto = service.convertirADTO(creado);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<TurnosDTO> actualizarTurno(@RequestBody Turnos turno) {
        Turnos actualizado = service.updateTurno(turno.getId(), turno);
        TurnosDTO dto = service.convertirADTO(actualizado);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTurno(@PathVariable Integer id) {
        service.deleteTurno(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TurnosDTO>> obtenerTurnos() {
        List<Turnos> turnos = service.getAllTurnos();
        List<TurnosDTO> dtos = service.convertirADTOs(turnos);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurnosDTO> obtenerTurnoPorId(@PathVariable Integer id) {
        return service.getTurnoById(id)
                .map(service::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}