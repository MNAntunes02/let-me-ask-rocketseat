import { Component, Input } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, deleteDoc, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent {

  @Input() id :any;
  @Input() status :string = 'nova';
  @Input() conteudoPergunta :string = '';
  @Input() likes :string = '';
  @Input() nomeUser :string = '';

  idSala:string = '';
  salas$:Observable<DocumentData[]|any>|any;
  perguntas$:Observable<DocumentData[]|any>|any;

  constructor(
    private firestore : Firestore,
    private route : ActivatedRoute
  ){

    // const salasRef = collection(this.firestore, 'salas')
    // const salaRef = doc(salasRef,this.idSala)
    // const perguntasRef = collection(salaRef,'perguntas')
    // this.salas$ = collectionData(salasRef)
    // this.perguntas$ = collectionData(perguntasRef);

    
    this.route.params.subscribe(
      (params: any) => this.idSala = params['idsala']
    )

  }

  async mudarStatus(action:string){

    const salasRef = collection(this.firestore, 'salas')
    this.salas$ = collectionData(salasRef)
    const salaRef = doc(salasRef,this.idSala)
    const perguntasRef = collection(salaRef,'perguntas')
    this.perguntas$ = collectionData(perguntasRef);

    

    await updateDoc(doc(perguntasRef,this.id), {
      status: action 
    });
  }

  async excluirPergunta(){

    const salasRef = collection(this.firestore, 'salas')
    this.salas$ = collectionData(salasRef)
    const salaRef = doc(salasRef,this.idSala)
    const perguntasRef = collection(salaRef,'perguntas')
    this.perguntas$ = collectionData(perguntasRef);

    

    await deleteDoc(doc(perguntasRef,this.id));

  }

}
