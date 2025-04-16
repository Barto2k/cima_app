// TipoTurnoService.java
package barto.backendCIMA.Services;

import barto.backendCIMA.DTOs.TipoTurnoDTO;
import barto.backendCIMA.Repository.TipoTurnoRepository;
import barto.backendCIMA.entities.TipoTurno;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TipoTurnoService {

    @Autowired
    private TipoTurnoRepository tipoTurnoRepository;

    // Crear un nuevo tipo de turno
    public TipoTurno createTipoTurno(TipoTurno tipoTurno) {
        return tipoTurnoRepository.save(tipoTurno);
    }

    // Obtener todos los tipos de turno
    public List<TipoTurno> getAllTipoTurnos() {
        return tipoTurnoRepository.findAll();
    }

    // Buscar un tipo de turno por ID
    public Optional<TipoTurno> getTipoTurnoById(Integer id) {
        return tipoTurnoRepository.findById(id);
    }

    // Actualizar un tipo de turno
    public TipoTurno updateTipoTurno(Integer id, TipoTurno tipoTurnoDetails) {
        TipoTurno tipoTurno = tipoTurnoRepository.findById(id).orElseThrow(() -> new RuntimeException("TipoTurno no encontrado"));
        tipoTurno.setDescripcion(tipoTurnoDetails.getDescripcion());
        return tipoTurnoRepository.save(tipoTurno);
    }

    // Eliminar un tipo de turno
    public void deleteTipoTurno(Integer id) {
        TipoTurno tipoTurno = tipoTurnoRepository.findById(id).orElseThrow(() -> new RuntimeException("TipoTurno no encontrado"));
        tipoTurnoRepository.delete(tipoTurno);
    }

    // Agregar un turno a un tipo de turno
    public TipoTurno addTurno(Integer id, Turnos turno) {
        TipoTurno tipoTurno = tipoTurnoRepository.findById(id).orElseThrow(() -> new RuntimeException("TipoTurno no encontrado"));
        tipoTurno.getTurnos().add(turno);
        return tipoTurnoRepository.save(tipoTurno);
    }

    public TipoTurnoDTO convertirADTO(TipoTurno creado) {
        TipoTurnoDTO dto = new TipoTurnoDTO();
        dto.setCodigo(creado.getCodigo());
        dto.setDescripcion(creado.getDescripcion());
        dto.setTurnos(creado.getTurnos().stream().map(Turnos::getId).collect(Collectors.toList()));
        return dto;
    }

    public List<TipoTurnoDTO> convertirADTOs(List<TipoTurno> tiposTurno) {
        return tiposTurno.stream().map(this::convertirADTO).collect(Collectors.toList());
    }
}