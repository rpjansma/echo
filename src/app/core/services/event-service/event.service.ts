import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { Event } from '../../../shared/interfaces/event-interface';

const API_URL = environment.api

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http
      .get<Event[]>(API_URL + '/events', { observe: 'response' })
      .pipe(
        map((res) => {
          return res.body;
        }),
        catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
      );
  }

  getUserEvents(id: string) {
    return this.http
      .get<Event[]>(API_URL + '/events/' + id, { observe: 'response' })
      .pipe(
        map((res) => {
          return res.body;
        }),
        catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
      );
  }

  createEvent(user: string, title: string, start: Date, end: Date) {
    return this.http
      .post(
        API_URL + '/events',
        { user, title, start, end },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const body = res.body;
        }),
        catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
      );
  }

  updateEvent(id: any, title: string, start: Date, end: Date) {
    return this.http
      .put(
        API_URL + '/events/' + id,
        { title, start, end },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const body = res.body;
        }),
        catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
      );
  }

  deleteEvent(id: string) {
    return this.http.delete(API_URL + '/events/' + id).pipe(
      catchError((error) => {
        alert('Sorry, we had an error. Can you try again?');
        return of(null);
      })
    );
  }
}
