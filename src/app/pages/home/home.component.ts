import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  numeroUnico:any;
  todasSalas$:any;
  todasSalasAtualizado$:any;
  salas:any;
  currentNome :string|null = '';

  constructor(
    private salaService: SalaService,
    private router: Router
  ){

    this.currentNome = localStorage.getItem('name');
    if (this.currentNome !== null) {
      this.currentNome = this.currentNome.replace(/["]/g, '');
      // [this.primeiroNome, ...this.resto] = this.currentNome.split(" ");
    }

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

  criarSala(nomeSala: string){
    this.numeroUnico = this.gerarNumeroUnico(this.salas)
    if(this.currentNome != null){
      this.salaService.setSala(this.numeroUnico,this.currentNome,nomeSala)
    }
    console.log("Sala numero ",this.numeroUnico," criada!!")
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


}
