import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthNoGuard {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afAuth.authState.pipe(
        map((user) => {
          if (user) {
            // Usuário autenticado, permitir acesso à rota
            this.router.navigate(['acesso-sala']);
            return false;
          } else {
            // Usuário não autenticado, redirecionar para a página de login
            return true;
          }
        })
      )
  }
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
}
