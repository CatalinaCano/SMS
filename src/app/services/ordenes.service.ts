import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class OrdenesService {


  constructor(public http: HttpClient) {}
   obtenerDatosOrden( numeroOrden: string) {
       console.log('llego al servicio con parametro ' + numeroOrden);
   }


}
