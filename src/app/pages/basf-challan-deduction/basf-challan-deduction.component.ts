import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { OutStockModel } from 'src/app/models/OutStockModel';
import { BASFChallanSelection } from 'src/app/models/BASFChallanSelection';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { ModalController } from '@ionic/angular';
import { OutAccModel } from 'src/app/models/OutAccModel';

@Component({
  selector: 'app-basf-challan-deduction',
  templateUrl: './basf-challan-deduction.component.html',
  styleUrls: ['./basf-challan-deduction.component.scss'],
})
export class BasfChallanDeductionComponent implements OnInit {
  @Input() public outStock: OutStockModel;
  @Input() public outAcc: OutAccModel;
  public basfChallanSelection: BASFChallanSelection[];
  public totalDeduction: number = 0;
  public isManual: boolean;
  public productId;
  public outputQuantity;

  constructor(public generalService: GeneralService, public modalCtrl: ModalController) { }

  ngOnInit() {
    debugger;
    if (this.outAcc == null) {    // Out Stock
      this.productId = this.outStock.ProductId;
      this.outputQuantity = this.outStock.OutputQuantity;
      this.initiateOutStockDeductions();
    } else {    // Out Accessory
      this.productId = this.outAcc.ProductId;
      this.outputQuantity = this.outAcc.OutputQuantity;
      this.initiateOutAccDeductions();
    }
  }

  public initiateOutStockDeductions() {
    if (this.outStock.basfChallanSelection != null && this.outStock.basfChallanSelection.length > 0) {
      let totalOutQty = 0;
      this.outStock.basfChallanSelection.forEach(challan => {
        if (challan.IsChecked)
          totalOutQty = totalOutQty + challan.outQuantity;
      });

      if (this.outputQuantity == totalOutQty)
        this.basfChallanSelection = this.outStock.basfChallanSelection;
      else {
        this.outStock.isManual = false;
        this.getAllBASFChallanByProductIdForViewing(this.productId);
      }
    } else {
      this.outStock.isManual = false;
      this.getAllBASFChallanByProductIdForViewing(this.productId);
    }

    this.totalDeduction = this.outputQuantity;
    this.isManual = this.outStock.isManual;
  }

  public initiateOutAccDeductions() {
    if (this.outAcc.basfChallanSelection != null && this.outAcc.basfChallanSelection.length > 0) {
      let totalOutQty = 0;
      this.outAcc.basfChallanSelection.forEach(challan => {
        if (challan.IsChecked)
          totalOutQty = totalOutQty + challan.outQuantity;
      });

      if (this.outAcc.OutputQuantity == totalOutQty)
        this.basfChallanSelection = this.outAcc.basfChallanSelection;
      else {
        this.outAcc.isManual = false;
        this.getAllBASFChallanByProductIdForViewing(this.outAcc.ProductId);
      }
    } else {
      this.outAcc.isManual = false;
      this.getAllBASFChallanByProductIdForViewing(this.outAcc.ProductId);
    }

    this.totalDeduction = this.outAcc.OutputQuantity;
    this.isManual = this.outAcc.isManual;
  }

  public getAllBASFChallanByProductIdForViewing(productId: number) {
    let productIdModel = new ProductIdModel();
    productIdModel.ProductId = productId;
    this.generalService.getAllBASFChallanByProductId(productIdModel)
      .subscribe(
        result => {
          debugger;
          this.basfChallanSelection = result.BASFChallanSelections;

          let outputQnt = this.outputQuantity;
          this.basfChallanSelection.forEach(challan => {
            debugger;
            if (outputQnt > 0) {
              if (challan.RemainingQuantity < outputQnt) {
                challan.outQuantity = challan.RemainingQuantity;
                outputQnt -= challan.RemainingQuantity;
                challan.qntAfterDeduction = 0;
              } else {
                challan.outQuantity = outputQnt;
                outputQnt = 0;
                challan.qntAfterDeduction = challan.RemainingQuantity - challan.outQuantity;
              }

              challan.IsChecked = true;
            } else {
              challan.outQuantity = 0;
              challan.qntAfterDeduction = challan.RemainingQuantity;
            }
          });
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public manualSelectionChanged() {
    if (!this.isManual) {
      this.totalDeduction = this.outputQuantity;
      this.getAllBASFChallanByProductIdForViewing(this.productId);
    }
  }

  public outQtyChanged(challan: BASFChallanSelection) {
    challan.qntAfterDeduction = challan.RemainingQuantity - challan.outQuantity;
  }

  public changeTotalDeduction(basfChallan: BASFChallanSelection) {
    this.totalDeduction = 0;
    let selfObj = this;
    let deductionFlag = true;

    let challanRef = null;
    this.basfChallanSelection.forEach(challan => {
      debugger;
      if (challan.IsChecked) {
        if (challan.outQuantity == null || challan.outQuantity == undefined) {
          challan.outQuantity = 0;
        }

        if (challan.outQuantity.toString().trim() == "")
          challan.outQuantity = 0;
        else if (challan.outQuantity.toString().length > 1 && challan.outQuantity.toString()[0] == '0') {
          challan.outQuantity = parseInt(challan.outQuantity.toString().substring(1, challan.outQuantity.toString().length));
        }

        if (parseInt(challan.outQuantity.toString()) > challan.RemainingQuantity) {
          deductionFlag = false;
          setTimeout(x => {
            challan.outQuantity = challan.RemainingQuantity;
          }, 1);
        }

        selfObj.totalDeduction = selfObj.totalDeduction + parseInt(challan.outQuantity.toString());
      }
    });

    if (deductionFlag && this.totalDeduction > this.outputQuantity) {
      setTimeout(x => {
        if (basfChallan != null && basfChallan.outQuantity != null && basfChallan.outQuantity != undefined)
          basfChallan.outQuantity = parseInt(basfChallan.outQuantity.toString()) - (selfObj.totalDeduction - selfObj.outputQuantity);
      }, 1);
    }
  }

  public returnValues() {
    if (this.outAcc == null) {    // Out Stock
      this.outStock.isManual = this.isManual;
    } else {    // Out Accessory
      this.outAcc.isManual = this.isManual;
    }

    this.modalCtrl.dismiss(this.basfChallanSelection);
  }

  public isDoneButtonDisabled() {
    if (this.isManual) {
      let totalOutQty = 0;
      this.basfChallanSelection.forEach(challan => {
        if (challan.IsChecked)
          totalOutQty = totalOutQty + challan.outQuantity;
      });

      if (this.outputQuantity == totalOutQty)
        return false;
      else
        return true;
    } else {
      return false;
    }
  }
}
