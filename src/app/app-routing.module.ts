import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaComponent } from './pages/sala/sala.component';
import { LoginComponent } from './pages/login/login.component';
import { AcessoSalaComponent } from './pages/acesso-sala/acesso-sala.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthNoGuard } from './guard/auth-no.guard';

const routes: Routes = [
  {path: "acesso-sala", component: AcessoSalaComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [AuthNoGuard]},
  {path: "sala", component: SalaComponent},
  {path:'sala/:idsala',component: SalaComponent},
  {path: "**" , redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
