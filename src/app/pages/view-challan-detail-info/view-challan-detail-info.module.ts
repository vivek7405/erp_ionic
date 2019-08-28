import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewChallanDetailInfoPage } from './view-challan-detail-info.page';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  {
    path: '',
    component: ViewChallanDetailInfoPage
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
  declarations: [ViewChallanDetailInfoPage]
})
export class ViewChallanDetailInfoPageModule { }
