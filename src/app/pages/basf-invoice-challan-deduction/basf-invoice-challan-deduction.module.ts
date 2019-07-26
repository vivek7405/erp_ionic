import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasfInvoiceChallanDeductionComponent } from './basf-invoice-challan-deduction.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  entryComponents: [BasfInvoiceChallanDeductionComponent],
  declarations: [BasfInvoiceChallanDeductionComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    BasfInvoiceChallanDeductionComponent
  ]
})
export class BasfInvoiceChallanDeductionModule { }
