import { Component, Input } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, deleteDoc, doc, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirDialogComponent } from '../excluir-dialog/excluir-dialog.component';

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

  sala:any;
  salaDoc:any;

  currentNome :string|null = '';
  currentPhoto :string|null = '';
  currentEmail :string|null = '';
  primeiroNome :string|null = '';
  resto : any;

  constructor(
    private firestore : Firestore,
    private route : ActivatedRoute,
    public dialog: MatDialog,
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
    const salaRef = doc(salasRef,this.idSala)
    const perguntasRef = collection(salaRef,'perguntas')
    this.salas$ = collectionData(salasRef)

    this.salas$.subscribe(async (element: any) => {
      this.sala = element; //dados de todas as salas
      this.salaDoc = (await getDoc(salaRef)).data(); //dados da sala da rota
    })

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

  openDialogExcluir() {
    this.dialog.open(ExcluirDialogComponent, {
      width: '590px',
      height: '362px',
      panelClass: 'panel',
      data: {
        excluir: () => this.excluirPergunta(),
      }
    });
  }

}
