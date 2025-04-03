// TurnosService.java
package barto.backendCIMA.Services;

import barto.backendCIMA.Repository.TurnosRepository;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}