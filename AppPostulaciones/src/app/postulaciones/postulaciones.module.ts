import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PaginaRegistroAspirantesComponent } from './pages/pagina-registro-aspirantes/pagina-registro-aspirantes.component';
import { FormPersonalComponent } from './components/form/form-personal/form-personal.component';
import { FormAcademicaComponent } from './components/form/form-academica/form-academica.component';
import { FormCapacitacionesComponent } from './components/form/form-capacitaciones/form-capacitaciones.component';
import { FormInfoLaboralComponent } from './components/form/form-info-laboral/form-info-laboral.component';
import { FormRefPersonalComponent } from './components/form/form-ref-personal/form-ref-personal.component'
import { PostulacionesRoutingModule } from './postulaciones-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginaCvAspirantesComponent } from './pages/pagina-cv-aspirantes/pagina-cv-aspirantes.component';
import { PaginaPostulacionesComponent } from './pages/pagina-postulaciones/pagina-postulaciones.component';
import { PaginaOfertasComponent } from './pages/pagina-ofertas/pagina-ofertas.component';
import { MenuComponent } from './components/menu/menu.component';
import { IndexComponent } from './pages/index/index.component';
import { ListaAspirantesComponent } from './pages/admin/aspirantes/lista-aspirantes/lista-aspirantes.component';
import { ListaCargosComponent } from './pages/admin/cargos/lista-cargos/lista-cargos.component';
import { FormularioCargosComponent } from './pages/admin/cargos/formulario-cargos/formulario-cargos.component';
import { DetalleCargosComponent } from './pages/admin/cargos/detalle-cargos/detalle-cargos.component';

@NgModule({
  declarations: [
    PaginaRegistroAspirantesComponent,
    FormPersonalComponent,
    FormAcademicaComponent,
    FormCapacitacionesComponent,
    FormInfoLaboralComponent,
    FormRefPersonalComponent,
    PaginaCvAspirantesComponent,
    PaginaPostulacionesComponent,
    PaginaOfertasComponent,
    MenuComponent,
    IndexComponent,
    ListaAspirantesComponent,
    ListaCargosComponent,
    FormularioCargosComponent,
    DetalleCargosComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PostulacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class PostulacionesModule { }
