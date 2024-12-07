import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Config } from '../models/config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private _config!: Config;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return firstValueFrom(
      this.http.get<Config>('assets/config.json').pipe(
        tap((config) => {
          if (!config) {
            throw new Error('Config file is empty or invalid.');
          }
          this._config = config;
        })
      )
    ).then(() => {});
  }

  get config(): Config {
    if (!this._config) {
      throw new Error('Configuration not loaded. Call loadConfig() first.');
    }
    return this._config;
  }

  /**
   * Returns the API base URL from the loaded configuration.
   * Throws an error if the configuration is not loaded.
   */
  public get apiBaseUrl(): string {
    const config = this.config;
    if (!config) {
      throw new Error('Configuration not loaded. Ensure ConfigService.loadConfig() is called.');
    }
    return config.sbCleanBlogNodeURL;
  }
}