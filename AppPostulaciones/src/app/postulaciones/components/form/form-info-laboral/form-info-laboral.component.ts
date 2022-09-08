import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-info-laboral',
  templateUrl: './form-info-laboral.component.html',
  styleUrls: ['./form-info-laboral.component.css']
})
export class FormInfoLaboralComponent implements OnInit {

  @Input()
  aspiranteForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.aspiranteForm;
  }

  addInformacionLaboral() {
    const laborales: FormArray = this.aspiranteForm.get('informacionLaboral') as FormArray
    laborales.push(this.fb.group({
      tipoInstitucion: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      unidad: ['', [Validators.required]],
      puesto: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      motivoSalida: ['', [Validators.required]],
    }));
  };

  removeInformacionLaboral(fI: number) {
    const laborales: FormArray = this.aspiranteForm.get('informacionLaboral') as FormArray
    laborales.removeAt(fI)
  }

  getControls() {
    return (this.aspiranteForm.get('informacionLaboral') as FormArray).controls;
  }
}
