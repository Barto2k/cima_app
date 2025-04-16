package barto.backendCIMA.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class PacientesDTO {
    private Integer idPaciente;
    private String nombre;
    private String apellido;
    private String dni;
    private List<Integer> evoluciones;
    private List<Integer> turnos;

    // Constructor, getters y setters generados automáticamente por Lombok
}
