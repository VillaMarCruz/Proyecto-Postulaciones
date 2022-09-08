import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-capacitaciones',
  templateUrl: './form-capacitaciones.component.html',
  styleUrls: ['./form-capacitaciones.component.css']
})
export class FormCapacitacionesComponent implements OnInit {

  @Input()
  aspiranteForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.aspiranteForm;
  }

  addCapacitaciones() {
    const capacitaciones: FormArray = this.aspiranteForm.get('capacitaciones') as FormArray
    capacitaciones.push(this.fb.group({
      pais: ['', [Validators.required]],
      evento: ['', [Validators.required]],
      auspiciante: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      certificado: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]]
    }));
  };

  removeCapacitaciones(fI: number) {
    const capacitaciones: FormArray = this.aspiranteForm.get('capacitaciones') as FormArray
    capacitaciones.removeAt(fI)
  }

  getControls() {
    return (this.aspiranteForm.get('capacitaciones') as FormArray).controls;
  }

}
