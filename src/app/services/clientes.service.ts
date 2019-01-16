import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';


@Injectable()
export class ClientesService {

    /*
    * Para poder realizar peticiones HTTP debe implementarse un public http: HttpClient
    */

  constructor( public http: HttpClient  ) {}

   buscarClientes( termino: string) {
     let url = URL_SERVICIOS + '/consultar?palabra=' + termino.toUpperCase();
      return this.http.get(url).pipe(
        catchError(
          err => {
            swal('Error', 'Error al cargar Clientes', 'error');
            return Observable.throw(err);
          }
        ));
   }
  }
