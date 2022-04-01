import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegistroComponent} from "./components/registro/registro.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guards/auth.guard";

const APP_ROUTES: Routes = [
  {path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
]
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES)
