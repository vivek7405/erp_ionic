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
    await this.popoverController.dismiss('Challan');
  }

  public async viewBASFPOs() {
    await this.popoverController.dismiss('PO');
  }

  // async dismissPopover() {
  //   await this.popoverController.dismiss();
  // }
}
