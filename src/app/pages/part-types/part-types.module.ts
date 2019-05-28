import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PartTypesPage } from './part-types.page';
import { GeneralService } from 'src/app/services/general/general.service';

const routes: Routes = [
  {
    path: '',
    component: PartTypesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PartTypesPage],
  providers: [GeneralService]
})
export class PartTypesPageModule { }
