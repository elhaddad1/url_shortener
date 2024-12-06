import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable()
export class UtilityService {
  parse: JSON['parse'];
  stringify: JSON['stringify'];
  localStorage: Storage | null = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
    this.parse = JSON.parse;
    this.stringify = JSON.stringify;

    // Only assign `localStorage` in the browser context
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = localStorage;
    }
  }

  get version$(): Observable<string> {
    return this.http.get('/assets/version', { responseType: 'text' });
  }

  getStoredObject<T>(objectName: string): T | undefined {
    if (!this.localStorage) {
      return undefined; // Return undefined if `localStorage` is unavailable
    }
    const objectString = this.localStorage.getItem(objectName);
    if (!objectString) {
      return undefined;
    }
    return this.parse(objectString) as T;
  }

  storeObject(objectName: string, objectToStore: {}): void {
    if (this.localStorage) {
      this.localStorage.setItem(objectName, this.stringify(objectToStore));
    }
  }
}
