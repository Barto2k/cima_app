// Profesionales.java
package barto.backendCIMA.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "profesionales")
@Data
public class Profesionales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProfesional")
    private Integer id;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Apellido")
    private String apellido;

    @Column(name = "Activo")
    private Boolean activo;

    @Column(name = "Matricula")
    private Integer matricula;

    @OneToMany
    @JoinColumn(name = "codigoProfesional")
    private Set<Evolucion> evoluciones = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "profesional_especialidad",
            joinColumns = @JoinColumn(name = "IdProfesional"),
            inverseJoinColumns = @JoinColumn(name = "Codigo")
    )
    private Set<Especialidad> especialidades = new HashSet<>();

    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Turnos> turnos = new HashSet<>();

//    // Método para agregar especialidad
//    public void addEspecialidad(Especialidad especialidad) {
//        this.especialidades.add(especialidad);
//        especialidad.getProfesionales().add(this);
//    }
}