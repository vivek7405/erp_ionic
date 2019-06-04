import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChallanDetailsPage } from './challan-details.page';

const routes: Routes = [
  {
    path: '',
    component: ChallanDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChallanDetailsPage]
})
export class ChallanDetailsPageModule {}
