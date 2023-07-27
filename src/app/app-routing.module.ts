import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaComponent } from './pages/sala/sala.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "sala", component: SalaComponent},
  {path:'sala/:idgame',component: SalaComponent},
  {path: "**" , redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
