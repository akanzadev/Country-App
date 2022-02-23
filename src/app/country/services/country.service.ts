import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Country } from '../models/country-name';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private BASE_URL = environment.API_BASE;
  constructor(private http: HttpClient) {}

  get httpParams() {
    let params = new HttpParams();
    params = params.append(
      'fields',
      'name,capital,region,population,cca2,flags'
    );
    return params;
  }

  getByName(name: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.BASE_URL}/name/${name}`, {
        params: this.httpParams,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(
              () => new Error('No results found with this name =>' + name)
            );
          }
          return throwError(() => new Error('Error in the server'));
        })
      );
  }

  getByCapital(capital: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.BASE_URL}/capital/${capital}`, {
        params: this.httpParams,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(
              () => new Error('No results found with this capital =>' + capital)
            );
          }
          return throwError(() => new Error('Error in the server'));
        })
      );
  }

  getByRegion(region: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.BASE_URL}/region/${region}`, {
        params: this.httpParams,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(
              () => new Error('No results found with this region =>' + region)
            );
          }
          return throwError(() => new Error('Error in the server'));
        })
      );
  }

  getByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.BASE_URL}/alpha/${code}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(
            () => new Error('No results found with this code =>' + code)
          );
        }
        return throwError(() => new Error('Error in the server'));
      })
    );
  }
}
