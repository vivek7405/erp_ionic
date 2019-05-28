import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { PartType } from 'src/app/models/PartType';
import { InputCode } from 'src/app/models/InputCode';
import { OutputCode } from 'src/app/models/OutputCode';
import { StockInFlowService } from 'src/app/services/stock-in-flow/stock-in-flow.service';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.page.html',
  styleUrls: ['./purchase-order.page.scss'],
})
export class PurchaseOrderPage implements OnInit {
  public partTypes: PartType[];
  public inputCodes: InputCode[] = [];
  public outputCode: OutputCode = new OutputCode();

  constructor(public generalService: GeneralService, public stockInFlowService: StockInFlowService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.getAllPartTypes();
    this.inputCodes.push(new InputCode());
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

  public addInputCode() {
    this.inputCodes.push(new InputCode());
  }

  public removeInputCode(index: number) {
    this.inputCodes.splice(index, 1);
  }

  public submitPurchaseOrder() {
    let purchaseOrder = new PurchaseOrder();
    purchaseOrder.InputCodes = this.inputCodes;
    purchaseOrder.OutputCode = this.outputCode;

    this.stockInFlowService.addOrUpdatePurchaseOrder(purchaseOrder)
      .subscribe(
        result => {
          this.stockInFlowService.toast(this.toastCtrl, 'Purchase Order added successfully.');
          this.outputCode = new OutputCode();
          this.inputCodes = [];
          this.inputCodes.push(new InputCode());
        },
        error => {
          alert(error);
        }
      );
  }
}
