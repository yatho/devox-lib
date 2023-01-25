import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

// TODO : Déplacer dans la lib

@Component({
  selector: 'app-confirm-box',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  template: `
  <h1 mat-dialog-title>Êtes vous sûr de vouloir continuer ?</h1>
  <section mat-dialog-actions>
    <button mat-button (click)="cancel()">Non</button>
    <button mat-raised-button color="primary" (click)="validate()">Oui</button>
  </section>
  `
})
export class ConfirmBoxComponent {
  constructor(private _dialogRef: MatDialogRef<boolean>) { }

  protected cancel(): void {
    this._dialogRef.close(false);
  }

  protected validate(): void {
    this._dialogRef.close(true);
  }
}
