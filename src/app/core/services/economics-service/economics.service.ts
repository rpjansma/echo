import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EconomicsService {
  private API_URL = environment.api;

  private today = new Date();
  private priorDate = new Date(new Date().setDate(this.today.getDate() - 30));

  private initialDate =
    this.priorDate.getDate() +
    '/' +
    (this.priorDate.getMonth() + 1) +
    '/' +
    this.priorDate.getFullYear();

  private finalDate =
    this.today.getDate() +
    '/' +
    (this.today.getMonth() + 1) +
    '/' +
    this.today.getFullYear();

  constructor(private http: HttpClient) {}

  getIpcaData() {
    let initialDate = this.initialDate;
    let finalDate = this.finalDate;
    return this.http
      .get(this.API_URL + '/economics/ipca', {
        params: {
          initialDate: initialDate,
          finalDate: finalDate,
        },
      })
      .pipe(
        map((res) => res),
        catchError((error) => {
          alert(
            'Sorry, we had a problem while collecting IPCA data. Try again later.'
          );
          return of(null);
        })
      );
  }

  getIbovespaData() {
    let initialDate = this.initialDate;
    let finalDate = this.finalDate;
    return this.http
      .get(this.API_URL + '/economics/ibovespa', {
        params: {
          initialDate: initialDate,
          finalDate: finalDate,
        },
      })
      .pipe(
        map((res) => res),
        catchError((error) => {
          alert(
            'Sorry, we had a problem while collecting IBOVESPA data. Try again later.'
          );
          return of(null);
        })
      );
  }

  getCdiData() {
    let initialDate = this.initialDate;
    let finalDate = this.finalDate;
    return this.http
      .get(this.API_URL + '/economics/cdi', {
        params: {
          initialDate: initialDate,
          finalDate: finalDate,
        },
      })
      .pipe(
        map((res) => res),
        catchError((error) => {
          alert(
            'Sorry, we had a problem while collecting CDI data. Try again later.'
          );
          return of(null);
        })
      );
  }

  getPibData() {
    let initialDate = this.initialDate;
    let finalDate = this.finalDate;
    return this.http
      .get(this.API_URL + '/economics/pib', {
        params: {
          initialDate: initialDate,
          finalDate: finalDate,
        },
      })
      .pipe(
        map((res) => res),
        catchError((error) => {
          alert(
            'Sorry, we had a problem while collecting PIB data. Try again later.'
          );
          return of(null);
        })
      );
  }

  getPtaxData() {
    let initialDate = this.initialDate;
    let finalDate = this.finalDate;
    return this.http
      .get(this.API_URL + '/economics/ptax', {
        params: {
          initialDate: initialDate,
          finalDate: finalDate,
        },
      })
      .pipe(
        map((res) => res),
        catchError((error) => {
          alert(
            'Sorry, we had a problem while collecting PTAX data. Try again later.'
          );
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
