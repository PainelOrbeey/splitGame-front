import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { ConfigService } from './config.service';

export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RequestCenterService {
  private baseUrl: string;
  private authBaseUrl: string;
  private defaultHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.baseUrl = this.configService.apiUrl;
    this.authBaseUrl = this.configService.authApiUrl;
    this.defaultHeaders = new HttpHeaders(this.configService.getDefaultHeaders());
  }

  /**
   * Configura a URL base da API
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Configura a URL base da API de autenticação
   */
  setAuthBaseUrl(url: string): void {
    this.authBaseUrl = url;
  }

  /**
   * Configura headers padrão
   */
  setDefaultHeaders(headers: HttpHeaders): void {
    this.defaultHeaders = headers;
  }

  /**
   * Adiciona token de autorização aos headers
   */
  setAuthToken(token: string): void {
    this.defaultHeaders = this.defaultHeaders.set('Authorization', `Bearer ${token}`);
  }

  /**
   * Remove token de autorização dos headers
   */
  removeAuthToken(): void {
    this.defaultHeaders = this.defaultHeaders.delete('Authorization');
  }

  /**
   * GET - Buscar dados
   */
  get<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    const requestOptions = this.buildRequestOptions(options);
    
    return this.http.get<T>(url, requestOptions)
      .pipe(
        timeout(this.configService.apiTimeout),
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * POST - Criar novo recurso
   */
  post<T>(endpoint: string, data: any, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    const requestOptions = this.buildRequestOptions(options);
    
    return this.http.post<T>(url, data, requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * PUT - Atualizar recurso completo
   */
  put<T>(endpoint: string, data: any, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    const requestOptions = this.buildRequestOptions(options);
    
    return this.http.put<T>(url, data, requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * PATCH - Atualizar recurso parcialmente
   */
  patch<T>(endpoint: string, data: any, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    const requestOptions = this.buildRequestOptions(options);
    
    return this.http.patch<T>(url, data, requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * DELETE - Remover recurso
   */
  delete<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    const requestOptions = this.buildRequestOptions(options);
    
    return this.http.delete<T>(url, requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Upload de arquivo
   */
  upload<T>(endpoint: string, file: File, additionalData?: any): Observable<T> {
    const url = this.buildUrl(endpoint);
    const formData = new FormData();
    
    formData.append('file', file);
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    const headers = new HttpHeaders();
    headers.delete('Content-Type'); // Deixa o browser definir o Content-Type para FormData

    return this.http.post<T>(url, formData, { 
      headers,
      reportProgress: true 
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Download de arquivo
   */
  download(endpoint: string, filename?: string): Observable<Blob> {
    const url = this.buildUrl(endpoint);
    
    return this.http.get(url, {
      responseType: 'blob',
      headers: this.defaultHeaders
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca com paginação
   */
  getPaginated<T>(endpoint: string, page: number = 1, limit: number = 10, filters?: any): Observable<T> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.get<T>(endpoint, { params });
  }

  /**
   * Busca por ID
   */
  getById<T>(endpoint: string, id: string | number): Observable<T> {
    return this.get<T>(`${endpoint}/${id}`);
  }

  /**
   * Criar novo recurso
   */
  create<T>(endpoint: string, data: any): Observable<T> {
    return this.post<T>(endpoint, data);
  }

  /**
   * Atualizar recurso por ID
   */
  update<T>(endpoint: string, id: string | number, data: any): Observable<T> {
    return this.put<T>(`${endpoint}/${id}`, data);
  }

  /**
   * Atualizar recurso parcialmente por ID
   */
  updatePartial<T>(endpoint: string, id: string | number, data: any): Observable<T> {
    return this.patch<T>(`${endpoint}/${id}`, data);
  }

  /**
   * Remover recurso por ID
   */
  remove<T>(endpoint: string, id: string | number): Observable<T> {
    return this.delete<T>(`${endpoint}/${id}`);
  }

  /**
   * POST para API de autenticação - Login
   */
  authPost<T>(endpoint: string, data: any, options?: RequestOptions): Observable<T> {
    const url = this.buildAuthUrl(endpoint);
    const requestOptions = this.buildRequestOptions(options);
    
    return this.http.post<T>(url, data, requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * DELETE para API de autenticação - Logout
   */
  authDelete<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    const url = this.buildAuthUrl(endpoint);
    const requestOptions = this.buildRequestOptions(options);
    
    return this.http.delete<T>(url, requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * GET para API de autenticação
   */
  authGet<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    const url = this.buildAuthUrl(endpoint);
    const requestOptions = this.buildRequestOptions(options);
    
    return this.http.get<T>(url, requestOptions)
      .pipe(
        timeout(this.configService.apiTimeout),
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Constrói a URL completa
   */
  private buildUrl(endpoint: string): string {
    // Remove barra inicial se existir
    endpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${this.baseUrl}/${endpoint}`;
  }

  /**
   * Constrói a URL completa para API de autenticação
   */
  private buildAuthUrl(endpoint: string): string {
    // Remove barra inicial se existir
    endpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${this.authBaseUrl}/${endpoint}`;
  }

  /**
   * Constrói opções da requisição
   */
  private buildRequestOptions(options?: RequestOptions) {
    const result: {
      headers: HttpHeaders;
      params?: HttpParams;
      responseType?: any;
      withCredentials?: boolean;
    } = {
      headers: this.defaultHeaders
    };

    if (!options) {
      return result;
    }

    if (options.headers) {
      result.headers = options.headers instanceof HttpHeaders ? 
        options.headers : 
        new HttpHeaders(options.headers);
    }

    if (options.params) {
      result.params = options.params instanceof HttpParams ? 
        options.params : 
        new HttpParams({ fromObject: options.params });
    }

    if (options.responseType && options.responseType !== 'json') {
      result.responseType = options.responseType;
    }

    if (options.withCredentials !== undefined) {
      result.withCredentials = options.withCredentials;
    }

    return result;
  }

  /**
   * Tratamento de erros
   */
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 0:
          errorMessage = 'Não foi possível conectar ao servidor';
          break;
        case 400:
          errorMessage = 'Requisição inválida';
          break;
        case 401:
          errorMessage = 'Não autorizado';
          break;
        case 403:
          errorMessage = 'Acesso negado';
          break;
        case 404:
          errorMessage = 'Recurso não encontrado';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }

      // Se a resposta tem uma mensagem customizada
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }

    console.error('Erro na requisição:', error);
    return throwError(() => new Error(errorMessage));
  };
}