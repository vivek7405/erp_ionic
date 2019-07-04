import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDeductionButtonsComponent } from './view-deduction-buttons.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  entryComponents: [ViewDeductionButtonsComponent],
  declarations: [ViewDeductionButtonsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    ViewDeductionButtonsComponent
  ]
})
export class ViewDeductionButtonsModule { }