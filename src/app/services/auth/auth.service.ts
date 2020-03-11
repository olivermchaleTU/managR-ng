import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterModel } from 'src/app/utils/types/AuthTypes';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authBaseUrl = `${environment.authServiceBaseUrl}`;
  constructor(private http: HttpClient) { }

  register(registrationInfo: RegisterModel): Observable<any> {
    return this.http.post<RegisterModel>(`${this.authBaseUrl}/auth/register`, registrationInfo);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}
