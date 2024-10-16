import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
  // , observe: 'body', reportProgress: true };
};



@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private baseUrl = environment.baseUrl + '/api/Auth/';
  private baseUrlUser = environment.baseUrl + '/api/Users/';
  private _user: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);

  private _httpClient = inject(HttpClient);

  constructor() { }


  get(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.baseUrlUser}`).pipe(
        tap((users: User[]) => {
            this._user.next(users);  // Aquí ya es un array de usuarios, no es necesario agregar []
        })
    );
}


  registerUser(user: User): Observable<any> {

    console.log('para registrar:', user);

    return this._httpClient.post(`${this.baseUrlUser}register`, user);
  }

  // Método para actualizar el estado del usuario
  updateUserStatus(user: any): Observable<any> {
    return this._httpClient.post(`${this.baseUrlUser}updateestado`, user);
  }

  // Método para actualizar la contraseña del usuario
  updatePassword(user: any): Observable<any> {
    return this._httpClient.post(`${this.baseUrlUser}updatePassword`, user);
  }

}