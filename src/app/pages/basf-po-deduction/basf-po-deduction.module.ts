import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BasfPoDeductionComponent } from './basf-po-deduction.component';

@NgModule({
  entryComponents: [BasfPoDeductionComponent],
  declarations: [BasfPoDeductionComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    BasfPoDeductionComponent
  ]
})
export class BasfPoDeductionModule { }
