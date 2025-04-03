package barto.backendCIMA.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "turnos")
@Data
public class Turnos {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "idTurno")
    private Integer id;

    @Column (name = "fechaHora")
    private String fechaHora;

    @ManyToOne
    @JoinColumn(name = "codigoEspecialidad")
    private Especialidad especialidad;

    @ManyToOne
    @JoinColumn(name = "codigoPaciente")
    private Pacientes paciente;

    @ManyToOne
    @JoinColumn(name = "codigoProfesional")
    private Profesionales profesional;

    @ManyToOne
    @JoinColumn(name = "codigoEstadoTurno")
    private EstadoTurno estado;

    @ManyToOne
    @JoinColumn(name = "codigoTipoTurno")
    private TipoTurno tipo;

}
