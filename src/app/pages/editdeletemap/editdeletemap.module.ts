import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { EditdeletemapComponent } from './editdeletemap.component';

const routes: Routes = [
  {
    path: '',
    component: EditdeletemapComponent
  }
];

@NgModule({
  declarations: [EditdeletemapComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class EditdeletemapModule { }
