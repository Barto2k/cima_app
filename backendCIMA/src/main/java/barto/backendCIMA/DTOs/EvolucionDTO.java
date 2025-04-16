package barto.backendCIMA.DTOs;

import lombok.Data;

@Data
public class EvolucionDTO {
    private Integer id;
    private String fecha;
    private String evolucion;
    private Integer codigoEspecialidad;
    private Integer codigoPaciente;
    private Integer codigoProfesional;

    // Constructor, getters y setters generados por Lombok
}
