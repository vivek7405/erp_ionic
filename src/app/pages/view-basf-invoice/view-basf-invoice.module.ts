import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewBasfInvoicePage } from './view-basf-invoice.page';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  {
    path: '',
    component: ViewBasfInvoicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([])
  ],
  declarations: [ViewBasfInvoicePage]
})
export class ViewBasfInvoicePageModule {}
