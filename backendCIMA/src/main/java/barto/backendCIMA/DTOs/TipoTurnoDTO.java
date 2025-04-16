package barto.backendCIMA.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class TipoTurnoDTO {
    private Integer codigo;
    private String descripcion;
    private List<Integer> turnos;
}
