import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { GoogleAuthProvider , getAuth, onAuthStateChanged  } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Firestore, collection, doc, getDocs, setDoc } from '@angular/fire/firestore';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: boolean = false;
  userLoggedIn: any;

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: Firestore,
    private router: Router,
  ){
    this.checkAuthStatus()
  }

  //login com google
  googleSingIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( async res => {
      localStorage.removeItem('photo');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.setItem('photo', JSON.stringify(res.user?.photoURL));
      localStorage.setItem('name', JSON.stringify(res.user?.displayName));
      localStorage.setItem('email', JSON.stringify(res.user?.email));
      this.router.navigate(['acesso-sala']);

      const usuarios = collection(this.firestore,'usuarios')
      const document = doc(usuarios , res.user?.uid);
      const uids = this.listarUIDsColecao(usuarios)

      if (!(await uids).includes(res.user?.uid)) {        
        await setDoc(document, {
          nome:res.user?.displayName,
          email:res.user?.email,
          photoURL:res.user?.photoURL,
        })
      }

    }, err => {
      console.log(err)
    })
  }

  // sign out
  async logout() {
    await this.fireauth.signOut().then( () => {
      localStorage.removeItem('photo');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      this.router.navigate(['login'])

    }, err => {
      console.log(err)
    })
  }

  async listarUIDsColecao(minhaColecao: any) {
    const querySnapshot = await getDocs(minhaColecao);
    const uids: any[] = [];
  
    querySnapshot.forEach((doc) => {
      uids.push(doc.id);
    });
  
    return uids;
  }

  checkAuthStatus() {
    return this.fireauth.authState.pipe(
      map((user) => {
        if (user) {
          // Usuário autenticado, permitir acesso à rota
          this.authenticated = true;
        } else {
          // Usuário não autenticado, redirecionar para a página de login
          this.authenticated = false;
        }
      })
    )
  }

}


