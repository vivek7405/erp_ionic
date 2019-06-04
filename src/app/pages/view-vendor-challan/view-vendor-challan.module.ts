import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewVendorChallanPage } from './view-vendor-challan.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVendorChallanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewVendorChallanPage]
})
export class ViewVendorChallanPageModule {}
