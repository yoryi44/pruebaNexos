package co.com.nexos.prueba.repository;

import co.com.nexos.prueba.domain.Producto;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Producto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query("SELECT COUNT(p.id) FROM Producto p WHERE p.nombre=:nombre")
    int countProductForName(@Param("nombre") String name);

}
