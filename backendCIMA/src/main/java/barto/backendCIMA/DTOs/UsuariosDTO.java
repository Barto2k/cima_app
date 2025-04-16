package barto.backendCIMA.DTOs;

import lombok.Data;

@Data
public class UsuariosDTO {
    private Integer id;
    private String nombre;
    private String clave;
    private String rol;

    // Constructor, getters y setters generados automáticamente por Lombok
}
