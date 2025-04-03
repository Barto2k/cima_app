package barto.backendCIMA.Repository;

import barto.backendCIMA.entities.TipoTurno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoTurnoRepository extends JpaRepository<TipoTurno, Integer> {
}
