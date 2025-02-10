import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  get(url: string, params?: any): Observable<any> {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params,
      withCredentials: true
    });
  }

  post(url: string, data: any = {}, params?: any): Observable<any> {
    return this.http.post(this.baseUrl + url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params,
      withCredentials: true,
    });
  }

  put(url: string, data: any = {}, params?: any): Observable<any> {
    return this.http.put(this.baseUrl + url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params,
      withCredentials: true,
    });
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.baseUrl + url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    });
  }
}
