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
  },
  {
    CODIGO_PROVEDOR: '3',
    RAZON_SOCIAL_PROVEDOR : 'INFOBIP1'
},
{
  CODIGO_PROVEDOR: '4',
  RAZON_SOCIAL_PROVEDOR : 'INFOBIP2'
},
{
  CODIGO_PROVEDOR: '5',
  RAZON_SOCIAL_PROVEDOR : 'INFOBIP3'
}

];

  constructor() {
    console.log('Servicio listo para usarse');
   }

   getProvedores() {
     return this.proveedores;
   }
}
