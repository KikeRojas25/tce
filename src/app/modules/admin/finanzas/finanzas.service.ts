import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Manifiesto } from '../comercial/comercial.types';
import { cloneDeep } from 'lodash-es';
import moment from 'moment';


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
export class FinanzasService {

private _httpClient = inject(HttpClient);

baseUrl = environment.baseUrl + '/api/Manifiesto/';
private _manifiesto: BehaviorSubject<Manifiesto | null> = new BehaviorSubject(null);
private _manifiestos: BehaviorSubject<Manifiesto[] | null> = new BehaviorSubject(null);




constructor() { }


get manifiesto$(): Observable<Manifiesto>
{
    return this._manifiesto.asObservable();
}


getManifiestos(selectedCliente: string, fec_ini: Date, fec_fin: Date,  idusuario: number = 1
  , idtiposervicio = null): Observable<Manifiesto[]>   {

      let tipo = '';
      if(idtiposervicio !== null)
      {
          tipo = idtiposervicio;
      }


     const params = 'ids=' + selectedCliente
     + '&idusuario=' + idusuario.toString()
     + '&inicio=' + fec_ini.toLocaleDateString() + '&fin=' +  fec_fin.toLocaleDateString()
     + '&idtiposervicio=' +  tipo ;

     return this._httpClient.get<Manifiesto[]>(this.baseUrl + 'GetAllManifiestos?' + params , httpOptions).pipe(
         tap((response: Manifiesto[]) => {
             this._manifiestos.next(response);
         })
     );
 }

getAllManifiestos(): Observable<Manifiesto[]>
{
    return this._httpClient.get<Manifiesto[]>(`${this.baseUrl}GetAllManifiestos` , httpOptions).pipe(
        tap((response: Manifiesto[]) => {
            this._manifiestos.next(response);
        })
    );
}
getManifiestoById(id: string): Observable<Manifiesto>
{
    return this._httpClient.get<Manifiesto>(`${this.baseUrl}GetManifiesto?id=${id}`  , httpOptions).pipe(
        tap((response: Manifiesto) => {
            this._manifiesto.next(response);
        })
    );
}
getCentroCostoById(id: string): Observable<Manifiesto>
{
    return this._httpClient.get<Manifiesto>(this.baseUrl + 'GetCentroCosto?id=' + id  , httpOptions).pipe(
        tap((response: Manifiesto) => {

          response.estiba_fecha = new Date(response.estiba_fecha) ;
          response.estibaadicional_fecha = new Date(response.estibaadicional_fecha) ;
          response.bejarano_pucallpa_fecha = new Date(response.bejarano_pucallpa_fecha) ;
          response.bejarano_iquitos_fecha = new Date(response.bejarano_iquitos_fecha) ;
          response.oriental_fecha = new Date(response.oriental_fecha) ;
          response.fluvial_fecha = new Date(response.fluvial_fecha) ;
          response.costotercero_fecha = new Date(response.costotercero_fecha);
          response.otrosgastos_fecha = new Date(response.otrosgastos_fecha);

          response.otrosgastos2_fecha = new Date(response.otrosgastos2_fecha);
          response.otrosgastos3_fecha = new Date(response.otrosgastos3_fecha);
          response.otrosgastos4_fecha = new Date(response.otrosgastos4_fecha);




            this._manifiesto.next(response);
        })
    );
}
updateManifiesto(manifiesto: Manifiesto): Observable<Manifiesto>
{
    // Clone the note to prevent accidental reference based updates
    const updatedNote = cloneDeep(manifiesto) as any;

    // Before sending the note to the server, handle the labels
    // if ( updatedNote.labels.length )
    // {
    //     updatedNote.labels = updatedNote.labels.map(label => label.id);
    // }

    manifiesto.facturado = true;



    return this._httpClient.post<Manifiesto>(this.baseUrl + 'UpdateManifiesto', manifiesto , httpOptions ).pipe(
        tap((response) => {

            // Update the notes
            this.getAllManifiestos().subscribe();
        })
    );
}
updateCentroCosto(centroCosto: Manifiesto): Observable<Manifiesto>
    {
        // Clone the note to prevent accidental reference based updates
        const updatedManifiesto = cloneDeep(centroCosto) as any;



        if(updatedManifiesto.estiba_facturado)
        {
            updatedManifiesto.estiba_fecha =  moment(updatedManifiesto.estiba_fecha).format('DD/MM/YYYY');
        }
        else
        {
            updatedManifiesto.estiba_fecha = null;
            updatedManifiesto.estiba_numerodoc  = '';
            updatedManifiesto.estiba  = 0;
        }

        if(updatedManifiesto.estibaadicional_facturado)
        {
            updatedManifiesto.estibaadicional_fecha =  moment(updatedManifiesto.estibaadicional_fecha).format('DD/MM/YYYY');
        }
        else
        {
            updatedManifiesto.estibaadicional_fecha = null;
            updatedManifiesto.estibaadicional_numerodoc  = '';
            updatedManifiesto.estiba_adicional  = 0;
        }


        if(updatedManifiesto.bejarano_pucallpa_facturado)
        {
            updatedManifiesto.bejarano_pucallpa_fecha =  moment(updatedManifiesto.bejarano_pucallpa_fecha).format('DD/MM/YYYY');
        }
        else
        {
            updatedManifiesto.bejarano_pucallpa_fecha = null;
            updatedManifiesto.bejarano_pucallpa_numerodoc  = '';
            updatedManifiesto.bejarano_pucallpa_adicional  = 0;
        }


        if(updatedManifiesto.bejarano_iquitos_facturado)
        {
            updatedManifiesto.bejarano_iquitos_fecha =  moment(updatedManifiesto.bejarano_iquitos_fecha).format('DD/MM/YYYY');
        }
        else
        {
            updatedManifiesto.bejarano_iquitos_fecha = null;
            updatedManifiesto.bejarano_iquitos_numerodoc  = '';
            updatedManifiesto.bejarano_iquitos_adicional  = 0;
        }




        if(updatedManifiesto.oriental_facturado)
        {
            updatedManifiesto.oriental_fecha =  moment(updatedManifiesto.oriental_fecha).format('DD/MM/YYYY');
        }
        else
        {
            updatedManifiesto.oriental_fecha = null;
            updatedManifiesto.oriental_numerodoc  = '';
            updatedManifiesto.oriental_adicional  = 0;
        }



        if(updatedManifiesto.fluvial_facturado)
        {
            updatedManifiesto.fluvial_fecha =  moment(updatedManifiesto.fluvial_fecha).format('DD/MM/YYYY');
        }
        else
        {
            updatedManifiesto.fluvial_fecha = null;
            updatedManifiesto.fluvial_numerodoc  = '';
            updatedManifiesto.fluvial_adicional  = 0;
        }



        if(updatedManifiesto.costotercero_facturado)
        {
            updatedManifiesto.costotercero_fecha =  moment(updatedManifiesto.costotercero_fecha).format('DD/MM/YYYY');
        }
        else
        {
            updatedManifiesto.costotercero_fecha = null;
            updatedManifiesto.costotercero_numerodoc  = '';
            updatedManifiesto.costotercero  = 0;
        }

        if(updatedManifiesto.otrosgastos_facturado)
        {
            updatedManifiesto.otrosgastos_fecha =  moment(updatedManifiesto.otrosgastos_fecha).format('DD/MM/YYYY');
        }
        else
        {
            updatedManifiesto.otrosgastos_fecha = null;
            updatedManifiesto.otrosgastos_numerodoc  = '';
            updatedManifiesto.otrosgastos  = 0;
        }


        return this._httpClient.post<Manifiesto>(this.baseUrl + 'UpdateCentroCosto', updatedManifiesto , httpOptions ).pipe(
            tap((response) => {

                // Update the notes
              //  this.getAllManifiestos().subscribe();
            })
        );
    }
    updateInvoiceManifiesto(manifiesto: any): Observable<Manifiesto>
    {
        // Clone the note to prevent accidental reference based updates
        const updatedManifiesto = cloneDeep(manifiesto) as any;

        return this._httpClient.post<Manifiesto>(this.baseUrl + 'updateInvoiceManifiesto', updatedManifiesto , httpOptions ).pipe(
            tap((response) => {
                // Update the notes
              //  this.getManifiestos('', null,null).subscribe();
            })
        );
    }



}


