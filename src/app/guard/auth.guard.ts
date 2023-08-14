import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, ReplaySubject, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.afAuth.authState.pipe(
        map((user) => {
          if (user) {
            // Usuário autenticado, permitir acesso à rota
            return true;
          } else {
            // Usuário não autenticado, redirecionar para a página de login
            this.router.navigate(['/login']);
            return false;
          }
        })
      )
  }

}
