import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial='01-01-2021',dataFinalCotacao='09-18-2021')?$format=json";

@Injectable({
  providedIn: 'root',
})
export class DolarService {

  constructor(private http: HttpClient) {}

  getDolarData() {
    return this.http
      .get(
        API_URL      )
      .pipe(
        map(res => {
          return res
        }),
        catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
      );
  }
}