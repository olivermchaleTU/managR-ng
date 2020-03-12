import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterModel, LoginModel } from 'src/app/utils/types/AuthTypes';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

// Singleton service
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  private authBaseUrl = `${environment.authServiceBaseUrl}`;
  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  register(registrationInfo: RegisterModel): Observable<any> {
    return this.http.post<RegisterModel>(`${this.authBaseUrl}/auth/register`, registrationInfo);
  }

  login(loginInfo: LoginModel): Observable<any> {
    return this.http.post<LoginModel>(`${this.authBaseUrl}/auth/login`, loginInfo);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    if (this.isLoggedIn) {
      const expiryEpoch = localStorage.getItem('currentTokenExpiry');
      // multiply our epoch by 1000 to get milliseconds to create a new date using our epoch date
      const expiryDate = new Date(Number(expiryEpoch) * 1000);
      if (expiryDate > new Date()) {
        return true;
      }
    }
    return false;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  setTokenInfo(token: string) {
    localStorage.setItem('token', token);
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    localStorage.setItem('currentUserId', decodedToken.sub);
    localStorage.setItem('currentUserFirstName', decodedToken.name);
    localStorage.setItem('currentUserLastName', decodedToken.family_name);
    localStorage.setItem('currentUserRole', decodedToken.role);
    localStorage.setItem('currentTokenExpiry', decodedToken.exp);
  }
}
