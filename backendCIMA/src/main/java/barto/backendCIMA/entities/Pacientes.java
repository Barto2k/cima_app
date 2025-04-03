// Pacientes.java
package barto.backendCIMA.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pacientes")
@Data
public class Pacientes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPaciente")
    private Integer id;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Apellido")
    private String apellido;

    @Column(name = "DNI")
    private String dni;

    @OneToMany
    @JoinColumn(name = "codigoPaciente")
    private Set<Evolucion> evoluciones = new HashSet<>();

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Turnos> turnos = new HashSet<>();
}