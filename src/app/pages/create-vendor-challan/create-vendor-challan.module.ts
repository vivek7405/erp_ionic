import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateVendorChallanPage } from './create-vendor-challan.page';
import { BasfChallanDeductionModule } from '../basf-challan-deduction/basf-challan-deduction.module';
import { ViewDeductionButtonsModule } from '../view-deduction-buttons/view-deduction-buttons.module';
import { BasfPoDeductionModule } from '../basf-po-deduction/basf-po-deduction.module';

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
    BasfChallanDeductionModule,
    BasfPoDeductionModule,
    ViewDeductionButtonsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateVendorChallanPage]
})
export class CreateVendorChallanPageModule { }
