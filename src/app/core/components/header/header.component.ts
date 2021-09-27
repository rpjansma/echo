import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'echo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) {}

  isLogged() {
    return this.userService.isLogged();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
