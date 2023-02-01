import { Route } from "@angular/router";

export const CONSUMER_ROUTES: Route[] = [
    {path: '', loadComponent: () => import('./list/list.component').then(comp => comp.ListComponent)},
    {path: 'create', loadComponent: () => import('./detail/detail.component').then(comp => comp.DetailComponent)},
    {path: ':id', loadComponent: () => import('./detail/detail.component').then(comp => comp.DetailComponent)}
  ];