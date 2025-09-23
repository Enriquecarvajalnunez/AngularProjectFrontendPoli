import { Routes } from '@angular/router';
import { HomeComponent } from './servicios/features/home/home.component';
import { LoginComponent } from './servicios/features/login/login.component';
import { AdminComponent } from './servicios/features/admin/admin.component';

export const routes: Routes = [
    { path: 'home', 
        component: HomeComponent 

    },
    { path: 'login', 
        component: LoginComponent 
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'servicios',
        loadChildren: () =>
            import('./servicios/features/servicios-shell/servicios.route'),
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '**',
        redirectTo: 'home',
    }
    
];