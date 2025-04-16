// PacientesService.java
package barto.backendCIMA.Services;

import barto.backendCIMA.DTOs.EspecialidadDTO;
import barto.backendCIMA.DTOs.PacientesDTO;
import barto.backendCIMA.Repository.PacientesRepository;
import barto.backendCIMA.entities.Pacientes;
import barto.backendCIMA.entities.Evolucion;
import barto.backendCIMA.entities.Profesionales;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PacientesService {

    @Autowired
    private PacientesRepository pacientesRepository;

    // Crear un nuevo paciente
    public Pacientes createPaciente(Pacientes paciente) {
        return pacientesRepository.save(paciente);
    }

    // Obtener todos los pacientes
    public List<Pacientes> getAllPacientes() {
        return pacientesRepository.findAll();
    }

    // Buscar un paciente por ID
    public Optional<Pacientes> getPacienteById(Integer id) {
        return pacientesRepository.findById(id);
    }

    // Actualizar un paciente
    public Pacientes updatePaciente(Integer id, Pacientes pacienteDetails) {
        Pacientes paciente = pacientesRepository.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        paciente.setNombre(pacienteDetails.getNombre());
        paciente.setApellido(pacienteDetails.getApellido());
        paciente.setDni(pacienteDetails.getDni());
        return pacientesRepository.save(paciente);
    }

    // Eliminar un paciente
    public void deletePaciente(Integer id) {
        Pacientes paciente = pacientesRepository.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        pacientesRepository.delete(paciente);
    }

    // Agregar una evolución a un paciente
    public Pacientes addEvolucion(Integer id, Evolucion evolucion) {
        Pacientes paciente = pacientesRepository.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        paciente.getEvoluciones().add(evolucion);
        return pacientesRepository.save(paciente);
    }

    // Agregar un turno a un paciente
    public Pacientes addTurno(Integer id, Turnos turno) {
        Pacientes paciente = pacientesRepository.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        paciente.getTurnos().add(turno);
        return pacientesRepository.save(paciente);
    }

    public PacientesDTO convertirADTO(Pacientes creado) {
        PacientesDTO dto = new PacientesDTO();
        dto.setIdPaciente(creado.getId());
        dto.setNombre(creado.getNombre());
        dto.setApellido(creado.getApellido());
        dto.setDni(creado.getDni());
        dto.setEvoluciones(creado.getEvoluciones().stream().map(Evolucion::getCodigo).toList());
        dto.setTurnos(creado.getTurnos().stream().map(Turnos::getId).toList());

        return dto;
    }

    public List<PacientesDTO> convertirADTOs(List<Pacientes> pacientes) {
        return pacientes.stream().map(this::convertirADTO).collect(Collectors.toList());
    }
}