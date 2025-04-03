// TipoTurno.java
package barto.backendCIMA.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tipo_turno")
@Data
public class TipoTurno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigoTipoTurno")
    private Integer codigo;

    @Column(name = "Descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "tipo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Turnos> turnos = new HashSet<>();
}