import { Routes } from "@angular/router";    

export default [
    {
        path: '', 
        loadComponent: () => import('../servicios-list/servicios-list.component'),
    },
    {
        path: ':id',
        loadComponent: () => import('../servicios-detail/servicios-detail.component')        
    }
]as Routes;