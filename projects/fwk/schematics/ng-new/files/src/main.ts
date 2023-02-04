import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

const ROUTES: Route[] = [
  {path: '', loadChildren: () => import('./app/routes').then(mod => mod.ROUTES)}
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(ROUTES), BrowserAnimationsModule
    )
  ]
}).catch(err => console.error(err));