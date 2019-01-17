import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import swal from 'sweetalert2';



@Injectable()
export class OrdenesService {


  constructor(public http: HttpClient) {}

   obtenerDatosOrden( numeroOrden: string) {
       let url = URL_SERVICIOS + '/validarOrden?numero=' + numeroOrden;
       console.log(url);
       return this.http.get(url).pipe(
        catchError(
          err => {
            swal('Error', 'Error al validar el número de orden', 'error');
            return Observable.throw(err);
          }
        ));
   }
}
