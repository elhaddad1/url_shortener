import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthUtilsService } from './auth-utils.service';
import { ConfigService } from '../../../utility/config.service';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private authUtilsService: AuthUtilsService,
        private router: Router
    ) {}

    login$(loginPayload: any): Observable<boolean> {
        return this.http
            .post<any>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/auth/login`,
                loginPayload
            )
            .pipe(
                switchMap(
                    (loginResults): Observable<any> =>
                        this.authUtilsService.processToken$(loginResults.token)
                ),
                switchMap(user => {
                    return from(this.router.navigate(['/']));
                }),
                catchError((error: Error) => throwError(error))
            );
    }
}
