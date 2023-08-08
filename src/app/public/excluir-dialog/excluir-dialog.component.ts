import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir-dialog',
  templateUrl: './excluir-dialog.component.html',
  styleUrls: ['./excluir-dialog.component.css']
})
export class ExcluirDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  excluirPergunta() {
    if (this.data && this.data.excluir) {
      this.data.excluir();
    }
  }

}
