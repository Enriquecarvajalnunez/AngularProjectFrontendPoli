import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'servicios',
        loadChildren: () =>
            import('./servicios/features/servicios-shell/servicios.route'),
    },
    {
        path: '**',
        redirectTo: 'servicios',
    }
];