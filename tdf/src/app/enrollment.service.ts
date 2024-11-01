import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { catchError, Observable, Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private _url = 'http://localhost:3000/enroll';

  constructor(private _httpClient: HttpClient) { }

  public enroll(user: User): Observable<any> {
    return this._httpClient.post<any>(this._url, user).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
