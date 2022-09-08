import { Component, OnInit } from '@angular/core';
import { CargosService } from '../../../../services/cargos.service';
import { Cargos } from '../../../../interfaces/aspirantes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-cargos',
  templateUrl: './lista-cargos.component.html',
  styleUrls: ['./lista-cargos.component.css']
})
export class ListaCargosComponent implements OnInit {

  cargos: Cargos[];

  constructor(
    private cargosService: CargosService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.obtenerCargos();
  }

  obtenerCargos(){
    this.cargosService.lista().subscribe({
      next: data => {
        this.cargos = data.results;
      }
    });
  }

  onDelete(id: string){
    this.cargosService.delete(id).subscribe({
      next: data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.obtenerCargos();
      },
      error: err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    })
  }

}
