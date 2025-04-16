// EspecialidadService.java
package barto.backendCIMA.Services;

import barto.backendCIMA.DTOs.EspecialidadDTO;
import barto.backendCIMA.Repository.EspecialidadRepository;
import barto.backendCIMA.entities.Especialidad;
import barto.backendCIMA.entities.Evolucion;
import barto.backendCIMA.entities.Profesionales;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadService {

    @Autowired
    private EspecialidadRepository especialidadRepository;

    // Crear una nueva especialidad
    public Especialidad createEspecialidad(Especialidad especialidad) {
        return especialidadRepository.save(especialidad);
    }

    // Obtener todas las especialidades
    public List<Especialidad> getAllEspecialidades() {
        return especialidadRepository.findAll();
    }

    // Buscar una especialidad por ID
    public Optional<Especialidad> getEspecialidadById(Integer id) {
        return especialidadRepository.findById(id);
    }

    // Actualizar una especialidad
    public Especialidad updateEspecialidad(Integer id, Especialidad especialidadDetails) {
        Especialidad especialidad = especialidadRepository.findById(id).orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));
        especialidad.setNombre(especialidadDetails.getNombre());
        especialidad.setVigente(especialidadDetails.getVigente());
        return especialidadRepository.save(especialidad);
    }

    // Eliminar una especialidad
    public void deleteEspecialidad(Integer id) {
        Especialidad especialidad = especialidadRepository.findById(id).orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));
        especialidadRepository.delete(especialidad);
    }

    // Agregar una evolución a una especialidad
    public Especialidad addEvolucion(Integer id, Evolucion evolucion) {
        Especialidad especialidad = especialidadRepository.findById(id).orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));
        especialidad.getEvoluciones().add(evolucion);
        return especialidadRepository.save(especialidad);
    }

    // Agregar un profesional a una especialidad
    public Especialidad addProfesional(Integer id, Profesionales profesional) {
        Especialidad especialidad = especialidadRepository.findById(id).orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));
        especialidad.getProfesionales().add(profesional);
        return especialidadRepository.save(especialidad);
    }

    // Agregar un turno a una especialidad
    public Especialidad addTurno(Integer id, Turnos turno) {
        Especialidad especialidad = especialidadRepository.findById(id).orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));
        especialidad.getTurnos().add(turno);
        return especialidadRepository.save(especialidad);
    }

    public EspecialidadDTO convertirADTO(Especialidad creado) {
        EspecialidadDTO dto = new EspecialidadDTO();
        dto.setCodigo(creado.getCodigo());
        dto.setNombre(creado.getNombre());
        dto.setVigente(creado.getVigente());
        dto.setProfesionales(creado.getProfesionales().stream().map(Profesionales::getId).toList());
        dto.setTurnos(creado.getTurnos().stream().map(Turnos::getId).toList());
        dto.setEvoluciones(creado.getEvoluciones().stream().map(Evolucion::getCodigo).toList());

        return dto;
    }

    public List<EspecialidadDTO> convertirADTOs(List<Especialidad> especialidades) {
        return especialidades.stream().map(this::convertirADTO).toList();
    }
}