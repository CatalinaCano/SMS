import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { LoginService } from './login.service';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor(public _loginService: LoginService,  public router: Router) {

  }
  canActivate() {
    if (!this._loginService.estaLogueado()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
