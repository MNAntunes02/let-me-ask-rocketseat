import { Component } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, collectionGroup, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


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
  // perguntasAtualizado$:Observable<DocumentData[]|any>;
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
    const salaRef = doc(salasRef,"123123")
    const perguntasRef = collection(salaRef,'perguntas')
    this.salas$ = collectionData(salasRef)
    this.perguntas$ = collectionData(perguntasRef);

    this.perguntas$ = this.perguntas$.pipe(
      map(async (objeto) => {
        let arrID:any = []
        this.perguntas = await getDocs(perguntasRef);
        this.perguntas.forEach((doc:any) => {
          arrID.push(doc.id)
        })
        objeto.forEach((newdoc:any, index:any)=>{
          Object.assign(newdoc,{id:arrID[index]})
        })
        this.nPerguntas = objeto.length
        // console.log(objeto)
        return objeto.sort((a:any, b:any) => b.status.localeCompare(a.status)); // Retorne o objeto atualizado
      })
    );
    
    this.salas$.subscribe(async (element) => {
      this.sala = element; //dados de todas as salas
      this.salaDoc = (await getDoc(salaRef)).data(); //dados da sala da rota
    })

    this.perguntas$.subscribe((element)=>{
      console.log(element)
    })
    


  }

  logout(){
    this.authService.logout()
  }

  async mandarMensagem(mensagem:string, event: Event){

    event.preventDefault();

    const salasRef = collection(this.firestore, 'salas')
    const salaRef = doc(salasRef,"123123")
    const perguntasRef = collection(salaRef,'perguntas')
    this.salas$ = collectionData(salasRef)
    this.perguntas$ = collectionData(perguntasRef);


    await setDoc(doc(perguntasRef), {
      conteudoPergunta: mensagem,
      nomeUser: this.currentNome,
      status: 'nova', 
      likes: 0,
    });
  }

}
