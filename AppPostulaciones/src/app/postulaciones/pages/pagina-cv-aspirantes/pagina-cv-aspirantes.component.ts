import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aspirante } from '../../interfaces/aspirantes';
import { AspirantesService } from '../../services/aspirantes.service';
import { TokenService } from '../../../auth/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagina-cv-aspirantes',
  templateUrl: './pagina-cv-aspirantes.component.html',
  styleUrls: ['./pagina-cv-aspirantes.component.css']
})
export class PaginaCvAspirantesComponent implements OnInit {

  aspirantes: Aspirante[];
  isUser = false;
  constructor(
    private aspiranteService: AspirantesService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.isUserCV(id);
    this.buscarCVAspirante(id);
  }

  isUserCV(id: string) {
    if (id === this.tokenService.getId()) {
      this.isUser = true;
    }
  }

  buscarCVAspirante(id: string) {
    this.aspiranteService.searchUserId(id).subscribe({
      next: data => {
        this.aspirantes = data.results;
      },
      error: err => {
        console.log(err.error.message);
      }
    })
  }

  onDelete() {
    const id = this.activatedRoute.snapshot.params['id'];
    const confirmDelete = confirm('Estas seguro que deseas eliminar esta cuenta');
    if (confirmDelete) {
      this.aspiranteService.delete(this.aspirantes[0]._id).subscribe({
        next: (data) => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.tokenService.logOut();
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      });
    }
  }

}
