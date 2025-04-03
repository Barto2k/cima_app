// ProfesionalesService.java
package barto.backendCIMA.Services;

import barto.backendCIMA.Repository.ProfesionalesRepository;
import barto.backendCIMA.entities.Profesionales;
import barto.backendCIMA.entities.Especialidad;
import barto.backendCIMA.entities.Evolucion;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesionalesService {

    @Autowired
    private ProfesionalesRepository profesionalesRepository;

    // Crear un nuevo profesional
    public Profesionales createProfesional(Profesionales profesional) {
        return profesionalesRepository.save(profesional);
    }

    // Obtener todos los profesionales
    public List<Profesionales> getAllProfesionales() {
        return profesionalesRepository.findAll();
    }

    // Buscar un profesional por ID
    public Optional<Profesionales> getProfesionalById(Integer id) {
        return profesionalesRepository.findById(id);
    }

    // Actualizar un profesional
    public Profesionales updateProfesional(Integer id, Profesionales profesionalDetails) {
        Profesionales profesional = profesionalesRepository.findById(id).orElseThrow(() -> new RuntimeException("Profesional no encontrado"));
        profesional.setNombre(profesionalDetails.getNombre());
        profesional.setApellido(profesionalDetails.getApellido());
        profesional.setActivo(profesionalDetails.getActivo());
        profesional.setMatricula(profesionalDetails.getMatricula());
        return profesionalesRepository.save(profesional);
    }

    // Eliminar un profesional
    public void deleteProfesional(Integer id) {
        Profesionales profesional = profesionalesRepository.findById(id).orElseThrow(() -> new RuntimeException("Profesional no encontrado"));
        profesionalesRepository.delete(profesional);
    }

    // Agregar una especialidad a un profesional
    public Profesionales addEspecialidad(Integer id, Especialidad especialidad) {
        Profesionales profesional = profesionalesRepository.findById(id).orElseThrow(() -> new RuntimeException("Profesional no encontrado"));
        profesional.getEspecialidades().add(especialidad);
        return profesionalesRepository.save(profesional);
    }

    // Agregar una evolución a un profesional
    public Profesionales addEvolucion(Integer id, Evolucion evolucion) {
        Profesionales profesional = profesionalesRepository.findById(id).orElseThrow(() -> new RuntimeException("Profesional no encontrado"));
        profesional.getEvoluciones().add(evolucion);
        return profesionalesRepository.save(profesional);
    }

    // Agregar un turno a un profesional
    public Profesionales addTurno(Integer id, Turnos turno) {
        Profesionales profesional = profesionalesRepository.findById(id).orElseThrow(() -> new RuntimeException("Profesional no encontrado"));
        profesional.getTurnos().add(turno);
        return profesionalesRepository.save(profesional);
    }
}