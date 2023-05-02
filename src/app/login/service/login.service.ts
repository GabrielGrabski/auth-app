import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthResponse } from '../interface/auth-response';
import { environment } from 'src/environments/environment.development';
import { UserRequest } from '../interface/user-request';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  login(user: UserRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.authApi}/api/auth`, user)
      .pipe(catchError((err) => throwError(() => err)));
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
