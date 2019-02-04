import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'APP';
  constructor( public _loginService: LoginService) {
   }

  ngOnInit() {
  }

  salir() {
    this._loginService.logout();
  }

}
