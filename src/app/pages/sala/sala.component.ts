import { Component } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent {

  idSala:string = '';
  test:any;
  testDoc:any;
  salas$:Observable<DocumentData[]|any>;
  sala$:any;
  perguntas$:Observable<DocumentData[]|any>;

  currentNome :string|null = '';
  currentPhoto :string|null = '';
  currentEmail :string|null = '';
  

  constructor(
    private route : ActivatedRoute,
    private authService : AuthService,
    private firestore: Firestore,
  ){

    this.currentNome = localStorage.getItem('name');
    this.currentPhoto = localStorage.getItem('photo');
    this.currentEmail = localStorage.getItem('email');
    if (this.currentNome !== null) {
      this.currentNome = this.currentNome.replace(/["]/g, '');
      // [this.primeiroNome, ...this.resto] = this.currentNome.split(" ");
    }

    this.route.params.subscribe(
      (params: any) => this.idSala = params['idsala']
    )

    const salasRef = collection(this.firestore, 'salas')
    this.salas$ = collectionData(salasRef)
    const salaRef = doc(salasRef,this.idSala)
    const perguntasRef = collection(salaRef,'perguntas')
    this.perguntas$ = collectionData(perguntasRef);
    
    this.salas$.subscribe(async (element) => {
      this.test = element; //dados de todas as salas
      this.testDoc = (await getDoc(salaRef)).data(); //dados da sala
    })
    

  }

  logout(){
    this.authService.logout()
  }


}
