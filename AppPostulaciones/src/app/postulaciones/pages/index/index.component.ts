import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../auth/services/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  usuario: string | null

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.usuario = this.tokenService.getName();
  }

}
