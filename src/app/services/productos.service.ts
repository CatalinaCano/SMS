import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable()
export class ProductosService {
  constructor( public http: HttpClient) { }

  buscarProductosPorCliente ( idCliente: string, palabra: string) {
    console.log('Llega a buscar con id de cliente ' + idCliente + palabra);
    let url = URL_SERVICIOS + '/producto?codigoCliente=' + idCliente + '&palabra=' + palabra.toUpperCase();
    return this.http.get(url).pipe(
      catchError(
        err => {
          swal('Error', 'Error con el Web service al cargar los productos', 'error');
          return Observable.throw(err);
        }
    ));
  }

  buscarProductosPorPalabra(termino: string) {
    console.log(termino);
  }
}
