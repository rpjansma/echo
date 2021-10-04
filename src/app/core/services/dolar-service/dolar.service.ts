import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

const API_URL = environment.dolar_api;
let dataInicial = '01-02-2020'
let dataFinal = '01-02-2021'
let endpoint = "/CotacaoDolarPeriodo(dataInicial='" + dataInicial + "',dataFinalCotacao='" + dataFinal + "')?$format=json"
let final_url = API_URL + endpoint

@Injectable({
  providedIn: 'root',
})
export class DolarService {

  constructor(private http: HttpClient) {

  }

  getAllUsers() {
    return this.http.get(final_url).pipe(
      map((res) => {
        console.log(res);
      }),
      catchError((error) => {
        alert('Sorry, we had an error. Can you try again?');
        return of(null);
      })
      console.log(final_url)
    );
  }

}
