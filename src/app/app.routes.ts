import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'investimento',
        children: [
            {
                path: '',
                loadComponent: () => import('./rendafixa/financeiro/component/investimento/index/index').then(m => m.Index)
            },
            {
                path: 'adiciona',
                loadComponent: () => import('./rendafixa/financeiro/component/investimento/adiciona/adiciona').then(m => m.Adiciona)
            },
            {
                path: 'visualiza',
                loadComponent: () => import('./rendafixa/financeiro/component/investimento/visualiza/visualiza').then(m => m.Visualiza)
            },
        ]
    },
    {
        path: 'resgate',
        children: [
            {
                path: '',
                loadComponent: () => import('./rendafixa/financeiro/component/resgate/index/index').then(m => m.Index)
            },
            {
                path: 'visualiza',
                loadComponent: () => import('./rendafixa/financeiro/component/resgate/visualiza/visualiza').then(m => m.Visualiza)
            },
            {
                path: 'adiciona',
                loadComponent: () => import('./rendafixa/financeiro/component/resgate/adiciona/adiciona').then(m => m.Adiciona)
            }
        ]
    },
    {
        path: 'home',
        loadComponent: () => import('./rendafixa/home/component/index/index').then(m => m.Index)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
];
