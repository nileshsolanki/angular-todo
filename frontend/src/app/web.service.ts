import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  get = (url: string) => {
    return this.http.get(url);
  }


  post = (url: string, payload: Object) => {
    return this.http.post(url, payload);
  }


  patch = (url: string, payload: Object) => {
    return this.http.patch(url, payload);
  }
  

  delete = (url: string) => {
    return this.http.delete(url);
  }



}

