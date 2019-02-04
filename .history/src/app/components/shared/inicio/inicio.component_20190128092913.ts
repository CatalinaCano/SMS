import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  nombreUsuario = undefined;

  constructor( public _loginService: LoginService) {
      this.nombreUsuario = this._loginService.obtenerNombreUsuario();
   }

  ngOnInit() {
  }

}
