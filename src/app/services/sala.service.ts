import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, defaultIfEmpty, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  idSala:string = '';
  nPerguntas:number = 0;
  sala:any;
  salas:any;
  salaDoc:any;
  salaRef:any;
  arrDoc:any = [];
  arrDocRef:any = [];
  arrDocData:any = [];
  salas$:Observable<DocumentData[]>|any;
  todasSalas$:any;
  sala$:any;
  perguntas$:Observable<DocumentData[]>|any;
  perguntas:any

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
        this.nPerguntas = await objeto.length
        return objeto.length > 0 ? objeto.sort((a:any, b:any) => a.status.localeCompare(b.status)) : EMPTY // Retorne o objeto atualizado
      }),
      defaultIfEmpty([])
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

  async getTodasSalas(){
    const salasRef = collection(this.firestore, 'salas')
    this.todasSalas$ = collectionData(salasRef)

    this.todasSalas$ = this.todasSalas$.pipe(
      map(async (objeto:any) => {
        let arrID:any = []
        this.salas = await getDocs(salasRef)
        this.salas.forEach((doc:any) => {
          arrID.push(doc.id)
        })
        objeto.forEach((newdoc:any, index:any)=>{
          Object.assign(newdoc,{id:arrID[index]})
        })
        // console.log(objeto)
        return objeto // Retorna o objeto atualizado
      })
    )
    
    // console.log(this.todasSalas$)
    return await this.todasSalas$
  }

  async setMensagem(idSala:string, mensagem:string, nomeUser:string){
    const salasRef = collection(this.firestore, 'salas')
    const salaRef = doc(salasRef,idSala)
    const perguntasRef = collection(salaRef,'perguntas')
    this.salas$ = collectionData(salasRef)
    this.perguntas$ = collectionData(perguntasRef);


    await setDoc(doc(perguntasRef), {
      conteudoPergunta: mensagem,
      nomeUser: nomeUser,
      status: '1-nova', 
      likes: 0,
    });
  }

  async setSala(idSala:string, donoSala:string, nomeSala:string){
    const salasRef = collection(this.firestore, 'salas')

    await setDoc(doc(salasRef, idSala), {
      donoSala: donoSala,
      nomeSala: nomeSala
    });

    console.log("Efetuado setSala!!!!")
  }

}
