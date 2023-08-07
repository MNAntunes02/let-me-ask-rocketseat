import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  idSala:string = '';
  nPerguntas:number = 0;
  sala:any;
  salaDoc:any;
  salaRef:any;
  arrDoc:any = [];
  arrDocRef:any = [];
  arrDocData:any = [];
  salas$:Observable<DocumentData[]|any>|any;
  sala$:any;
  perguntas$:Observable<DocumentData[]|any>|any;
  perguntas:any

  currentNome :string|null = '';
  currentPhoto :string|null = '';
  currentEmail :string|null = '';
  primeiroNome :string|null = '';
  resto : any;

  constructor(
    private route : ActivatedRoute,
    private firestore: Firestore,
  ){

  }

  getPerguntas(idSala:string){
    const salasRef = collection(this.firestore, 'salas')
    const salaRef = doc(salasRef,idSala)
    this.salaRef = salaRef
    const perguntasRef = collection(salaRef,'perguntas')
    this.salas$ = collectionData(salasRef)
    this.perguntas$ = collectionData(perguntasRef);
  
    this.perguntas$ = this.perguntas$.pipe(
      map(async (objeto:any) => {
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
        return objeto.sort((a:any, b:any) => b.status.localeCompare(a.status)) // Retorne o objeto atualizado
      })
    )

    return this.perguntas$
  }

  getSalas(idSala:string){
    const salasRef = collection(this.firestore, 'salas')
    const salaRef = doc(salasRef,idSala)
    this.salaRef = salaRef
    const perguntasRef = collection(salaRef,'perguntas')
    this.salas$ = collectionData(salasRef)
    this.perguntas$ = collectionData(perguntasRef);

    return this.salas$
  }

  async setMensagem(idSala:string, mensagem:string){
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
