import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
};



@Injectable({
  providedIn: 'root'
})
export class CommonService {

  
  private _httpClient = inject(HttpClient);
  private baseUrl = environment.baseUrl + '/api/General/';

constructor() { }

getAllUbigeo(): Observable<any[]> {
  return this._httpClient.get<any[]>(`${this.baseUrl}GetListUbigeo` , httpOptions);
}

}
