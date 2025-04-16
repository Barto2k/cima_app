package barto.backendCIMA.controllers;

import barto.backendCIMA.DTOs.EstadoTurnoDTO;
import barto.backendCIMA.Services.EstadoTurnoService;
import barto.backendCIMA.entities.EstadoTurno;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estado-turno")
public class EstadoTurnoController {
    private final EstadoTurnoService service;

    @Autowired
    public EstadoTurnoController(EstadoTurnoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EstadoTurnoDTO> crearEstadoTurno(@RequestBody EstadoTurno estadoTurno) {
        EstadoTurno creado = service.createEstadoTurno(estadoTurno);
        EstadoTurnoDTO dto = service.convertirADTO(creado);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<EstadoTurnoDTO> actualizarEstadoTurno(@RequestBody EstadoTurno estadoTurno) {
        EstadoTurno actualizado = service.updateEstadoTurno(estadoTurno.getCodigo(), estadoTurno);
        EstadoTurnoDTO dto = service.convertirADTO(actualizado);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEstadoTurno(@PathVariable Integer id) {
        service.deleteEstadoTurno(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<EstadoTurnoDTO>> obtenerEstadosTurno() {
        List<EstadoTurno> estadosTurno = service.getAllEstadosTurnos();
        List<EstadoTurnoDTO> dtos = service.convertirADTOs(estadosTurno);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstadoTurnoDTO> obtenerEstadoTurnoPorId(@PathVariable Integer id) {
        return service.getEstadoTurnoById(id)
                .map(service::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/turno")
    public ResponseEntity<EstadoTurnoDTO> agregarTurno(@PathVariable Integer id, @RequestBody Turnos turno) {
        EstadoTurno estadoTurno = service.addTurno(id, turno);
        EstadoTurnoDTO dto = service.convertirADTO(estadoTurno);
        return ResponseEntity.ok(dto);
    }


}