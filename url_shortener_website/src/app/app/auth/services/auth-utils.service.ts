import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilityService } from '../../../utility/utility.service';


const _isLoggedIn$ = new BehaviorSubject(false);

@Injectable()
export class AuthUtilsService {
    jwtHelperService: JwtHelperService = new JwtHelperService();
    constructor(private util: UtilityService) {}

    isLoggedIn$(): Observable<boolean> {
        return _isLoggedIn$;
    }

    bearerToken(): string | false {
        const token = this._jwtIsValid();
        if (token) {
            return `bearer ${token}`;
        }
        return false;
    }

    checkToken() {
        this._jwtIsValid();
    }

    checkToken$(): Observable<string> {
        const token = this._jwtIsValid();

        if (token) {
            return of(token as string);
        }

        return throwError(new Error('INVALID_JWT'));
    }

    processToken$(token:any): Observable<User> {
        if (!token) {
            return throwError(new Error('NO_TOKEN'));
        }

        this._storeToken(token);
        const tokenPayload = this._decodeToken(token);

        return of(tokenPayload);
    }

    _decodeToken(token: any): User {
        const user = this.jwtHelperService.decodeToken(token);
        return user;
    }

    decodeToken$(token:any): Observable<User> {
        return of(this._decodeToken(token));
    }

    _storeToken(token:any) {
        return this.util.localStorage!.setItem('sb-clean-blog|token', token);
    }

    removeTokens() {
        return this.util.localStorage!.removeItem('sb-clean-blog|token');
    }

    postOptionsAuthHeaders() {
        return {
            headers: {
                Authorization: this.bearerToken(),
            },
        };
    }

    _jwtIsValid(): string | boolean {
        const token = this.util.localStorage? this.util.localStorage!.getItem('sb-clean-blog|token') : null;

        if (!token) {
            _isLoggedIn$.next(false);
            return false;
        }

        const expired = this.jwtHelperService.isTokenExpired(token);

        if (expired) {
            this.util.localStorage!.removeItem('sb-clean-blog|token');
            _isLoggedIn$.next(false);
            return false;
        }

        _isLoggedIn$.next(true);
        return token;
    }
}
