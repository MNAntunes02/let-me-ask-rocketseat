import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }

  async googleSingIn(){
    await this.authService.googleSingIn();
  }

  navegarRota(codigo:string){
    this.router.navigate(['sala',codigo])
  }

}
