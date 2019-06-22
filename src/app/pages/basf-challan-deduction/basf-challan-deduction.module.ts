import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasfChallanDeductionComponent } from './basf-challan-deduction.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  entryComponents: [BasfChallanDeductionComponent],
  declarations: [BasfChallanDeductionComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    BasfChallanDeductionComponent
  ]
})
export class BasfChallanDeductionModule { }
