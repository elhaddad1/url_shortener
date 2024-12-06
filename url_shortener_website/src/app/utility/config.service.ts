import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Config {
  sbCleanBlogNodeURL: string;
  demoEnabled: boolean;
}

let _config: Config;

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(private http: HttpClient) {}

  /**
   * Loads the configuration from the specified JSON file and ensures
   * that the result is of type `Promise<Config>`.
   */
  loadConfig(): Promise<Config> {
    return firstValueFrom(
      this.http.get<Config>(`assets/config.json`).pipe(
        tap((config) => {
          if (!config) {
            throw new Error('Config file is empty or invalid.');
          }
          _config = config;
        })
      )
    );
  }

  /**
   * Returns the loaded configuration.
   */
  get config() {
    return _config;
  }
}
