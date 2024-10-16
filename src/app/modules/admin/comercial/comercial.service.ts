import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, tap } from 'rxjs';
import { Cliente, Grupo, Manifiesto, OrdenTransporte, ValorTabla } from './comercial.types';
import { cloneDeep } from 'lodash';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
};

const httpOptionsUpload = {
  headers: new HttpHeaders({
  'Authorization' : 'Bearer ' + localStorage.getItem('token'),
  })
  // , observe: 'body', reportProgress: true };
};


@Injectable({
  providedIn: 'root'
})
export class ComercialService {
  
  private _httpClient = inject(HttpClient);
  private baseUrl = environment.baseUrl + '/api/Comercial/';
  private baseUrlCliente = environment.baseUrl + '/api/Cliente/';
  private baseUrlOrden = environment.baseUrl + '/api/Orden/';

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
    uploadFile(file: File, UserId: number): Observable<any> {

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      
      return this._httpClient.post(this.baseUrlOrden + 'UploadFile?usrid=' + UserId.toString()
       , formData
       , httpOptionsUpload
     );
   
  }
  procesarMasivo(id: any): any {
    const model = { id: id , usuarioid : 2};
    return this._httpClient.post(this.baseUrl +  'procesarCargaMasiva', model , httpOptions );
  }
  gerAllOrders(ids: any, fecini: any, fecfin: any, idusuario? : string, tiposervicio_id?: string, estado_id?: string, idgrupo?: string, shipment?: string) {

    return this._httpClient.get(
      `${this.baseUrlOrden}GetAllOrder?remitente_id=${ids}&estado_id=${estado_id}&fec_ini=${fecini.toLocaleDateString()}&fec_fin=${fecfin.toLocaleDateString()}&usuario_id=${idusuario}&tiposervicio_id=${tiposervicio_id}&idgrupo=${idgrupo}&shipment=${shipment}`, 
      httpOptions
    );
  }

  getAllOrdersTransportsByManifest(manifiesto_id: number): Observable<OrdenTransporte[]> {
    return this._httpClient.get<OrdenTransporte[]>(this.baseUrl + 'GetAllOrderByManifiesto?manifiestoId=' + manifiesto_id  , httpOptions);
}

getOrdenbyWayPoint(id: any,lat: any,lng: any, tiempo: any, orden: any): any {
  return this._httpClient.get<OrdenTransporte[]>(this.baseUrl  + 'GetOrdenByWayPoint' + '?manifiesto_id=' + id
+  '&lat=' + lat + '&lng=' + lng  + '&ordenentrega='+  orden
+ '&tiempo=' +  tiempo , httpOptions);
}




ActualizarKMxVehiculo(note: Manifiesto): any  {
  const updatedManifest = cloneDeep(note) as any;

  return this._httpClient.post<Manifiesto>(this.baseUrl + 'ActualizarKMxVehiculo', updatedManifest , httpOptions )
   .pipe(
      tap((response) => {

          // Update the notes
          this.getAllManifiestos().subscribe();
      })
);
}

getAllManifiestos(): Observable<Manifiesto[]>
{
    return this._httpClient.get<Manifiesto[]>(this.baseUrl + 'GetAllManifiestos' , httpOptions).pipe(
        tap((response: Manifiesto[]) => {
           // this.orden.next(response);
        })
    );

    // return this._httpClient.get<Note[]>('api/apps/notes/all').pipe(
    //     tap((response: Note[]) => {
    //         this._notes.next(response);
    //     })
    // );
}



}
