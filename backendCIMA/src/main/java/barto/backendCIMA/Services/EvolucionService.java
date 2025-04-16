// EvolucionService.java
package barto.backendCIMA.Services;

import barto.backendCIMA.DTOs.EvolucionDTO;
import barto.backendCIMA.Repository.EvolucionRepository;
import barto.backendCIMA.entities.Evolucion;
import barto.backendCIMA.entities.Turnos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EvolucionService {

    @Autowired
    private EvolucionRepository evolucionRepository;

    // Crear una nueva evolución
    public Evolucion createEvolucion(Evolucion evolucion) {
        return evolucionRepository.save(evolucion);
    }

    // Obtener todas las evoluciones
    public List<Evolucion> getAllEvoluciones() {
        return evolucionRepository.findAll();
    }

    // Buscar una evolución por ID
    public Optional<Evolucion> getEvolucionById(Integer id) {
        return evolucionRepository.findById(id);
    }

    // Actualizar una evolución
    public Evolucion updateEvolucion(Integer id, Evolucion evolucionDetails) {
        Evolucion evolucion = evolucionRepository.findById(id).orElseThrow(() -> new RuntimeException("Evolución no encontrada"));
        evolucion.setFecha(evolucionDetails.getFecha());
        evolucion.setEvolucion(evolucionDetails.getEvolucion());
        evolucion.setCodigoEspecialidad(evolucionDetails.getCodigoEspecialidad());
        evolucion.setCodigoPaciente(evolucionDetails.getCodigoPaciente());
        evolucion.setCodigoProfesional(evolucionDetails.getCodigoProfesional());
        return evolucionRepository.save(evolucion);
    }

    // Eliminar una evolución
    public void deleteEvolucion(Integer id) {
        Evolucion evolucion = evolucionRepository.findById(id).orElseThrow(() -> new RuntimeException("Evolución no encontrada"));
        evolucionRepository.delete(evolucion);
    }

    public EvolucionDTO convertirADTO(Evolucion creada) {
        EvolucionDTO dto = new EvolucionDTO();
        dto.setId(creada.getCodigo());
        dto.setFecha(String.valueOf(creada.getFecha()));
        dto.setEvolucion(creada.getEvolucion());
        dto.setCodigoEspecialidad(creada.getCodigoEspecialidad().getCodigo());
        dto.setCodigoPaciente(creada.getCodigoPaciente().getId());
        dto.setCodigoProfesional(creada.getCodigoProfesional().getId());
        return dto;
    }

    public List<EvolucionDTO> convertirADTOs(List<Evolucion> evoluciones) {
        return evoluciones.stream()
                .map(this::convertirADTO)
                .toList();
    }
}