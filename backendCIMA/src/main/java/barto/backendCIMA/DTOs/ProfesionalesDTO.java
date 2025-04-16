package barto.backendCIMA.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class ProfesionalesDTO {
    private Integer id;
    private String nombre;
    private String apellido;
    private Boolean activo;
    private Integer matricula;
    private List<Integer> especialidades;
    private List<Integer> turnos;


    // Constructor, getters y setters generados automáticamente por Lombok
}
