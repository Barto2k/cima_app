package barto.backendCIMA.Repository;

import barto.backendCIMA.entities.Turnos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurnosRepository extends JpaRepository<Turnos, Integer> {
}
