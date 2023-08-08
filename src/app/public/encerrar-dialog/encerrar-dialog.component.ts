import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-encerrar-dialog',
  templateUrl: './encerrar-dialog.component.html',
  styleUrls: ['./encerrar-dialog.component.css']
})
export class EncerrarDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  async excluirSala() {
    if (this.data && this.data.excluir) {
      await this.data.excluir();
    }
  }
}
