import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable()
export class ProductosService {

  private productos: Producto[] = [
    {
      codigoProducto: '1690',
      descripcionProducto : 'Vencimiento Endosos'
    },
    {
      codigoProducto: '1698',
      descripcionProducto : 'Revista 1'
    },
    {
      codigoProducto: '1713',
      descripcionProducto : 'Sodimac Colombia S.A.'
    },
    {
      codigoProducto: '1734',
      descripcionProducto : 'Facturacion EPS'
    }
  ];
  constructor() { }

  getProductos() {
    return this.productos;
  }
}
