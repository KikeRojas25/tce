import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ActivityPropios, ActivityResumen, ActivityTotal, Pie } from '../reportes.type';
import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment';
import { ReportesService } from '../reportes.service';
import { TableModule } from 'primeng/table';
import { ComercialService } from '../../comercial/comercial.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    ChartModule ,
    ProgressBarModule     ,
    BadgeModule 

  ]
})
export class ActivityComponent implements OnInit {
  model: any = {};
  data: any = [];
  options: any;
  options2: any;
  options3: any;

  total: any= 0;
  pendientes: any = 0;
  entregados: any = 0;


  avance: any = {};


  dateInicio: Date = new Date(Date.now()) ;
  public listValorTabla: Array<{ text: string; value: number }> = [];
  public selectedValorTabla: { text: string; value: number };
  data2: any = [];
  gridDataResult: any[] = [];



  public selectedCliente: any = {};
  public listClientes: SelectItem[] = [];
  clientes: SelectItem[] = [];


  bucle2: ActivityResumen[] = [];
  bucle3: ActivityResumen[] = [];
  bucle4: ActivityResumen[] = [];

  bucle5: ActivityResumen[] = [];
  bucle6: ActivityResumen[] = [];

  
  public value = 10;
  public colors = [
      {
        to: 25,
        color: '#0058e9',
      },
      {
        from: 25,
        to: 50,
        color: '#37b400',
      },
      {
        from: 50,
        to: 75,
        color: '#ffc000',
      },
      {
        from: 75,
        color: '#f31700',
      },
    ];

  data3: any = [];
  data4: any = [];
  propios: ActivityPropios[] = [];
  terceros: ActivityPropios[] = [];

  provincias: ActivityTotal[] = [];
  ultimamilla: ActivityTotal[] = [];
  local: ActivityTotal[] = [];
  aass: ActivityTotal[] = [];
  vet: ActivityTotal[] = [];





  datoschart: Pie[] = [];
  datoschart2: Pie[] = [];

  jwtHelper = new JwtHelperService();

  decodedToken: any = {};

  // eslint-disable-next-line @typescript-eslint/naming-convention
  data_final: any = '0' ;
  public pieData = [
      936, 968, 1025, 999, 998, 1014, 1017, 1010, 1010, 1007
  ];


constructor(private _reportesService: ReportesService,
  private _comercialService: ComercialService
  ) {
    

}

ngOnInit(): void {


  this._comercialService.getValoresTabla(22).subscribe((list3) => {
      list3.forEach((x) => {
          this.listValorTabla.push ({ text: x.valorPrincipal , value: x.id });
      });
  });



  const user  = localStorage.getItem('token');
  this.decodedToken = this.jwtHelper.decodeToken(user);


  this._comercialService.getClientes('', this.decodedToken.nameid).subscribe((list) => {
      list.forEach((x) => {
          this.listClientes.push ({ label: x.razon_social , value: x.id });
      });
  
  });

  this.model.fecha =    moment().format('DD/MM/YYYY');




    this.buscar();


}

buscar(): void {


  //jQuery('html,body').animate({ scrollTop: 4500 }, 'slow');

  this.datoschart = [];
  this.datoschart2 = [];


  this.ReporteEntregados();
  this.ReportePendientes();

  console.log( this.model);


  




}

ReporteEntregados() {

  

  this._reportesService.GetCantidadDespacho(this.dateInicio, this.selectedValorTabla?.value.toString(), this.model.idcliente ).subscribe((resp) => {


    this.data = {
       labels: [
         'Aprobado',   // entregados_cantidad
         'Parcial',   // pendientes_cantidad
         'Rechazado'  // noentregado_cantidad
       ],
       datasets: [
         {
           data: [
             resp.ok_cantidad.toString(), // entregados_cantidad
             resp.entregaparcial_cantidad.toString() , // pendientes_cantidad
             resp.noentregado_cantidad.toString() // noentregado_cantidad
           ],
           backgroundColor: [
             "#42A5F5", // Color para Entregados
             "#FFCE56", // Color para Pendientes
             "#FF6384", // Color para No Entregado
           ],
         }
       ]
     };
     this.options = {
       responsive: true,
       plugins: {
         legend: {
           position: 'top',
         },
         tooltip: {
           callbacks: {
             label: function(tooltipItem: any) {
               let dataset = tooltipItem.dataset.data;
               let total = dataset.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
               let currentValue = dataset[tooltipItem.dataIndex];
               let percentage = ((currentValue / total) * 100).toFixed(2); // Calcula el porcentaje con dos decimales
               return `${tooltipItem.label}: ${currentValue} (${percentage}%)`; // Muestra valor y porcentaje
             }
           }
         }
       }
     };


   this.datoschart2.push({ category: 'Aprobado' , value: resp.ok_cantidad.toString() });
   this.datoschart2.push({ category: 'Parcial' , value: resp.entregaparcial_cantidad.toString() });
   this.datoschart2.push({ category: 'Rechazado' , value: resp.noentregado_cantidad.toString() });

});

}
ReportePendientes() {

  this._reportesService.getPendientesPorDia(this.dateInicio, this.selectedValorTabla?.value.toString(), this.model.idcliente).subscribe((products) => {



    this.gridDataResult = products;



    products.forEach( (x) => {


      
    console.log('resultado',this.total);

     this.total = this.total + x.total;
     this.pendientes = this.pendientes + x.pendientes;
     this.entregados = this.entregados + x.entregados;

    });

    this.avance.pendiente = (this.pendientes  / this.total) * 100;
    
    this.avance.entregados = (this.entregados  / this.total) * 100;
    this.avance.entregados = parseFloat(this.avance.entregados.toFixed(2));  // Limitar a 2 decimales




        //  const oldArray = this.datoschart;
        // // this.datoschart = _.cloneDeep(this.datoschart);

      
        //  console.log(this.gridDataResult );

        //  this.datoschart.push({ category: 'Pendientes' , value: this.pendientes.toString() });
        //  this.datoschart.push({ category: 'Entregados' , value: this.entregados.toString() });

    }, (error)=> {

    }, ()=> {


 
 












      this.data2  = {
        labels: [
          'Entregado',   // entregados_cantidad
          'Pendiente',   // pendientes_cantidad
        ],
        datasets: [
          {
            data: [
              this.pendientes.toString(), // entregados_cantidad
              this.entregados.toString() , // pendientes_cantidad
            ],
            backgroundColor: [
              "#42A5F5", // Color para Entregados
              "#FFCE56", // Color para Pendientes
            ],
          }
        ]
      };
      this.options2 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem: any) {
                let dataset = tooltipItem.dataset.data;
                let total = dataset.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
                let currentValue = dataset[tooltipItem.dataIndex];
                let percentage = ((currentValue / total) * 100).toFixed(2); // Calcula el porcentaje con dos decimales
                return `${tooltipItem.label}: ${currentValue} (${percentage}%)`; // Muestra valor y porcentaje
              }
            }
          }
        }
      };
 

    });

  }
}

