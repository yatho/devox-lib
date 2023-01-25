import { Component } from '@angular/core';
import { Subject } from 'rxjs';

// TODO : Déplacer dans la lib

@Component({
  template: ''
})
export class LifecycleComponent {
  protected $componentDestroyed: Subject<null> = new Subject();

  ngOnDestroy(): void {
    this.$componentDestroyed.next(null);
    this.$componentDestroyed.unsubscribe();
  }
}
