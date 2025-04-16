package barto.backendCIMA.controllers;

import barto.backendCIMA.DTOs.EspecialidadDTO;
import barto.backendCIMA.Services.EspecialidadService;
import barto.backendCIMA.entities.Especialidad;
import barto.backendCIMA.entities.Evolucion;
import barto.backendCIMA.entities.Profesionales;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/especialidad")
public class EspecialidadController {
    private final EspecialidadService service;

    @Autowired
    public EspecialidadController(EspecialidadService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EspecialidadDTO> crearEspecialidad(@RequestBody Especialidad especialidad) {
        Especialidad creado = service.createEspecialidad(especialidad);
        EspecialidadDTO dto = service.convertirADTO(creado);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<EspecialidadDTO> actualizarEspecialidad(@RequestBody Especialidad especialidad) {
        Especialidad actualizado = service.updateEspecialidad(especialidad.getCodigo(), especialidad);
        EspecialidadDTO dto = service.convertirADTO(actualizado);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEspecialidad(@PathVariable Integer id) {
        service.deleteEspecialidad(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping()
    public ResponseEntity<List<EspecialidadDTO>> obtenerEspecialidades() {
        List<Especialidad> especialidades = service.getAllEspecialidades();
        List<EspecialidadDTO> dtos = service.convertirADTOs(especialidades);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EspecialidadDTO> obtenerEspecialidadPorId(@PathVariable Integer id) {
        return service.getEspecialidadById(id)
                .map(service::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/turnos")
    public ResponseEntity<EspecialidadDTO> agregarTurnoAEspecialidad(
            @PathVariable Integer id,
            @RequestBody Turnos turno) {
        Especialidad especialidad = service.addTurno(id, turno);
        EspecialidadDTO dto = service.convertirADTO(especialidad);
        return ResponseEntity.ok(dto);
    }

    // Endpoint para agregar un profesional a una especialidad
    @PostMapping("/{id}/profesionales")
    public ResponseEntity<EspecialidadDTO> agregarProfesionalAEspecialidad(
            @PathVariable Integer id,
            @RequestBody Profesionales profesional) {
        Especialidad especialidad = service.addProfesional(id, profesional);
        EspecialidadDTO dto = service.convertirADTO(especialidad);
        return ResponseEntity.ok(dto);
    }

    // Endpoint para agregar una evolución a una especialidad
    @PostMapping("/{id}/evoluciones")
    public ResponseEntity<EspecialidadDTO> agregarEvolucionAEspecialidad(
            @PathVariable Integer id,
            @RequestBody Evolucion evolucion) {
        Especialidad especialidad = service.addEvolucion(id, evolucion);
        EspecialidadDTO dto = service.convertirADTO(especialidad);
        return ResponseEntity.ok(dto);
    }
}