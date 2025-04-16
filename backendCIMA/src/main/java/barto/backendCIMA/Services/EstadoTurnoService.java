// EstadoTurnoService.java
package barto.backendCIMA.Services;

import barto.backendCIMA.DTOs.EstadoTurnoDTO;
import barto.backendCIMA.Repository.EstadoTurnoRepository;
import barto.backendCIMA.entities.EstadoTurno;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoTurnoService {

    @Autowired
    private EstadoTurnoRepository estadoTurnoRepository;

    // Crear un nuevo estado de turno
    public EstadoTurno createEstadoTurno(EstadoTurno estadoTurno) {
        return estadoTurnoRepository.save(estadoTurno);
    }

    // Obtener todos los estados de turno
    public List<EstadoTurno> getAllEstadosTurnos() {
        return estadoTurnoRepository.findAll();
    }

    // Buscar un estado de turno por ID
    public Optional<EstadoTurno> getEstadoTurnoById(Integer id) {
        return estadoTurnoRepository.findById(id);
    }

    // Actualizar un estado de turno
    public EstadoTurno updateEstadoTurno(Integer id, EstadoTurno estadoTurnoDetails) {
        EstadoTurno estadoTurno = estadoTurnoRepository.findById(id).orElseThrow(() -> new RuntimeException("EstadoTurno no encontrado"));
        estadoTurno.setDescripcion(estadoTurnoDetails.getDescripcion());
        return estadoTurnoRepository.save(estadoTurno);
    }

    // Eliminar un estado de turno
    public void deleteEstadoTurno(Integer id) {
        EstadoTurno estadoTurno = estadoTurnoRepository.findById(id).orElseThrow(() -> new RuntimeException("EstadoTurno no encontrado"));
        estadoTurnoRepository.delete(estadoTurno);
    }

    // Agregar un turno a un estado de turno
    public EstadoTurno addTurno(Integer id, Turnos turno) {
        EstadoTurno estadoTurno = estadoTurnoRepository.findById(id).orElseThrow(() -> new RuntimeException("EstadoTurno no encontrado"));
        estadoTurno.getTurnos().add(turno);
        return estadoTurnoRepository.save(estadoTurno);
    }

    public EstadoTurnoDTO convertirADTO(EstadoTurno estadoTurno) {
        EstadoTurnoDTO dto = new EstadoTurnoDTO();
        dto.setCodigo(estadoTurno.getCodigo());
        dto.setDescripcion(estadoTurno.getDescripcion());
        dto.setTurnos(estadoTurno.getTurnos().stream()
                .map(Turnos::getId)
                .toList());
        return dto;
    }

    public List<EstadoTurnoDTO> convertirADTOs(List<EstadoTurno> estadosTurno) {
        return estadosTurno.stream()
                .map(this::convertirADTO)
                .toList();
    }
}