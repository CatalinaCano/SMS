import { RouterModule, Routes} from '@angular/router';

import { FormularioComponent } from './components/formulario/formulario.component';
import { InformacionComponent } from './components/shared/informacion/informacion.component';

const APP_ROUTES: Routes = [
{path: 'inicio', component: FormularioComponent },
{path: 'informacion', component: InformacionComponent },
{path : '', redirectTo: 'inicio', pathMatch: 'full'},
{path : '**', component: FormularioComponent}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
