import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { FinanzasService } from '../../finanzas/finanzas.service';
import { ComercialService } from '../comercial.service';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonService } from '../../_services/common.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-programarrecojo',
  templateUrl: './programarrecojo.component.html',
  styleUrls: ['./programarrecojo.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule
    
  ],
  providers: [
    DialogService,
    ConfirmationService
  ]
  
})
export class ProgramarrecojoComponent implements OnInit {

  decodedToken: any = {};

  public selectedGrupo: any = {};

  jwtHelper = new JwtHelperService();
  public opened = false;
  public opened2= false;
  isActive = true;

  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;

  

public listClientes: SelectItem[] = [];
public listDestino: SelectItem[] = [];


public listTipoOperacion: SelectItem[] = [];
public listUbigeo: SelectItem[] = [];
public listGrupos: SelectItem[] = [];
public listTipoUnidad: SelectItem[] = [];
public clientes:  SelectItem[] = [];
public selectedCliente: { text: string; value: number };
public listValorTabla: SelectItem[]= [];
public selectedClientes: any[] =[];

public selectedDestino: any[] =[];


  
  constructor(private manifiestoService: FinanzasService,
    private comercialService: ComercialService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public dialogService: DialogService) { }

  ngOnInit() {

    const user  = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(user);
    
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

  this.comercialService.getValoresTabla(33).subscribe((list3) => {
    console.log('tiposervicio:', list3);
    list3.forEach((x) => {
        this.listTipoUnidad.push ({ label: x.valorPrincipal , value: x.id });
    });
  });

  this.comercialService.getValoresTabla(22).subscribe((list3) => {
    console.log('tiposervicio:', list3);
    list3.forEach((x) => {
        this.listTipoOperacion.push ({ label: x.valorPrincipal , value: x.id });
    });
  });


  this.commonService.getAllUbigeo().subscribe((list3) => {
    console.log('tiposervicio:', list3);
    list3.forEach((x) => {
        this.listUbigeo.push ({ label: x.ubigeo , value: x.idDistrito });
    });
  });


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

guardar() {


  this.confirmationService.confirm({
    acceptLabel: 'Guardar',                   // Texto del botón "Aceptar"
    rejectLabel: 'Cancelar',                  // Texto del botón "Rechazar"
    acceptIcon: 'pi pi-check',                // Icono del botón "Aceptar"
    rejectIcon: 'pi pi-times',                // Icono del botón "Rechazar"
    message: '¿Está seguro que desea guardar la nueva programación de recojo?',
    header: 'Confirmar Guardado',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {

    } ,
    reject: () => {
    }
  });

}
regresar() {

}


}
