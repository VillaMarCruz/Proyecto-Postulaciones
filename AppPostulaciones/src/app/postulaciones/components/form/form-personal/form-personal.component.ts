import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-personal',
  templateUrl: './form-personal.component.html',
  styleUrls: ['./form-personal.component.css']
})
export class FormPersonalComponent implements OnInit {

  @Input()
  aspiranteForm!:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.aspiranteForm;
  }
}
