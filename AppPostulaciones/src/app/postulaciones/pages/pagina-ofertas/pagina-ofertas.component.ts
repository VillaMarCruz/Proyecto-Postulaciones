import { Component, OnInit } from '@angular/core';
import { CargosService } from '../../services/cargos.service';
import { Cargos } from '../../interfaces/aspirantes';
import { AspirantesService } from '../../services/aspirantes.service';
import { TokenService } from '../../../auth/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagina-ofertas',
  templateUrl: './pagina-ofertas.component.html',
  styleUrls: ['./pagina-ofertas.component.css']
})
export class PaginaOfertasComponent implements OnInit {

  cargos: Cargos[];

  constructor(
    private aspiranteService: AspirantesService,
    private cargosServices: CargosService,
    private tokenService: TokenService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.obtenerCargos();
  }

  obtenerCargos(){
    this.cargosServices.lista().subscribe({
      next: (data) => {
        this.cargos = data.results;
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    });
  }

  onPostular(idCargo: string){
    let idUser = this.tokenService.getId();
    let idAspirante;

    this.aspiranteService.searchUserId(idUser).subscribe({
      next: data => {
        idAspirante = data.results[0]._id;
        let postulacion = {
          "_id": idAspirante,
          "postulaciones": [idCargo]
        }
        this.aspiranteService.savePostulaciones(postulacion).subscribe({
          next: (data) => {
            this.toastr.success(data.message, 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
          },
          error: err =>{
            this.toastr.error(err.error.message, 'Fail', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
          }
        });
      },
      error: err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    });

    /*  */


    /* */
  }

}
