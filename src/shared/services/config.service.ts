import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  /**
   * Retorna se está em modo de produção
   */
  get isProduction(): boolean {
    return environment.production;
  }

  /**
   * Retorna a URL base da API
   */
  get apiUrl(): string {
    return environment.apiUrl;
  }

  /**
   * Retorna a URL base da API de autenticação
   */
  get authApiUrl(): string {
    return environment.apiUrl;
  }

   /**
   * Retorna o timeout das requisições da API
   */
  get apiTimeout(): number {
    return environment.apiTimeout;
  }

  /**
   * Retorna toda a configuração do environment
   */
  getEnvironment() {
    return environment;
  }

  /**
   * Constrói URL completa da API
   */
  buildApiUrl(endpoint: string): string {
    // Remove barra inicial se existir
    endpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${this.apiUrl}/${endpoint}`;
  }

  /**
   * Constrói URL completa da API de autenticação
   */
  buildAuthApiUrl(endpoint: string): string {
    // Remove barra inicial se existir
    endpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${this.authApiUrl}/${endpoint}`;
  }

  /**
   * Retorna configurações de headers para requisições
   */
  getDefaultHeaders(): { [key: string]: string } {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-App-Version': "0.1",
      'X-App-Name': "MyApp"
    };
  }
}
