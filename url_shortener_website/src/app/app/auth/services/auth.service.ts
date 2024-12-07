import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { AuthUtilsService } from './auth-utils.service';
import { ConfigService } from '../../../utility/config.service';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private authUtilsService: AuthUtilsService,
    private router: Router
  ) {
    
  }
  
  /**
   * Handles user login and stores the token.
   */
  login$(loginPayload: any): Observable<boolean> {
    return this.http
      .post<{ token: string }>(
        `${this.configService.apiBaseUrl}/api/latest/auth/login`,
        loginPayload
      )
      .pipe(
        switchMap(({ token }) => this.authUtilsService.processToken$(token)),
        switchMap(() => from(this.router.navigate(['/']))),
        map(() => true),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Handles user registration.
   */
  register(data: { email: string; password: string; name: string }): Observable<void> {
    return this.http
      .post<void>(`${this.configService.apiBaseUrl}/api/latest/auth/register`, data)
      .pipe(
        switchMap(() =>
          from(this.router.navigate(['/login'])).pipe(switchMap(() => [])) // Converts result to `void`
        ),
        catchError((error) => {
          console.error('Registration error:', error);
          return throwError(() => error);
        })
      );
  }
  

  /**
   * Logs out the user and removes tokens.
   */
  logout(): void {
    this.authUtilsService.removeTokens();
    this.router.navigate(['/login']);
  }

  /**
   * Checks if the user is authenticated.
   */
  isAuthenticated(): Observable<boolean> {
    return this.authUtilsService.isLoggedIn$();
  }
}
