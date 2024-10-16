import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { OrdenTransporte, ValorTabla } from '../comercial/comercial.types';
import { ActivityTotalPendientes } from './reportes.type';





@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  
private _httpClient = inject(HttpClient);
baseUrl = environment.baseUrl + '/api/Reportes/';

httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
};


constructor() { }


  GetCantidadDespacho(fecha: Date, tiposervicioid: string = '',remitenteid: string = ''): Observable<any> {
  
      if (!fecha) {
        throw new Error('La fecha es requerida.');
      }


        let params = new HttpParams()
          .set('fec_ini', fecha.toLocaleDateString() ) // Se utiliza toISOString para un formato estándar
          .set('tiposervicioid', tiposervicioid)
          .set('remitente_id', remitenteid);

        // Realizar la solicitud GET y manejar errores
        return this._httpClient.get<any>(`${this.baseUrl}GetCantidadDespacho`, { ...this.httpOptions, params })
          .pipe(
            catchError(this.handleError) // Manejar errores
          );
    }
    private handleError(error: any): Observable<never> {
        // Manejar el error aquí
        console.error('Ocurrió un error:', error);
        return throwError('Ocurrió un error al realizar la solicitud.');
    }


getPendientesPorDia(fecha: Date, tiposervicioid: string = '', remitenteid: string = ''): Observable<OrdenTransporte[]> {

  console.log(remitenteid);


    // Validar que la fecha no sea nula o indefinida
    if (!fecha) {
      throw new Error('La fecha es requerida.');
    }

    // Crear parámetros de consulta
    let params = new HttpParams()
      .set('fec_ini', fecha.toLocaleDateString()) // Formato estándar ISO
      .set('tiposervicioid', tiposervicioid)
      .set('remitente_id', remitenteid);

    // Realizar la solicitud GET y manejar errores
    return this._httpClient.get<OrdenTransporte[]>(`${this.baseUrl}getPendientesPorDia`, { ...this.httpOptions, params })
      .pipe(
        catchError(this.handleError) // Manejar errores
      );
  }
  getValoresTabla(TablaId: number): Observable<ValorTabla[]> {
    return this._httpClient.get<ValorTabla[]>(environment.baseUrl + '/api/general/GetAllValorTabla' + '?TablaId=' + TablaId, this.httpOptions);
  }
  getActivityOTTotalesYEntregadas(): any{
    return this._httpClient.get<ActivityTotalPendientes[]>(this.baseUrl + 'GetActivityOTTotalesYEntregadas', this.httpOptions );
   }

}
