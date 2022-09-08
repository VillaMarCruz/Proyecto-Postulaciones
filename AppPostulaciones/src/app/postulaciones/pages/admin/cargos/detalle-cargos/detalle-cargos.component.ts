import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargosService } from 'src/app/postulaciones/services/cargos.service';
import { Aspirante } from '../../../../interfaces/aspirantes';

@Component({
  selector: 'app-detalle-cargos',
  templateUrl: './detalle-cargos.component.html',
  styleUrls: ['./detalle-cargos.component.css']
})
export class DetalleCargosComponent implements OnInit {

  aspirantes: Aspirante[];

  constructor(
    private cargoService: CargosService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.cargoService.detailCargoAspirante(id).subscribe({
      next: data => {
        this.aspirantes = data.results;
        console.log(this.aspirantes);
      }
    })
  }

}
