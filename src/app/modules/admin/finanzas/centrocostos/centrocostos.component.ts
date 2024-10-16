import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { debounceTime, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Manifiesto } from '../../comercial/comercial.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanzasService } from '../finanzas.service';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-centrocostos',
  templateUrl: './centrocostos.component.html',
  styleUrls: ['./centrocostos.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DialogModule,
    InputTextModule,
    CheckboxModule,
    CalendarModule
  ]
})
export class CentrocostosComponent implements OnInit {
  public opened: boolean;
  model: any = [];
  isActive = true;
  manifiesto: Manifiesto = {};
  id: any;

  instance: DynamicDialogComponent | undefined;


  manifiesto$: Observable<Manifiesto>;
  manifiestoChanged: Subject<Manifiesto> = new Subject<Manifiesto>();
  private _unsubscribeAll: Subject<any> = new Subject<any>();




  constructor( private _changeDetectorRef: ChangeDetectorRef,
    private _manifiestosService: FinanzasService,
    public ref: DynamicDialogRef, private dialogService: DialogService) {
      this.instance = this.dialogService.getInstance(this.ref) ;
    }


    
    /**
     * On destroy
     */


  ngOnInit(): void {
    if (this.instance && this.instance.data) {
      this.id = this.instance.data['id'];

        // Request the data from the server
        this._manifiestosService.getCentroCostoById(this.id).subscribe();



        // Get the manifiesto
        this.manifiesto$ = this._manifiestosService.manifiesto$;


      // this._manifiestosService.getCentroCostoById(this.id ).subscribe({
      //   next: response => {
      //     console.log('centrocosto', response);
      //   }
      // })
  }

            // if(this.config.data.manifiesto.length  > 1 )
            // {
            //     console.log(this.config.data.manifiesto, 'somos muchos');
            //     this._changeDetectorRef.markForCheck();
            // }
            // else
            // {
            //     // Request the data from the server
            //     this._manifiestosService.getCentroCostoById(this.config.data.manifiesto.id).subscribe();

            //     // Get the manifiesto
            //     this.manifiesto$ = this._manifiestosService.manifiesto$;


            // // Subscribe to manifiestos updates
            this.manifiestoChanged
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    debounceTime(500),
                    switchMap(manifiesto => this._manifiestosService.updateCentroCosto(manifiesto)))
                .subscribe(() => {

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                });
            



  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    //this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
 }

  close(): void{

    // Close the dialog
    this.ref.close();

}

  guardar(manifiesto: Manifiesto): void {

    console.log('manifiesto:',manifiesto);


    this.manifiestoChanged.next(manifiesto);


    // Close the dialog
     this.ref.close();

  }

}
