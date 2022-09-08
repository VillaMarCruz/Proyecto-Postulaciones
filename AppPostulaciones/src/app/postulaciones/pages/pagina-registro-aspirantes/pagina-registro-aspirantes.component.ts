import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AspirantesService } from '../../services/aspirantes.service';
import { TokenService } from '../../../auth/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagina-registro-aspirantes',
  templateUrl: './pagina-registro-aspirantes.component.html',
  styleUrls: ['./pagina-registro-aspirantes.component.css']
})
export class PaginaRegistroAspirantesComponent implements OnInit {

  formOpcion = 0;
  idUser: string | null;
  opcion = 'insertar';
  aspiranteFormInit!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private aspiranteService: AspirantesService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.idUser = this.tokenService.getId();
    this.aspiranteFormInit = this.initForm();
    const id = this.activatedRoute.snapshot.params['id'];

    if (!id) {
      this.opcion = 'insertar';
    } else {
      this.aspiranteService.searchId(id).subscribe({
        next: (data) => {
          this.aspiranteFormInit.patchValue({
            documentoIdentidad: data.results[0].documentoIdentidad,
            libretaMilitar: data.results[0].libretaMilitar,
            apellidos: data.results[0].apellidos,
            nombres: data.results[0].nombres,
            fechaNacimiento:  data.results[0].fechaNacimiento,
            sexo: data.results[0].sexo,
            estadoCivil: data.results[0].estadoCivil,
            conyuge: data.results[0].conyuge,
            discapacidad: data.results[0].discapacidad,
            carnetConadis: data.results[0].carnetConadis,
            etnia: data.results[0].etnia,
            nacionalidad: data.results[0].nacionalidad,
            correoPersonal: data.results[0].correoPersonal,
            correoAlternativo: data.results[0].correoAlternativo,
          });
          // FORMACIÓN ACADEMICA
          let academica: FormArray = this.aspiranteFormInit.get('formacionAcademica') as FormArray
          let academicaArray: any[] = data.results[0].formacionAcademica;
          academicaArray.forEach((elemento) => {
            academica.push(this.fb.group({
              pais: [elemento.pais, [Validators.required]],
              institucion: [elemento.institucion, [Validators.required]],
              titulo: [elemento.titulo, [Validators.required]],
              nivelFormacion: [elemento.nivelFormacion, [Validators.required]],
              duracion: [elemento.duracion, [Validators.required]],
              periodo: [elemento.periodo, [Validators.required]],
            }));
          });
          // CAPACITACIONES
          let capacitaciones: FormArray = this.aspiranteFormInit.get('capacitaciones') as FormArray
          let capacitacionesArray: any[] = data.results[0].capacitaciones;
          capacitacionesArray.forEach((elemento) => {
            capacitaciones.push(this.fb.group({
              pais: [elemento.pais, [Validators.required]],
              evento: [elemento.evento, [Validators.required]],
              auspiciante: [elemento.auspiciante, [Validators.required]],
              duracion: [elemento.duracion, [Validators.required]],
              certificado: [elemento.certificado, [Validators.required]],
              fechaInicio: [elemento.fechaInicio, [Validators.required]],
              fechaFin: [elemento.fechaFin, [Validators.required]]
            }));
          });
          // INFORMACIÓN LABORAL
          let informacionLaboral: FormArray = this.aspiranteFormInit.get('informacionLaboral') as FormArray
          let informacionLaboralArray: any[] = data.results[0].informacionLaboral;
          informacionLaboralArray.forEach((elemento) => {
            informacionLaboral.push(this.fb.group({
              tipoInstitucion: [elemento.tipoInstitucion, [Validators.required]],
              institucion: [elemento.institucion, [Validators.required]],
              unidad: [elemento.unidad, [Validators.required]],
              puesto: [elemento.puesto, [Validators.required]],
              fechaInicio: [elemento.fechaInicio, [Validators.required]],
              fechaFin: [elemento.fechaFin, [Validators.required]],
              motivoSalida: [elemento.motivoSalida, [Validators.required]],
            }));
          });
          // Referencias personales
          let referenciasPersonales: FormArray = this.aspiranteFormInit.get('referenciasPersonales') as FormArray
          let referenciasPersonalesArray: any[] = data.results[0].referenciasPersonales;
          referenciasPersonalesArray.forEach((elemento) => {
            referenciasPersonales.push(this.fb.group({
              documentoIdentidad: [elemento.documentoIdentidad, [Validators.required]],
              nombres: [elemento.nombres, [Validators.required]],
              puesto: [elemento.puesto, [Validators.required]],
              institucion: [elemento.institucion, [Validators.required]],
              direccionInstitucion: [elemento.direccionInstitucion, [Validators.required]],
              telefono: [elemento.telefono, [Validators.required]],
              correo: [elemento.correo, [Validators.required]]
            }));
          });
        }
      });
      this.opcion = 'editar';
    }


  }

  initForm(): FormGroup {
    return this.fb.group({
      UserId: [this.idUser],
      documentoIdentidad: ['', [Validators.required]],
      libretaMilitar: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      conyuge: ['', [Validators.required]],
      discapacidad: ['', [Validators.required]],
      carnetConadis: ['', [Validators.required]],
      etnia: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      correoPersonal: ['', [Validators.required]],
      correoAlternativo: ['', [Validators.required]],
      formacionAcademica: this.fb.array([]),
      capacitaciones: this.fb.array([]),
      informacionLaboral: this.fb.array([]),
      referenciasPersonales: this.fb.array([])
    });
  }

  onSubmit() {
    let aspirante = this.aspiranteFormInit.value;
    if(this.opcion === 'insertar'){
      this.aspiranteService.save(aspirante).subscribe({
        next: (data) => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          let UserId = this.tokenService.getId();
          this.router.navigate([`/postulaciones/cv-aspirante/${UserId}`]);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      });
    }else{
      const id = this.activatedRoute.snapshot.params['id'];
      this.aspiranteService.update(id, aspirante).subscribe({
        next: (data) => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          let UserId = this.tokenService.getId();
          this.router.navigate([`/postulaciones/cv-aspirante/${UserId}`]);
        },
        error: err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      })
    }


    this.aspiranteFormInit.reset();
  }

  next() {
    this.formOpcion += 1;
  }

  back() {
    this.formOpcion -= 1;
  }
}
