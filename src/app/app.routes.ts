import { RouterModule, Routes} from '@angular/router';

import { FormularioComponent } from './components/formulario/formulario.component';
import { InformacionComponent } from './components/shared/informacion/informacion.component';
import { InicioComponent } from './components/shared/inicio/inicio.component';
import { FormComponent } from './components/form/form.component';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { LoginGuard } from './services/login.guard';

const APP_ROUTES: Routes = [
    {path: 'inicio', component: InicioComponent, canActivate: [AuthenticationGuard, LoginGuard] },
    {path: 'produccion', component: FormularioComponent, canActivate: [AuthenticationGuard, LoginGuard] },
    {path: 'muestras', component: FormComponent, canActivate: [AuthenticationGuard] },
    {path: 'informacion', component: InformacionComponent, canActivate: [AuthenticationGuard] },
    {path : '', redirectTo: 'inicio', pathMatch: 'full'},
    {path : '**', component: InicioComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
