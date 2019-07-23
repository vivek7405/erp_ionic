import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { EditdeleteComponent } from './editdelete.component';

const routes: Routes = [
  {
    path: '',
    component: EditdeleteComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditdeleteComponent]
})
export class EditdeleteModule { }
