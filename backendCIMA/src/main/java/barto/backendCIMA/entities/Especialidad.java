// Especialidad.java
package barto.backendCIMA.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "especialidad")
@Data
public class Especialidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Codigo")
    private Integer codigo;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Vigente")
    private Boolean vigente;

    @OneToMany
    @JoinColumn(name = "codigoEspecialidad")
    private Set<Evolucion> evoluciones = new HashSet<>();

    @ManyToMany(mappedBy = "especialidades")
    private Set<Profesionales> profesionales = new HashSet<>();

    @OneToMany(mappedBy = "especialidad", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Turnos> turnos = new HashSet<>();
}