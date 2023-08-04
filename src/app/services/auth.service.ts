import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { GoogleAuthProvider , updateProfile , getAuth  } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Firestore, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';

import{ getStorage , ref , uploadBytes  } from '@angular/fire/storage'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: Firestore,
    private router: Router,
  ){

    
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
      this.router.navigate(['criar-sala']);

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

}
