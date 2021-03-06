import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable()
export class ProveedoresService {

  constructor(public http: HttpClient ) {}

   buscarProveedores( termino: string) {
    let url = URL_SERVICIOS + '/proveedor?palabra=' + termino.toUpperCase();
     return this.http.get(url).pipe(
       catchError(
         err => {
           swal('Error', 'Error al cargar Proveedores', 'error');
           return Observable.throw(err);
         }
       ));
  }
}
