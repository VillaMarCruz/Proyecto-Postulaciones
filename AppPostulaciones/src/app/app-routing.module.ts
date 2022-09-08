import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./principal/principal.module').then(m=>m.PrincipalModule)
  },
  {
    path: 'postulaciones',
    loadChildren: () => import('./postulaciones/postulaciones.module').then(m => m.PostulacionesModule)
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
