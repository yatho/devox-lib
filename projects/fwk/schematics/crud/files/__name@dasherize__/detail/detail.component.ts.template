import { Location, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { LifecycleComponent } from 'fwk';
import { Civility } from '../models/Consumer';
import { ConsumerService } from '../services/consumer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgFor
  ],
})
export class DetailComponent extends LifecycleComponent {
  protected consumerForm: FormGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    civility: new FormControl<string | null>(null),
    lastname: new FormControl<string | null>(null),
    firstname: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string | null>(null),
    createdAt: new FormControl<Date>(new Date(), {nonNullable: true}),
    updatedAt: new FormControl<Date | null>(new Date(), {nonNullable: true})
  });

  protected civilities: Array<string> = Object.values(Civility);

  constructor(
    private _route: ActivatedRoute,
    private _consumerService: ConsumerService,
    private _location: Location
  ) { super(); }

  public ngOnInit(): void {
    this._route.paramMap
      .pipe(
        takeUntil(this.$componentDestroyed)
      )
      .subscribe(paramMap => {
        if (!paramMap.has('id')) return;
        this._consumerService.get(Number.parseInt(paramMap.get('id')!))
          .pipe(takeUntil(this.$componentDestroyed))
          .subscribe(consumer => this.consumerForm.patchValue(consumer))
      })
  }

  protected save(): void {
    if (this.consumerForm.invalid)
      return;
    const consumer = this.consumerForm.value;
    if (consumer.id) {
      this._consumerService.update(consumer.id, consumer).subscribe({
        next: () => this.goBack()
      });
    } else {
      this._consumerService.create(consumer).subscribe({
        next: () => this.goBack()
      });
    }
  }

  protected get isCreation(): boolean {
    return !this.consumerForm.get('id')?.value;
  }

  protected cancel(): void {
    this.goBack();
  }

  private goBack(): void {
    this._location.back();
  }
}
