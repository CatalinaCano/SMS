import { Injectable } from '@angular/core';
import { Proveedores } from '../interfaces/proveedores.interface';

@Injectable()
export class ProveedoresService {
  private proveedores: Proveedores[] = [
    {
        CODIGO_PROVEDOR: '1',
        RAZON_SOCIAL_PROVEDOR : 'MASIVIAN'
    },
    {
      CODIGO_PROVEDOR: '2',
      RAZON_SOCIAL_PROVEDOR : 'INFOBIP'
  }
];

  constructor() {
    console.log('Servicio listo para usarse');
   }

   getProvedores() {
     return this.proveedores;
   }
}
