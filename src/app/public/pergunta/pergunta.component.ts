import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent {

  @Input() status :string = 'nova';

}
