import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/name';
  }

  public runScript() : Observable<any> {
    return this.http.get<any>(this.url);
  }
}
