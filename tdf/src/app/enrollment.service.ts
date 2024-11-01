import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private _url = '';

  constructor(private _httpClient: HttpClient) { }

  public enroll(user: User): Observable<any> {
    return this._httpClient.post<any>(this._url, user)
  }
}
