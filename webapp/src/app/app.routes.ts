import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((mod) => mod.HomePage),
  },
  // {
  //   path: '',
  //   loadComponent: () => import('./home/home.page').then((mod) => mod.HomePage),
  // },
];
