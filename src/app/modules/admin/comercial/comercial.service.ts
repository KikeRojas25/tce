import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Cliente, Grupo, ValorTabla } from './comercial.types';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
};




@Injectable({
  providedIn: 'root'
})
export class ComercialService {
  
  private _httpClient = inject(HttpClient);
  baseUrl = environment.baseUrl + '/api/Comercial/';
  baseUrlCliente = environment.baseUrl + '/api/Cliente/';

constructor() { }

  getClientes(criterio: string, usuarioid: number): Observable<Cliente[]> {
    return this._httpClient.get<Cliente[]>(environment.baseUrl + '/api/cliente/' +'GetAllClientes?criterio='+ criterio+'&UsuarioId=' + usuarioid  ,httpOptions);
  };
  getValoresTabla(TablaId: number): Observable<ValorTabla[]> {
    return this._httpClient.get<ValorTabla[]>(environment.baseUrl + '/api/general/GetAllValorTabla' + '?TablaId=' + TablaId, httpOptions);
  }

  getGrupos(criterio: string, usuarioid: number): Observable<Grupo[]> {
      return this._httpClient.get<Grupo[]>(`${this.baseUrlCliente}GetAllGrupo`  ,httpOptions);
    };

    getClientesxGrupo(id: number) : Observable<Cliente[]> {
      return this._httpClient.get<Cliente[]>(`${this.baseUrlCliente}GetAllClientesxGrupo?idgrupo=${id}`   ,httpOptions);
    }






}
