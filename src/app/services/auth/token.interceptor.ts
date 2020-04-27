// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });

        return next.handle(request).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    Swal.fire({
                        title: 'Session Expired',
                        text: 'Your session has expired, please log in again',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                    }).then(clicked => {
                        this.router.navigate(['login']);
                    });
                }
            }));
    }
}
