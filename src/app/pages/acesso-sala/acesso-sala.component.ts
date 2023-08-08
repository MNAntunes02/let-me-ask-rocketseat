import { Component } from '@angular/core';
import { DocumentData, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
  numeroUnico:any;
  currentNome :string|null = '';

  constructor(
    private salaService: SalaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router:Router
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

    this.currentNome = localStorage.getItem('name');
    if (this.currentNome !== null) {
      this.currentNome = this.currentNome.replace(/["]/g, '');
      // [this.primeiroNome, ...this.resto] = this.currentNome.split(" ");
    }    


  }


  criarSala(nomeSala: string){
    this.numeroUnico = this.gerarNumeroUnico(this.salas)
    if(this.currentNome != null){
      this.salaService.setSala(this.numeroUnico,this.currentNome,nomeSala)
    }
    console.log("Sala numero ",this.numeroUnico," criada!!")
    //Colocar notificação de Sala Criada
    this.router.navigate(['/sala/',this.numeroUnico])
  }

  gerarNumeroUnico(array: any) {
    const min = 100000; // O menor número possível com 6 dígitos
    const max = 999999; // O maior número possível com 6 dígitos
  
    while (true) {
      const numeroGerado = Math.floor(Math.random() * (max - min + 1) + min);
  
      if (!array.includes(numeroGerado)) {
        return numeroGerado.toString();
      }
    }
  }

  logout(){
    this.authService.logout()
  }

  navegarRota(codigo:string){
    this.router.navigate(['sala',codigo])
  }


}
