package barto.backendCIMA.controllers;

import barto.backendCIMA.DTOs.TipoTurnoDTO;
import barto.backendCIMA.Services.TipoTurnoService;
import barto.backendCIMA.entities.TipoTurno;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tipo-turno")
public class TipoTurnoControlador {
    private final TipoTurnoService service;

    @Autowired
    public TipoTurnoControlador(TipoTurnoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TipoTurnoDTO> crearTipoTurno(@RequestBody TipoTurno tipoTurno) {
        TipoTurno creado = service.createTipoTurno(tipoTurno);
        TipoTurnoDTO dto = service.convertirADTO(creado);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<TipoTurnoDTO> actualizarTipoTurno(@RequestBody TipoTurno tipoTurno) {
        TipoTurno actualizado = service.updateTipoTurno(tipoTurno.getCodigo(), tipoTurno);
        TipoTurnoDTO dto = service.convertirADTO(actualizado);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTipoTurno(@PathVariable Integer id) {
        service.deleteTipoTurno(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TipoTurnoDTO>> obtenerTiposTurno() {
        List<TipoTurno> tiposTurno = service.getAllTipoTurnos();
        List<TipoTurnoDTO> dtos = service.convertirADTOs(tiposTurno);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoTurnoDTO> obtenerTipoTurnoPorId(@PathVariable Integer id) {
        return service.getTipoTurnoById(id)
                .map(service::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}