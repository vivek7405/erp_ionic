import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { PartType } from 'src/app/models/PartType';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-part-types',
  templateUrl: './part-types.page.html',
  styleUrls: ['./part-types.page.scss'],
})
export class PartTypesPage implements OnInit {
  public addPartTypeObj = new PartType();
  public partTypes: PartType[];

  constructor(private generalService: GeneralService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.getAllPartTypes();
  }

  public addPartType() {
    if (this.addPartTypeObj.PartTypeName.trim() !== '') {
      this.generalService.addOrUpdatePartType(this.addPartTypeObj)
        .subscribe(
          result => {
            this.addPartTypeObj.PartTypeName = '';
            this.generalService.toast(this.toastCtrl, 'Part Type added successfully.');
            this.getAllPartTypes();
          },
          error => {
            alert(error);
          }
        );
    } else {
      alert('Please enter Part Type and then click on Add.');
    }
  }

  public getAllPartTypes() {
    this.generalService.getAllPartTypes()
      .subscribe(
        result => {
          this.partTypes = result;
        },
        error => {
          this.partTypes = [];
        }
      );
  }
}
