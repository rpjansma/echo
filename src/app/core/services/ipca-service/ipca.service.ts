import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DolarServiceInterface } from '../../../shared/interfaces/dolar-interface';

@Injectable({
  providedIn: 'root',
})
export class IpcaService {
  private initialDate = '11/01/2021';
  private finalDate = '21/11/2021';
  private API_URL =
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/';
  constructor(private http: HttpClient) {}

  getIpcaData(){
    let initialDate = this.initialDate
    let finalDate = this.finalDate
    return this.http
      .get(
        this.API_URL +
          "dados?formato=json&dataInicial=" +
          initialDate +
          "&dataFinal=" +
          finalDate
      )
      .pipe(
        map((res) => res),
        catchError((error) => {
          alert('DEU RUIM NA API DO IPCA MANÉ');
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
