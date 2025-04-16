// TurnosService.java
package barto.backendCIMA.Services;

import barto.backendCIMA.DTOs.TurnosDTO;
import barto.backendCIMA.Repository.TurnosRepository;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TurnosService {

    @Autowired
    private TurnosRepository turnosRepository;

    // Crear un nuevo turno
    public Turnos createTurno(Turnos turno) {
        return turnosRepository.save(turno);
    }

    // Obtener todos los turnos
    public List<Turnos> getAllTurnos() {
        return turnosRepository.findAll();
    }

    // Buscar un turno por ID
    public Optional<Turnos> getTurnoById(Integer id) {
        return turnosRepository.findById(id);
    }

    // Actualizar un turno
    public Turnos updateTurno(Integer id, Turnos turnoDetails) {
        Turnos turno = turnosRepository.findById(id).orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        turno.setFechaHora(turnoDetails.getFechaHora());
        turno.setEspecialidad(turnoDetails.getEspecialidad());
        turno.setPaciente(turnoDetails.getPaciente());
        turno.setProfesional(turnoDetails.getProfesional());
        turno.setEstado(turnoDetails.getEstado());
        turno.setTipo(turnoDetails.getTipo());
        return turnosRepository.save(turno);
    }

    // Eliminar un turno
    public void deleteTurno(Integer id) {
        Turnos turno = turnosRepository.findById(id).orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        turnosRepository.delete(turno);
    }

    public TurnosDTO convertirADTO(Turnos creado) {
        TurnosDTO dto = new TurnosDTO();
        dto.setCodigo(creado.getId());
        dto.setFechaYHora(creado.getFechaHora());
        dto.setPaciente(creado.getPaciente().getId());
        dto.setProfesional(creado.getProfesional().getId());
        dto.setEspecialidad(creado.getEspecialidad().getCodigo());
        dto.setEstadoTurno(creado.getEstado().getCodigo());
        dto.setTipoTurno(creado.getTipo().getCodigo());
        return dto;
    }

    public List<TurnosDTO> convertirADTOs(List<Turnos> turnos) {
        return turnos.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
}