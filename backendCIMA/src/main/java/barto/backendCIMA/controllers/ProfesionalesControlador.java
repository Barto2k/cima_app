package barto.backendCIMA.controllers;

import barto.backendCIMA.DTOs.ProfesionalesDTO;
import barto.backendCIMA.Services.ProfesionalesService;
import barto.backendCIMA.entities.Evolucion;
import barto.backendCIMA.entities.Profesionales;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/profesionales")
public class ProfesionalesControlador {
    private final ProfesionalesService service;

    @Autowired
    public ProfesionalesControlador(ProfesionalesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProfesionalesDTO> crearProfesional(@RequestBody Profesionales profesional) {
        Profesionales creado = service.createProfesional(profesional);
        ProfesionalesDTO dto = service.convertirADTO(creado);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<ProfesionalesDTO> actualizarProfesional(@RequestBody Profesionales profesional) {
        Profesionales actualizado = service.updateProfesional(profesional.getId(), profesional);
        ProfesionalesDTO dto = service.convertirADTO(actualizado);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProfesional(@PathVariable Integer id) {
        service.deleteProfesional(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ProfesionalesDTO>> obtenerProfesionales() {
        List<Profesionales> profesionales = service.getAllProfesionales();
        List<ProfesionalesDTO> dtos = service.convertirADTOs(profesionales);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfesionalesDTO> obtenerProfesionalPorId(@PathVariable Integer id) {
        return service.getProfesionalById(id)
                .map(service::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/evolucion")
    public ResponseEntity<ProfesionalesDTO> agregarEvolucion(@PathVariable Integer id, @RequestBody Evolucion evolucion) {
        Profesionales profesional = service.addEvolucion(id, evolucion);
        ProfesionalesDTO dto = service.convertirADTO(profesional);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{id}/turno")
    public ResponseEntity<ProfesionalesDTO> agregarTurno(@PathVariable Integer id, @RequestBody Turnos turno) {
        Profesionales profesional = service.addTurno(id, turno);
        ProfesionalesDTO dto = service.convertirADTO(profesional);
        return ResponseEntity.ok(dto);
    }
}