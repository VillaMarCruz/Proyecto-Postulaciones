import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-ref-personal',
  templateUrl: './form-ref-personal.component.html',
  styleUrls: ['./form-ref-personal.component.css']
})
export class FormRefPersonalComponent implements OnInit {

  @Input()
  aspiranteForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.aspiranteForm;
  }

  addReferencias() {
    const referencias: FormArray = this.aspiranteForm.get('referenciasPersonales') as FormArray
    referencias.push(this.fb.group({
      documentoIdentidad: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      puesto: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      direccionInstitucion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]]
    }));
  };

  removeReferencias(fI: number) {
    const referencias: FormArray = this.aspiranteForm.get('referenciasPersonales') as FormArray
    referencias.removeAt(fI)
  }

  getControls() {
    return (this.aspiranteForm.get('referenciasPersonales') as FormArray).controls;
  }

}
