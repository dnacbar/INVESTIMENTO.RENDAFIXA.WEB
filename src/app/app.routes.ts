import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'financeiro',
        loadComponent: () => import('./financeiro/component/index/index').then(m => m.Index)
    },
    {
        path: 'home',
        loadComponent: () => import('./home/component/index/index').then(m => m.Index)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
];
