package barto.backendCIMA.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table (name = "evolucion")
@Data
public class Evolucion {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "codigo")
    private Integer codigo;

    @Column (name = "fecha")
    private Timestamp fecha;

    @Column (name = "evolucion")
    private String evolucion;

    @ManyToOne
    @JoinColumn (name = "codigoEspecialidad")
    private Especialidad codigoEspecialidad;

    @ManyToOne
    @JoinColumn (name = "codigoPaciente")
    private Pacientes codigoPaciente;

    @ManyToOne
    @JoinColumn (name = "codigoProfesional")
    private Profesionales codigoProfesional;
}
