import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Printer } from '@ionic-native/printer/ngx';

import { BasfInvoiceInfoPage } from './basf-invoice-info.page';

const routes: Routes = [
  {
    path: '',
    component: BasfInvoiceInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BasfInvoiceInfoPage],
  providers: [Printer]
})
export class BasfInvoiceInfoPageModule { }
