import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductmappingsComponent } from './productmappings.component';

@NgModule({
  entryComponents: [ProductmappingsComponent],
  declarations: [ProductmappingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ProductmappingsComponent]
})
export class ProductmappingsModule { }
