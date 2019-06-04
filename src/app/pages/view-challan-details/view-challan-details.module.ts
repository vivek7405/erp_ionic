import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewChallanDetailsPage } from './view-challan-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewChallanDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewChallanDetailsPage]
})
export class ViewChallanDetailsPageModule {}
