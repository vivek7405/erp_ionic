import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-view-deduction-buttons',
  templateUrl: './view-deduction-buttons.component.html',
  styleUrls: ['./view-deduction-buttons.component.scss'],
})
export class ViewDeductionButtonsComponent implements OnInit {

  constructor(public modalController: ModalController, public popoverController: PopoverController) { }

  ngOnInit() { }

  public async viewBASFChallans() {
    await this.popoverController.dismiss(true);   //true = BASF Challan   //false = BASF PO
  }

  public async viewBASFPOs() {
    await this.popoverController.dismiss(false);   //true = BASF Challan   //false = BASF PO
  }

  // async dismissPopover() {
  //   await this.popoverController.dismiss();
  // }
}
