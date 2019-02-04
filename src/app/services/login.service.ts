import { Injectable } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';



@Injectable()
export class LoginService {

  tokenUsuario: any = undefined;
  name: any = undefined;

  constructor(private adalSvc: MsAdalAngular6Service) {
    this.cargarLocalStorage();
   this.adalSvc.acquireToken('https://graph.microsoft.com').subscribe((res: string) => {
    this.guardarStorage(res, this.adalSvc.userInfo.userName);
    });
   }
    cargarLocalStorage() {
      console.log('Cargar localStorage');
      if (localStorage.getItem('token')) {
        this.tokenUsuario = localStorage.getItem('token');
        this.name = localStorage.getItem('nombre');
    } else {
      this.tokenUsuario = undefined;
      this.name = undefined;
    }
    }

    guardarStorage(token: string, nombre: string) {
      localStorage.setItem('token', token);
      localStorage.setItem('nombre', nombre);
      this.tokenUsuario = token;
      this.name = nombre;
    }
    obtenerNombreUsuario() {
      return localStorage.getItem('nombre');
    }

    obtenerToken() {
      return localStorage.getItem('token');
    }

   logout() {
    this.adalSvc.logout();
  }

estaLogueado() {
  if (this.tokenUsuario === null || this.tokenUsuario === 'undefined' ) {
    localStorage.removeItem('token');
    localStorage.clear();
    return false;
  }
return true;
}

}
