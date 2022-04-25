import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Image } from 'src/app/model/image';


@Injectable({
  providedIn: 'root'
})

export class ImageService {

  private baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9000/';
  }

  public get(id: any): Observable<Image> {
    return this.http.get<Image>(this.baseUrl + "image/" + id);
  }

  public getBySimulationAndFolder(simulation: any, folder: any): Observable<Image> {
    return this.http.get<Image>(this.baseUrl + "images/" + simulation + "/" + folder);
  }

  public add(image: Image) {
    return this.http.post<Image>(this.baseUrl + "image", image);
  }
}
