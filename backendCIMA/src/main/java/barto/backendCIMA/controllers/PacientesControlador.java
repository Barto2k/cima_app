package barto.backendCIMA.controllers;

import barto.backendCIMA.DTOs.PacientesDTO;
import barto.backendCIMA.Services.PacientesService;
import barto.backendCIMA.entities.Evolucion;
import barto.backendCIMA.entities.Pacientes;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pacientes")
public class PacientesControlador {
    private final PacientesService service;

    @Autowired
    public PacientesControlador(PacientesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PacientesDTO> crearPaciente(@RequestBody Pacientes paciente) {
        Pacientes creado = service.createPaciente(paciente);
        PacientesDTO dto = service.convertirADTO(creado);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<PacientesDTO> actualizarPaciente(@RequestBody Pacientes paciente) {
        Pacientes actualizado = service.updatePaciente(paciente.getId(), paciente);
        PacientesDTO dto = service.convertirADTO(actualizado);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPaciente(@PathVariable Integer id) {
        service.deletePaciente(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<PacientesDTO>> obtenerPacientes() {
        List<Pacientes> pacientes = service.getAllPacientes();
        List<PacientesDTO> dtos = service.convertirADTOs(pacientes);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacientesDTO> obtenerPacientePorId(@PathVariable Integer id) {
        return service.getPacienteById(id)
                .map(service::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/evolucion")
    public ResponseEntity<PacientesDTO> agregarEvolucion(@PathVariable Integer id, @RequestBody Evolucion evolucion) {
        Pacientes paciente = service.addEvolucion(id, evolucion);
        PacientesDTO dto = service.convertirADTO(paciente);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{id}/turno")
    public ResponseEntity<PacientesDTO> agregarTurno(@PathVariable Integer id, @RequestBody Turnos turno) {
        Pacientes paciente = service.addTurno(id, turno);
        PacientesDTO dto = service.convertirADTO(paciente);
        return ResponseEntity.ok(dto);
    }
}