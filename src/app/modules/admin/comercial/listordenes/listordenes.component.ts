import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FinanzasService } from '../../finanzas/finanzas.service';
import { ComercialService } from '../comercial.service';
import { Manifiesto } from '../comercial.types';
import moment from 'moment';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listordenes',
  templateUrl: './listordenes.component.html',
  styleUrls: ['./listordenes.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    FormsModule,
    MatIcon,
    MultiSelectModule,
    DynamicDialogModule ,
    DropdownModule ,
    CalendarModule,
    ButtonModule,
    TableModule,
    TagModule ,
    InputTextModule


   ],
   providers: [DialogService]
})
export class ListordenesComponent implements OnInit {




  ref: DynamicDialogRef | undefined;

public listClientes: SelectItem[] = [];
public listGrupos: SelectItem[] = [];
public clientes:  SelectItem[] = [];
public selectedCliente: { text: string; value: number };
public listValorTabla: SelectItem[]= [];
public selectedClientes: any[] =[];

public selectedGrupo: any = {};

jwtHelper = new JwtHelperService();
public opened = false;
public opened2= false;
isActive = true;
showAlert: boolean = false;


checkfacServicio = false;
checkfacAdicional = false;
checkfacSobreestadia = false;
checkfacRetorno = false;

public currentItem;
model: any = {};

decodedToken: any = {};

public mySelection: number[] = [];



ordenes:  any =[];
 public defaultItem: { text: string; value: number } = {
    text: 'Seleccione uno...',
    value: null,
  };


   dateInicio: Date = new Date(Date.now()) ;
   dateFin: Date = new Date(Date.now()) ;
   
   


   facServicio: Date = new Date(Date.now()) ;
   facAdicional: Date = new Date(Date.now()) ;
   facSobreestadia: Date = new Date(Date.now()) ;
   facRetorno: Date = new Date(Date.now()) ;
   public selectedValorTabla: { text: string; value: number };



  constructor(private manifiestoService: FinanzasService,
    private comercialService: ComercialService,
    private router: Router,
    public dialogService: DialogService
  ) {


    }



  ngOnInit(): void {

    this.model.numero_factura = '';
    const user  = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(user);

    this.comercialService.getValoresTabla(22).subscribe((list3) => {
      console.log('tiposervicio:', list3);
      list3.forEach((x) => {
          this.listValorTabla.push ({ label: x.valorPrincipal , value: x.id });
      });
    });


    this.comercialService.getClientes('', this.decodedToken.nameid ).subscribe((list) => {
        list.forEach((x) => {
            this.listClientes.push ({ label: x.razon_social , value: x.id });
        });
    });


    this.comercialService.getGrupos('', this.decodedToken.nameid ).subscribe((list) => {
      list.forEach((x) => {
          this.listGrupos.push ({ label: x.nombre , value: x.id });
      });
  });

  this.loadItems();


  }
  cargarClientes(){

    this.listClientes = [];

    console.log(this.selectedGrupo);

  
    this.comercialService.getClientesxGrupo(this.selectedGrupo.value).subscribe({
      next: response => {
      
        response.forEach((x) => {
            this.listClientes.push ({ label: x.razon_social , value: x.id });
        });
      }
    });
  }

  openManifiestoDialog(manifiesto: Manifiesto): void
  {
    //DetailsManifiestoComponent
      // this._matDialog.open(DetailsManifiestoComponent, {

      //     data     : {
      //         manifiesto: cloneDeep(manifiesto)
      //     }
      // });
  }
  mavivo(): void {
    // this.currentItem = null;
    // this.opened2 = true;
    // this.currentItem = this.mySelection;

    this.router.navigate(['seguimiento/new']);



}
  openCentroCostoDialog(manifiesto: Manifiesto): void
  {
    // //DetailsManifiestoComponent
    //   this.dialogService.open(CentroCostoComponent, {
    //        header: 'Centro de Costo',
    //        modal: true,

    //       data     : {
    //           manifiesto: cloneDeep(manifiesto)
    //       }
    //   });
  }
  // public togglePopup(anchor: ElementRef, template: TemplateRef<any>) {
  //   if (this.popupRef) {
  //     this.popupRef.close();
  //     this.popupRef = null;
  //   } else {
  //     this.popupRef = this.popupService.open({
  //       anchor: anchor,
  //       content: template,
  //     });
  //   }
  // }
  editar(item) {

    this.manifiestoService.getManifiestoById(item.id).subscribe((value)  => {

            this.opened2 = true;
            this.currentItem = value;

            this.checkfacServicio = value.facturado;
            this.facServicio = value.fecha_facturado===null?new Date(Date.now()):   new Date(value.fecha_facturado);
            this.model.numServicio = value.fecha_facturado===null? '' : value.numServicio   ;


            this.checkfacAdicional = value.adicional_facturado;
            this.facAdicional =  value.fecha_adicional_facturado===null?new Date(Date.now()):new Date(value.fecha_adicional_facturado);
            this.model.numAdicional = value.fecha_adicional_facturado===null? '' : value.numAdicional   ;


            this.checkfacSobreestadia = value.sobreestadia_facturado;
            this.facSobreestadia = value.fecha_sobreestadia_facturado===null?new Date(Date.now()):new Date(value.fecha_sobreestadia_facturado);
            this.model.numSobreestadia = value.fecha_sobreestadia_facturado===null? '' : value.numSobreestadia ;


            this.checkfacRetorno = value.retorno_facturado;
            this.facRetorno =  value.fecha_retorno_facturado===null?new Date(Date.now()):new Date(value.fecha_retorno_facturado);
            this.model.numRetorno = value.fecha_retorno_facturado===null? '' : value.numRetorno ;


            // this.checkfacRetorno = value.retorno_facturado;
            // this.facRetorno =  value.fecha_retorno_facturado===null?new Date(Date.now()):new Date(value.fecha_retorno_facturado);
            // this.model.numRetorno = value.fecha_retorno_facturado===null? '' : value.numRetorno ;




  });
}
  public close2(action): void {
    this.opened2 = false;
    this.currentItem = undefined;
  }
  guardar(): void {

    if(this.currentItem.length > 1) {

    }
    else     {
        this.model.id = this.currentItem.id;
    }






    if(this.checkfacServicio){
        this.model.fecha_facturado =  moment(this.facServicio).format('DD/MM/YYYY');
        this.model.facturado = true;
    }
    else {
        this.model.fecha_facturado = null;
        this.model.numServicio  = '';
        this.model.facturado = false;
    }

    if(this.checkfacAdicional){
        this.model.fecha_adicional_facturado =  moment(this.facAdicional).format('DD/MM/YYYY');
        this.model.adicional_facturado = true;
    }
    else {
        this.model.fecha_adicional_facturado = null;
        this.model.adicional_facturado = false;
        this.model.numAdicional = '';
    }


    if(this.checkfacSobreestadia){
        this.model.fecha_sobreestadia_facturado =  moment(this.facSobreestadia).format('DD/MM/YYYY');
        this.model.sobreestadia_facturado = true;
    }
    else {
        this.model.fecha_sobreestadia_facturado = null;
        this.model.sobreestadia_facturado = false;
        this.model.numSobreestadia = '';
    }

    if(this.checkfacRetorno){
        this.model.fecha_retorno_facturado = moment(this.facRetorno).format('DD/MM/YYYY');
        this.model.retorno_facturado = true;

    }
    else {
        this.model.fecha_retorno_facturado = null;
        this.model.retorno_facturado = false;
        this.model.numRetorno = '';
    }


    if(this.currentItem.length > 1) {

        this.currentItem.forEach((element) => {
            this.model.id = element;

            this.manifiestoService.updateInvoiceManifiesto(this.model).subscribe((resp) => {
            });


        });
   
    }
    else     {

        this.manifiestoService.updateInvoiceManifiesto(this.model).subscribe((resp) => {

         


            });
    }




        this.close2('');

  }



 buscar(): void {

   

    this.loadItems();

      
}
editarCC(id): void {


}


    

private loadItems(): void {
    let ids = '';
    var tiposervicio = this.selectedValorTabla?.value;

    this.selectedClientes.forEach( (x)=> {
         ids = ids  + ',' + x.value;
    });

    this.comercialService.gerAllOrders(  ids,
                                         this.dateInicio , 
                                         this.dateFin,
                                         this.decodedToken.nameid , 
                                         '',
                                         '',
                                         '',
                                         '',
                                        ).subscribe((products) => {
          this.ordenes =  products;
          console.log('ordenes:',this.ordenes)

       
      });
    }

}
