import { Route } from "@angular/router";

export const ROUTES: Route[] = [
    { path: 'consumers', loadChildren: () => import('./consumer/routes').then(mod => mod.CONSUMER_ROUTES) },
    { path: '**', redirectTo: 'consumers' }
];