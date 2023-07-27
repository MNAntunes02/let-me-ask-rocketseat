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

  constructor(
    private route : ActivatedRoute,
    private authService : AuthService,
    private firestore: Firestore,
  ){

    this.route.params.subscribe(
      (params: any) => this.idSala = params['idsala']
    )

    const salasRef = collection(this.firestore, 'salas')
    this.salas$ = collectionData(salasRef)
    const salaRef = doc(salasRef,this.idSala)
    const perguntasRef = collection(salaRef,'perguntas')
    this.perguntas$ = collectionData(perguntasRef);
    

    
    this.salas$.subscribe(async (element) => {
      this.test = element;
      this.testDoc = (await getDoc(salaRef)).data();
      // console.log(this.test)
      // console.log(this.testDoc)
    })

    // this.perguntas$.subscribe(async (element) => {
    //   console.log(element)
    // })

    

  }

  logout(){
    this.authService.logout()
  }


}
