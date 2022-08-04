import dayjs from 'dayjs/esm';

import { IProducto, NewProducto } from './producto.model';

export const sampleWithRequiredData: IProducto = {
  id: 52354,
};

export const sampleWithPartialData: IProducto = {
  id: 41028,
  nombre: 'Intercambiable fidelidad',
  fechaIngreso: dayjs('2022-08-04T03:49'),
  fechaCreacion: dayjs('2022-08-04T06:29'),
  fechaModificacion: dayjs('2022-08-04T02:45'),
};

export const sampleWithFullData: IProducto = {
  id: 56811,
  nombre: 'Humano Fantástico Normas',
  cantidad: 54651,
  fechaIngreso: dayjs('2022-08-04T08:52'),
  fechaCreacion: dayjs('2022-08-04T16:57'),
  fechaModificacion: dayjs('2022-08-04T11:19'),
  usuarioCreacion: 'Pequeño el',
  usuarioModificacion: 'extranet',
};

export const sampleWithNewData: NewProducto = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
