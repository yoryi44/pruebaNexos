package co.com.nexos.prueba.service.mapper;

import co.com.nexos.prueba.domain.Producto;
import co.com.nexos.prueba.service.dto.ProductoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Producto} and its DTO {@link ProductoDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductoMapper extends EntityMapper<ProductoDTO, Producto> {}
