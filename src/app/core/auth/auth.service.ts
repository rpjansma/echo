import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { TokenService } from '../services/token/token.service';
import { UserService } from '../services/user-service/user.service';

const API_URL = environment.api;

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  authenticate(username: string, password: string) {
    return this.http.post(
      API_URL + '/users/authenticate',
      { username, password },
      { observe: 'response' }
    );
  }

  refreshToken() {
    let token = this.tokenService.getToken();
    return this.http
      .post(
        API_URL + '/users/refresh-token',
        { token },
        { observe: 'response' }
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
