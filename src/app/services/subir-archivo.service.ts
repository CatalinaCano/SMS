import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(public http: HttpClient) { }

  subirArchivo(codProveedor: string, nombreArchivo: string, base64: any) {

    let contenidoArchivo = base64.replace('data:text/plain;base64,', '');
    let url = URL_SERVICIOS + '/cargar?ruta=' + codProveedor + '&nombre=' + nombreArchivo + '&contenido=' + contenidoArchivo;
    return this.http.post(url, {codProveedor, nombreArchivo, contenidoArchivo })
                .map((resp: any) => {
                  console.log('se guardo con exito el archivo ' + resp);
                });
  }
}
