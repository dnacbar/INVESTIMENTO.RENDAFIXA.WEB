import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'bloqueio-investimento',
        children: [
            {
                path: '',
                loadComponent: () => import('./rendafixa/juridico/component/bloqueio-investimento/index/index').then(m => m.Index)
            },
            {
                path: 'adiciona',
                loadComponent: () => import('./rendafixa/juridico/component/bloqueio-investimento/adiciona/adiciona').then(m => m.Adiciona)
            }
        ]
    },
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
        path: 'posicao',
        children: [
            {
                path: '',
                loadComponent: () => import('./rendafixa/financeiro/component/posicao/index/index').then(m => m.Index)
            }
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
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
