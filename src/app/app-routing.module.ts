import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaComponent } from './pages/sala/sala.component';
import { LoginComponent } from './pages/login/login.component';
import { AcessoSalaComponent } from './pages/acesso-sala/acesso-sala.component';

const routes: Routes = [
  {path: "acesso-sala", component: AcessoSalaComponent},
  {path: "login", component: LoginComponent},
  {path: "sala", component: SalaComponent},
  {path:'sala/:idsala',component: SalaComponent},
  {path: "**" , redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
