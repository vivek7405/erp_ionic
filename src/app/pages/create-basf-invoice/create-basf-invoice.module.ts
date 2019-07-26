import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateBasfInvoicePage } from './create-basf-invoice.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { BasfInvoiceChallanDeductionModule } from '../basf-invoice-challan-deduction/basf-invoice-challan-deduction.module';
import { ViewDeductionButtonsModule } from '../view-deduction-buttons/view-deduction-buttons.module';

const routes: Routes = [
  {
    path: '',
    component: CreateBasfInvoicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    BasfInvoiceChallanDeductionModule,
    ViewDeductionButtonsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateBasfInvoicePage]
})
export class CreateBasfInvoicePageModule { }
