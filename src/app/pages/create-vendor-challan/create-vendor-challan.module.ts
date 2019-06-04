import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateVendorChallanPage } from './create-vendor-challan.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVendorChallanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateVendorChallanPage]
})
export class CreateVendorChallanPageModule {}
