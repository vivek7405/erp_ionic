import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendorChallanInfoPage } from './vendor-challan-info.page';

const routes: Routes = [
  {
    path: '',
    component: VendorChallanInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorChallanInfoPage]
})
export class VendorChallanInfoPageModule {}
