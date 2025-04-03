package barto.backendCIMA.Repository;

import barto.backendCIMA.entities.EstadoTurno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoTurnoRepository extends JpaRepository<EstadoTurno, Integer> {
}
