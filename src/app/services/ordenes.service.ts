import { Injectable } from '@angular/core';
import { Ordenes } from '../interfaces/ordenes.interface';


@Injectable()
export class OrdenesService {


  private ordenes: Ordenes[] = [
    {
      NUMERO_ORDEN: '120004'
    },
    {
      NUMERO_ORDEN: '120003'
    },

    {
      NUMERO_ORDEN: '120002'
    },

    {
      NUMERO_ORDEN: '120001'
    }
];

  constructor() {
    console.log('Servicio listo para usarse');
   }


   getOrdenes() {
     return this.ordenes;
   }
   obtenerDatosOrden( numeroOrden: string) {
       console.log('llego al servicio con parametro ' + numeroOrden);
   }


}
