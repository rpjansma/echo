import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private API_URL =
    'https://newsapi.org/v2/everything?q=economia&from=2021-11-28&sortBy=publishedAt&apiKey=06de4ccd9c7f46319de943bacbb91673';

  private API_KEY = '06de4ccd9c7f46319de943bacbb91673';
  private dataPesquisada = '11-21-2021';

  constructor(private http: HttpClient) {}

  getNewsData() {
    let dataPesquisada = this.dataPesquisada;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '06de4ccd9c7f46319de943bacbb91673',
      })
    };
    return this.http.get(this.API_URL).pipe(
      tap((res) => res),
      catchError((error) => {
        alert('Sorry, we had an error. Can you try again?');
        console.log(error)
        return of(null);
      })
    );
  }
}
