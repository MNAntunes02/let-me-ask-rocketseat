import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DocumentData, Firestore, collection, collectionData, collectionGroup, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { EncerrarDialogComponent } from 'src/app/public/encerrar-dialog/encerrar-dialog.component';
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
  salaRef:any;
  arrDoc:any = [];
  arrDocRef:any = [];
  arrDocData:any = [];
  salas$:Observable<DocumentData[]|any>;
  sala$:any;
  todasSalas$:any;
  perguntas$:Observable<DocumentData[]|any>;
  perguntas:any
  sidenav = false;
  currentNome :string|null = '';
  currentPhoto :string|null = '';
  currentEmail :string|null = '';
  primeiroNome :string|null = '';
  resto : any;
  authenticated = false;
  

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
    private firestore: Firestore,
    private fireauth: AngularFireAuth,
    private salaService: SalaService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ){

    this.fireauth.authState.subscribe((user) => {
      if (user) {
        // Usuário autenticado, permitir acesso à rota
        this.authenticated = true;
        console.log(this.authenticated)
      } else {
        // Usuário não autenticado, redirecionar para a página de login
        this.authenticated = false;
        console.log(this.authenticated)
      }
    })
      
    

    this.route.params.subscribe(
      (params: any) => this.idSala = params['idsala']
    )

    const salasRef = collection(this.firestore, 'salas')
    const salaRef = doc(salasRef,this.idSala)
    this.salaRef = salaRef
    const perguntasRef = collection(salaRef,'perguntas')


    this.currentNome = localStorage.getItem('name');
    this.currentPhoto = localStorage.getItem('photo');
    this.currentEmail = localStorage.getItem('email');
    if (this.currentNome !== null) {
      this.currentNome = this.currentNome.replace(/["]/g, '');
      // [this.primeiroNome, ...this.resto] = this.currentNome.split(" ");
    }
    if (this.currentPhoto !== null) {
      this.currentPhoto = this.currentPhoto.replace(/["]/g, '');
      // [this.primeiroNome, ...this.resto] = this.currentNome.split(" ");
    }
    
    this.salas$ = salaService.getSalas(this.idSala);
    this.perguntas$ = salaService.getPerguntas(this.idSala);
    this.todasSalas$ = salaService.getTodasSalas();

    this.salas$.subscribe(async (element) => {
      this.sala = element; //dados de todas as salas
      this.salaDoc = (await getDoc(salaRef)).data(); //dados da sala da rota
    })
    
    this.perguntas$.subscribe((element)=>{
      element.then((resultado:any) => {
        this.nPerguntas = resultado.length
        console.log(resultado)
      }).catch((erro:any) => {
        console.log(erro)
      })
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
    if (this.currentNome != null && this.currentPhoto != null) {
      this.salaService.setMensagem(this.idSala,mensagem,this.currentNome,this.currentPhoto)
    }else{
      console.log("erro pois currentNome é null")
    }
  }

  async excluirSala(){
    const salasRef = collection(this.firestore, 'salas')

    await deleteDoc(doc(salasRef,this.idSala))
    this.router.navigate(['acesso-sala'])
  }

  openDialogExcluir() {
    this.dialog.open(EncerrarDialogComponent, {
      width: '590px',
      height: '362px',
      panelClass: 'panel',
      data: {
        excluir: () => this.excluirSala(),
      }
    });
  }

  copyCode(codigo:string){
    navigator.clipboard.writeText(codigo)
    this._snackBar.open('Código #'+codigo+' copiado!','',{
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: 'blue-snackbar'
    });
  }

  closeSidenav(){
    this.sidenav = false
  }
  
  openSidenav(){
    this.sidenav = true
  }

  checkStatusAuth(){
    this.authService.checkAuthStatus()
  }

}
