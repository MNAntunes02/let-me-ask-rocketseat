import { Component } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, collectionGroup, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SalaService } from 'src/app/services/sala.service';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent {

  idSala:string = '';
  nPerguntas:number = 0;
  sala:any;
  salaDoc:any;
  arrDoc:any = [];
  arrDocRef:any = [];
  arrDocData:any = [];
  salas$:Observable<DocumentData[]|any>;
  sala$:any;
  perguntas$:Observable<DocumentData[]|any>;
  perguntas:any

  currentNome :string|null = '';
  currentPhoto :string|null = '';
  currentEmail :string|null = '';
  primeiroNome :string|null = '';
  resto : any;
  

  constructor(
    private route : ActivatedRoute,
    private authService : AuthService,
    private firestore: Firestore,
    private salaService: SalaService
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
    
    
    this.salas$ = salaService.getSalas(this.idSala);
    this.perguntas$ = salaService.getPerguntas(this.idSala);
    
    this.salas$.subscribe(async (element) => {
      this.sala = element; //dados de todas as salas
      this.salaDoc = (await getDoc(salaService.salaRef)).data(); //dados da sala da rota
    })
    
    this.perguntas$.subscribe((element)=>{
      this.nPerguntas = this.salaService.nPerguntas
    })
    
  }

  googleSingIn(){
    this.authService.googleSingIn()
  }

  logout(){
    this.authService.logout()
  }

  async mandarMensagem(mensagem:string, event: Event){
    event.preventDefault();
    if (this.currentNome != null) {
      this.salaService.setMensagem(this.idSala,mensagem,this.currentNome)
    }else{
      console.log("erro pois currentNome é null")
    }
  }

}
