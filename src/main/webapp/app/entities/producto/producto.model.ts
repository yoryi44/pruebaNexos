import dayjs from 'dayjs/esm';

export interface IProducto {
  id: number;
  nombre?: string | null;
  cantidad?: number | null;
  fechaIngreso?: dayjs.Dayjs | null;
  fechaCreacion?: dayjs.Dayjs | null;
  fechaModificacion?: dayjs.Dayjs | null;
  usuarioCreacion?: string | null;
  usuarioModificacion?: string | null;
}

export type NewProducto = Omit<IProducto, 'id'> & { id: null };
