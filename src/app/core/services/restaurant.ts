import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {

  private apiUrl = '/api';
  private httpClient = inject(HttpClient);

  getAllRestaurants(): Observable<Restaurant[]>{
    return this.httpClient.get<Restaurant[]>(`${this.apiUrl}/restaurants`)
    .pipe(
      catchError(error => {
        console.log('Error Message', error.Message)
        return(of([]))
      })
    );
  }

  getRestaurantById(id: number): Observable<Restaurant>{
    return this.httpClient.get<Restaurant>(`${this.apiUrl}/restaurants/${id}`).
    pipe(
      catchError(error => {
        console.log('Error message', error.message)
        return of({} as Restaurant)
      })
    );
  }

}

