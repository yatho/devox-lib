import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from '../menu/menu.component';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    NgOptimizedImage,
    MenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
