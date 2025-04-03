package barto.backendCIMA.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "usuarios")
@Data
public class Usuarios {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "idUsuario")
    private Integer id;

    @Column (name = "Nombre")
    private String nombre;

    @Column (name = "Clave")
    private String clave;

    @Column (name = "Rol")
    private String rol;
}
