import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DolarServiceInterface } from '../../../shared/interfaces/dolar-interface';

@Injectable({
  providedIn: 'root',
})
export class PtaxService {
  private initialDate = '11-01-2021';
  private finalDate = '11-21-2021';
  private API_URL =
    'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata';
  constructor(private http: HttpClient) {}

  getDolarData(): Observable<DolarServiceInterface> {
    let initialDate = this.initialDate
    let finalDate = this.finalDate
    return this.http
      .get<DolarServiceInterface[]>(
        this.API_URL +
          "/CotacaoDolarPeriodo(dataInicial='" +
          initialDate +
          "',dataFinalCotacao='" +
          finalDate +
          "')?$format=json",
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      .pipe(
        map((res) => res),
        catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
      );
  }

  changeInitialDate(date: string) {
    this.initialDate = date;
  }

  changeFinalDate(date: string) {
    this.finalDate = date;
  }
}
