import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Consumer } from '../models/Consumer';
import { ConsumerService } from '../services/consumer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    DatePipe
  ]
})
export class ListComponent {
  protected $consumers: Observable<Array<Consumer>>;
  protected displayedColumns: Array<string> = ['id', 'civility', 'lastname', 'firstname', 'email', 'phone', 'createdAt', 'updatedAt', 'actions'];

  constructor(private _consumerService: ConsumerService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar) {
    this.$consumers = this._consumerService.getList();
  }

  protected create(): void {
    this._router.navigate(['consumers', 'create']);
  }

  protected edit(consumer: Consumer): void {
    this._router.navigate(['consumers', consumer.id]);
  }

  protected async delete(id: number): Promise<void> {
    const { ConfirmBoxComponent } = await import('fwk');
    this._dialog.open(ConfirmBoxComponent)
    .afterClosed()
      .subscribe(confirm => {
        if (!confirm) return;
        this._consumerService.delete(id).subscribe({
          complete: () => {
            this.$consumers = this.$consumers.pipe(
              switchMap(() => this._consumerService.getList())
            );
            this._snackBar.open(`L'élément ${id} a bien été supprimé`);
          }
        });
      });
  }
}