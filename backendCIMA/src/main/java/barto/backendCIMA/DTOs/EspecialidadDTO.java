package barto.backendCIMA.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class EspecialidadDTO {
    private int codigo;
    private String nombre;
    private boolean vigente;
    private List<Integer> profesionales;
    private List<Integer> turnos;
    private List<Integer> evoluciones;
}
