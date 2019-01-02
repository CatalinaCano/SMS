import { Injectable } from '@angular/core';
import { Ordenes } from '../interfaces/ordenes.interface';


@Injectable()
export class OrdenesService {


  private ordenes: Ordenes[] = [
    {
      NUMERO_ORDEN: '120004',
      cliente: {
        RAZON_SOCIAL: 'DELIMA MARSH S.A. LOS CORREDORES DE SEGUROS',
        NUMERO_IDENTIFICACION_CLIENTE: '8903015840',
        CODIGO_CLIENTE: '228'
      },
      producto: {
        CODIGO_PRODUCTO: '1690',
        DESCRIPCION_PRODUCTO : 'Vencimiento Endosos'
      }
    },
    {
      NUMERO_ORDEN: '120003',
      cliente: {
        RAZON_SOCIAL: 'PANAMERICANA FORMAS E IMPRESOS S.A.',
        NUMERO_IDENTIFICACION_CLIENTE: '8001754575',
        CODIGO_CLIENTE: '229'
      },
      producto: {
        CODIGO_PRODUCTO: '1698',
        DESCRIPCION_PRODUCTO : 'Revista 1'
      }
    },

    {
      NUMERO_ORDEN: '120002',
      cliente: {
        RAZON_SOCIAL: 'CADENA COURRIER S.A.S.',
    NUMERO_IDENTIFICACION_CLIENTE: '8305074121',
    CODIGO_CLIENTE: '230'
      },
      producto: {
        CODIGO_PRODUCTO: '1713',
        DESCRIPCION_PRODUCTO : 'Sodimac Colombia S.A.'
      }
    },

    {
      NUMERO_ORDEN: '120001',
      cliente: {
        RAZON_SOCIAL: 'EPS SANITAS S.A.',
    NUMERO_IDENTIFICACION_CLIENTE: '8002514406',
    CODIGO_CLIENTE: '231'
      },
      producto: {
        CODIGO_PRODUCTO: '1734',
        DESCRIPCION_PRODUCTO : 'Facturacion EPS'
      }
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
