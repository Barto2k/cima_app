package barto.backendCIMA.Repository;

import barto.backendCIMA.entities.Profesionales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesionalesRepository extends JpaRepository<Profesionales, Integer> {
}
