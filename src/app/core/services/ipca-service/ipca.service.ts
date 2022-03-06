import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IpcaService {
  private initialDate = '11/01/2021';
  private finalDate = '21/11/2021';
  private API_URL = 'http://localhost:4000/economics/ipca';
  constructor(private http: HttpClient) {}

  getIpcaData() {
    let initialDate = this.initialDate;
    let finalDate = this.finalDate;
    return this.http
      .get(this.API_URL, {
        params: {
          initialDate: initialDate,
          finalDate: finalDate,
        },
      })
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
