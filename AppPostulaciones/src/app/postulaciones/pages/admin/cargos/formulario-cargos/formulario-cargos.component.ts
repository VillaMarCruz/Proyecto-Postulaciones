import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargosService } from '../../../../services/cargos.service';
import { Cargos } from '../../../../interfaces/aspirantes';

@Component({
  selector: 'app-formulario-cargos',
  templateUrl: './formulario-cargos.component.html',
  styleUrls: ['./formulario-cargos.component.css']
})
export class FormularioCargosComponent implements OnInit {

  cargoForm!: FormGroup;

  opcion = 'insertar';

  cargos: Cargos[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private cargoService: CargosService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.cargoForm = this.initForm();
    if(!id){
      this.opcion = 'insertar';
    }else{
      this.cargoService.search(id).subscribe({
        next: (data) => {
          this.cargoForm.patchValue({
            puesto: data.results[0].puesto,
            departamento: data.results[0].departamento,
            salario: data.results[0].salario,
          });
          let requisitos: FormArray = this.cargoForm.get('requisitos') as FormArray
          let requisitosArray:any[] = data.results[0].requisitos;
          requisitosArray.forEach((elemento)=>{
            requisitos.push(this.fb.group({
              requisito: [elemento, [Validators.required]],
            }));
          })
        }
      })
      this.opcion = 'editar';
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      puesto: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      requisitos: this.fb.array([]),
      salario: ['', [Validators.required]],
    });
  }

  addRequisito(){
    const requisitos: FormArray = this.cargoForm.get('requisitos') as FormArray
    requisitos.push(this.fb.group({
      requisito: ['', [Validators.required]],
    }));
  }

  removeRequisito(fI: number) {
    const requisitos: FormArray = this.cargoForm.get('requisitos') as FormArray
    requisitos.removeAt(fI)
  }

  getControls() {
    return (this.cargoForm.get('requisitos') as FormArray).controls;
  }

  onSubmit(){
    let cargoFormulario = this.cargoForm.value;
    let requisitosFormulario: any[] = cargoFormulario.requisitos;
    let requisitos: any[] = [];

    requisitosFormulario.forEach((elemento)=> {
      requisitos.push(elemento.requisito);
    })

    let cargoVacante = {
      puesto: cargoFormulario.puesto,
      departamento: cargoFormulario.departamento,
      requisitos,
      salario: cargoFormulario.salario,
    }

    if(this.opcion === 'insertar'){
      this.cargoService.save(cargoVacante).subscribe({
        next: (data) => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate([`/postulaciones/lista-cargos`]);
        },
        error: err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      })
    }else{
      const id = this.activatedRoute.snapshot.params['id'];
      this.cargoService.update(id, cargoVacante).subscribe({
        next: (data) => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate([`/postulaciones/lista-cargos`]);
        },
        error: err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      });
    }
  }
}
