// EstadoTurno.java
package barto.backendCIMA.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "estado_turno")
@Data

public class EstadoTurno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigoEstadoTurno")
    private Integer codigo;

    @Column(name = "Descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "estado", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Turnos> turnos = new HashSet<>();
}