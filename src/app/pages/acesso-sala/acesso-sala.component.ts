import { Component } from '@angular/core';
import { DocumentData, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-acesso-sala',
  templateUrl: './acesso-sala.component.html',
  styleUrls: ['./acesso-sala.component.css']
})
export class AcessoSalaComponent {

  todasSalas$: any;
  todasSalasAtualizado$: any;
  salas:any;
  salaDoc:any;

  constructor(
    private salaService: SalaService,
    private route: ActivatedRoute
  ){

    this.todasSalas$ = this.salaService.getTodasSalas()

    
    this.todasSalas$.then((result:any) => {
      this.todasSalasAtualizado$ = result
      this.todasSalasAtualizado$.subscribe((element:any) => {
        element.then((resultado:any) => {
          this.salas = resultado
        }).catch((erro:any) => {
          console.log(erro)
        })
      })      
    }).catch((error:any) => {
      console.error(error);
    });



  }


}
