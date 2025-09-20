import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./servicios/features/servicios-shell/servicios.route'),
    },
    {
        path: '**',
        redirectTo: '',
    }
];