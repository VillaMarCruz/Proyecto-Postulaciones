import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaCvAspirantesComponent } from './pages/pagina-cv-aspirantes/pagina-cv-aspirantes.component';
import { PaginaPostulacionesComponent } from './pages/pagina-postulaciones/pagina-postulaciones.component';
import { PaginaRegistroAspirantesComponent } from './pages/pagina-registro-aspirantes/pagina-registro-aspirantes.component';
import { PaginaOfertasComponent } from './pages/pagina-ofertas/pagina-ofertas.component';
import { IndexComponent } from './pages/index/index.component';
import { ListaAspirantesComponent } from './pages/admin/aspirantes/lista-aspirantes/lista-aspirantes.component';
import { ListaCargosComponent } from './pages/admin/cargos/lista-cargos/lista-cargos.component';
import { FormularioCargosComponent } from './pages/admin/cargos/formulario-cargos/formulario-cargos.component';
import { DetalleCargosComponent } from './pages/admin/cargos/detalle-cargos/detalle-cargos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'registro-aspirante', component: PaginaRegistroAspirantesComponent},
      {path: 'cv-aspirante/:id', component: PaginaCvAspirantesComponent},
      {path: 'mis-postulaciones/:id', component: PaginaPostulacionesComponent},
      {path: 'ofertas', component: PaginaOfertasComponent},
      {path: 'home', component: IndexComponent},
      {path: 'lista-aspirantes', component: ListaAspirantesComponent},
      {path: 'editar-cv/:id', component: PaginaRegistroAspirantesComponent},
      {path: 'lista-cargos', component: ListaCargosComponent},
      {path: 'nuevo-cargo', component: FormularioCargosComponent},
      {path: 'editar-cargo/:id', component: FormularioCargosComponent},
      {path: 'detalle-cargo/:id', component: DetalleCargosComponent},
      { path: '**', redirectTo: 'registro-aspirante', pathMatch: 'full' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulacionesRoutingModule { }
