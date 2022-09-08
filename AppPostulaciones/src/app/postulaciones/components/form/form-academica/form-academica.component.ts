import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-academica',
  templateUrl: './form-academica.component.html',
  styleUrls: ['./form-academica.component.css']
})
export class FormAcademicaComponent implements OnInit {

  @Input()
  aspiranteForm!:FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.aspiranteForm;
  }


  addFormacionAcademica(){
    const formaciones: FormArray = this.aspiranteForm.get('formacionAcademica') as FormArray
    formaciones.push(this.fb.group({
      pais: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      nivelFormacion: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      periodo: ['', [Validators.required]],
    }));
  }

  removeFormacionAcademica(fI: number) {
    const formaciones: FormArray = this.aspiranteForm.get('formacionAcademica') as FormArray
    formaciones.removeAt(fI)
  }

  getControls() {
    return (this.aspiranteForm.get('formacionAcademica') as FormArray).controls;
  }

}
