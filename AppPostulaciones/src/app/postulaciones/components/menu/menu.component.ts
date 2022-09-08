import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../auth/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  UserId: string | null;
  isAdmin = false;

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.UserId = this.tokenService.getId();
    this.isAdmin = this.tokenService.isAdmin();
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }
}
