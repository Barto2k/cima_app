package barto.backendCIMA.Repository;

import barto.backendCIMA.entities.Evolucion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvolucionRepository extends JpaRepository<Evolucion, Integer> {
}
