package barto.backendCIMA.DTOs;

import lombok.Data;

@Data
public class TurnosDTO {
    private Integer codigo;
    private String fechaYHora;
    private Integer paciente;
    private Integer profesional;
    private Integer especialidad;
    private Integer estadoTurno;
    private Integer tipoTurno;

}
