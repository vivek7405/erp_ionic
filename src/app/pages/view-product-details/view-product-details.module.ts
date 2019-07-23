import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewProductDetailsPage } from './view-product-details.page';
import { AgGridModule } from 'ag-grid-angular';
import { ProductmappingsComponent } from '../productmappings/productmappings.component';
import { ProductmappingsModule } from '../productmappings/productmappings.module';

const routes: Routes = [
  {
    path: '',
    component: ViewProductDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductmappingsModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([])
  ],
  declarations: [ViewProductDetailsPage]
})
export class ViewProductDetailsPageModule { }
