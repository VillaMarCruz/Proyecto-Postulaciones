import { Component, OnInit } from '@angular/core';
import { Aspirante } from '../../../../interfaces/aspirantes';
import { AspirantesService } from '../../../../services/aspirantes.service';

@Component({
  selector: 'app-lista-aspirantes',
  templateUrl: './lista-aspirantes.component.html',
  styleUrls: ['./lista-aspirantes.component.css']
})
export class ListaAspirantesComponent implements OnInit {

  aspirantes: Aspirante[];
  keys: string[];
  value = '';
  param = '';

  constructor(
    private aspiranteService: AspirantesService
  ) { }

  ngOnInit(): void {
    this.obtenerAspirantes();
  }

  obtenerAspirantes(){
    this.aspiranteService.lista().subscribe({
      next: (data) => {
        this.aspirantes = data.results;
        this.keys = Object.keys(this.aspirantes[0]);
      }
    });
  }

  busquedaAspirante(){
    console.log(this.param, this.value);
    this.aspiranteService.search(this.param, this.value).subscribe({
      next: (data)=>{
        this.aspirantes = data.results;
      },
      error: (err)=> {
        console.log(err.error.message);
      }
    })
  }

}
