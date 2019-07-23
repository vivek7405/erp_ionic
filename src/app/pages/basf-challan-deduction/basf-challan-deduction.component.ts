import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { OutStockModel } from 'src/app/models/OutStockModel';
import { BASFChallanSelection } from 'src/app/models/BASFChallanSelection';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { ModalController } from '@ionic/angular';
import { OutAccModel } from 'src/app/models/OutAccModel';
import { OutAssemblyModel } from 'src/app/models/OutAssemblyModel';
import { ChallanDeductionModel } from 'src/app/models/ChallanDeductionModel';
import { AssemblyChallanDeductionModel } from 'src/app/models/AssemblyChallanDeductionModel';

@Component({
  selector: 'app-basf-challan-deduction',
  templateUrl: './basf-challan-deduction.component.html',
  styleUrls: ['./basf-challan-deduction.component.scss'],
})
export class BasfChallanDeductionComponent implements OnInit {
  @Input() public outStock: OutStockModel;
  @Input() public outAcc: OutAccModel;
  @Input() public outAssembly: OutAssemblyModel;
  @Input() public outStocks: OutStockModel[];

  public basfChallanSelection: BASFChallanSelection[];
  public totalDeduction: number = 0;
  public isManual: boolean;
  public productId;
  public outputQuantity;

  constructor(public generalService: GeneralService, public modalCtrl: ModalController) { }

  ngOnInit() {
    debugger;
    if (this.outAcc == null && this.outAssembly == null) {    // Out Stock
      this.productId = this.outStock.ProductId;
      this.outputQuantity = Math.ceil(this.outStock.OutputQuantity / this.outStock.SplitRatio);
      this.initiateOutStockDeductions();
    } else if (this.outAssembly == null) {    // Out Accessory
      this.productId = this.outAcc.ProductId;
      this.outputQuantity = Math.ceil(this.outAcc.OutputQuantity / this.outAcc.SplitRatio);
      this.initiateOutAccDeductions();
    } else if (this.outAcc == null) {    // Out Assembly
      this.productId = this.outAssembly.ProductId;
      this.outputQuantity = Math.ceil(this.outAssembly.OutputQuantity / this.outAssembly.SplitRatio);
      this.initiateOutAssemblyDeductions();
    }
  }

  public initiateOutStockDeductions() {
    if (this.outStock.basfChallanSelection != null && this.outStock.basfChallanSelection.length > 0) {
      let totalOutQty = 0;
      this.outStock.basfChallanSelection.forEach(challan => {
        if (challan.IsChecked)
          totalOutQty = totalOutQty + challan.outQuantity;
      });

      if (this.outputQuantity == totalOutQty && this.outStock.basfChallanSelection[0].ChallanProduct.ProductId == this.productId)
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

      if (this.outAcc.OutputQuantity == totalOutQty && this.outAcc.basfChallanSelection[0].ChallanProduct.ProductId == this.productId)
        this.basfChallanSelection = this.outAcc.basfChallanSelection;
      else {
        this.outAcc.isManual = false;
        //this.getAllBASFChallanByProductIdForViewing(this.outAcc.ProductId);
        this.getBASFChallanAndCalculateOutAccSelections(false);
      }
    } else {
      this.outAcc.isManual = false;
      //this.getAllBASFChallanByProductIdForViewing(this.outAcc.ProductId);
      this.getBASFChallanAndCalculateOutAccSelections(false);
    }

    this.totalDeduction = this.outAcc.OutputQuantity;
    this.isManual = this.outAcc.isManual;
  }

  public initiateOutAssemblyDeductions() {
    if (this.outAssembly.basfChallanSelection != null && this.outAssembly.basfChallanSelection.length > 0) {
      let totalOutQty = 0;
      this.outAssembly.basfChallanSelection.forEach(challan => {
        if (challan.IsChecked)
          totalOutQty = totalOutQty + challan.outQuantity;
      });

      if (this.outAssembly.OutputQuantity == totalOutQty && this.outAssembly.basfChallanSelection[0].ChallanProduct.ProductId == this.productId)
        this.basfChallanSelection = this.outAssembly.basfChallanSelection;
      else {
        this.outAssembly.isManual = false;
        //this.getAllBASFChallanByProductIdForViewing(this.outAssembly.ProductId);
        this.getBASFChallanAndCalculateOutAssemblySelections(false);
      }
    } else {
      this.outAssembly.isManual = false;
      //this.getAllBASFChallanByProductIdForViewing(this.outAssembly.ProductId);
      this.getBASFChallanAndCalculateOutAssemblySelections(false);
    }

    this.totalDeduction = this.outAssembly.OutputQuantity;
    this.isManual = this.outAssembly.isManual;
  }

  private getBASFChallanAndCalculateOutAssemblySelections(isManualTrigger: boolean) {
    let productIdModel = new ProductIdModel;
    productIdModel.ProductId = this.outAssembly.ProductId;
    this.generalService.getAllBASFChallanByProductId(productIdModel)
      .subscribe(
        result => {
          this.calculateOutAssemblySelections(result.BASFChallanSelections, isManualTrigger);
        },
        error => {
          this.calculateOutAssemblySelections(null, isManualTrigger);
        }
      );
  }

  private getBASFChallanAndCalculateOutAccSelections(isManualTrigger: boolean) {
    let productIdModel = new ProductIdModel;
    productIdModel.ProductId = this.outAcc.ProductId;
    this.generalService.getAllBASFChallanByProductId(productIdModel)
      .subscribe(
        result => {
          this.calculateOutAccSelections(result.BASFChallanSelections, isManualTrigger);
        },
        error => {
          this.calculateOutAccSelections(null, isManualTrigger);
        }
      );
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
      //this.getAllBASFChallanByProductIdForViewing(this.productId);
      if (this.outAssembly != null) {
        this.getBASFChallanAndCalculateOutAssemblySelections(true);
      } else if (this.outAcc != null) {
        this.getBASFChallanAndCalculateOutAccSelections(true);
      }
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

    if (this.outAssembly != null) {
      let outAssemblys: OutAssemblyModel[] = [];

      this.outStocks.forEach(x => {
        let xOutAssembly = x.OutAssemblys.find(p => p.ProductId == this.outAssembly.ProductId);
        if (xOutAssembly != undefined && xOutAssembly != null)
          outAssemblys.push(xOutAssembly);
      });

      let curOutAssemblyIndex = outAssemblys.findIndex(k => k == this.outAssembly);

      let i = 0;
      outAssemblys.forEach(outAssembly => {
        if (i > curOutAssemblyIndex) {
          outAssembly.basfChallanSelection = [];
        }

        i++;
      });
    } else if (this.outAcc != null) {
      let outAccs: OutAccModel[] = [];

      this.outStocks.forEach(x => {
        let xOutAcc = x.OutAccs.find(p => p.ProductId == this.outAssembly.ProductId);
        if (xOutAcc != undefined && xOutAcc != null)
          outAccs.push(xOutAcc);
      });

      let curOutAccIndex = outAccs.findIndex(k => k == this.outAcc);

      let i = 0;
      outAccs.forEach(outAcc => {
        if (i > curOutAccIndex) {
          outAcc.basfChallanSelection = [];
        }

        i++;
      });
    }

    basfChallan.qntAfterDeduction = basfChallan.RemainingQuantity - basfChallan.outQuantity;
  }

  public returnValues() {
    if (this.outAcc == null && this.outAssembly == null) {    // Out Stock
      this.outStock.isManual = this.isManual;
    } else if (this.outAssembly == null) {    // Out Accessory
      this.outAcc.isManual = this.isManual;
    } else if (this.outAcc == null) {    // Out Assembly
      this.outAssembly.isManual = this.isManual;
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

  public calculateOutAssemblySelections(basfChallanSelection: BASFChallanSelection[], isManualTrigger: boolean) {
    debugger;
    let outAssemblys: OutAssemblyModel[] = [];

    this.outStocks.forEach(x => {
      let xOutAssembly = x.OutAssemblys.find(p => p.ProductId == this.outAssembly.ProductId);
      if (xOutAssembly != undefined && xOutAssembly != null)
        outAssemblys.push(xOutAssembly);
    });

    let curOutAssemblyIndex = outAssemblys.findIndex(k => k == this.outAssembly);

    let i = 0;
    outAssemblys.forEach(outAssembly => {
      if (i <= curOutAssemblyIndex) {
        if (outAssembly.basfChallanSelection != undefined && outAssembly.basfChallanSelection.length > 0) {
          // Do Nothing
        } else {
          if (i == 0) {
            this.getChallanSelection(outAssembly, basfChallanSelection, false);
            this.selectionAlgo(outAssembly.basfChallanSelection, outAssembly.OutputQuantity);
          } else {
            this.getChallanSelection(outAssembly, outAssemblys[i - 1].basfChallanSelection, true);
            this.selectionAlgo(outAssembly.basfChallanSelection, outAssembly.OutputQuantity);
          }
        }

        if (i == curOutAssemblyIndex) {
          if (isManualTrigger) {
            if (i == 0) {
              this.getChallanSelection(outAssembly, basfChallanSelection, false);
              this.selectionAlgo(outAssembly.basfChallanSelection, outAssembly.OutputQuantity);
            } else {
              this.getChallanSelection(outAssembly, outAssemblys[i - 1].basfChallanSelection, true);
              this.selectionAlgo(outAssembly.basfChallanSelection, outAssembly.OutputQuantity);
            }
          }

          this.basfChallanSelection = outAssembly.basfChallanSelection;
        }
      }

      if (i > curOutAssemblyIndex) {
        outAssembly.basfChallanSelection = [];
      }

      i++;
    });
  }

  public calculateOutAccSelections(basfChallanSelection: BASFChallanSelection[], isManualTrigger: boolean) {
    debugger;
    let outAccs: OutAccModel[] = [];

    this.outStocks.forEach(x => {
      let xOutAcc = x.OutAccs.find(p => p.ProductId == this.outAcc.ProductId);
      if (xOutAcc != undefined && xOutAcc != null)
        outAccs.push(xOutAcc);
    });

    let curOutAccIndex = outAccs.findIndex(k => k == this.outAcc);

    let i = 0;
    outAccs.forEach(outAcc => {
      if (i <= curOutAccIndex) {
        if (outAcc.basfChallanSelection != undefined && outAcc.basfChallanSelection.length > 0) {
          // Do Nothing
        } else {
          if (i == 0) {
            this.getChallanSelection(outAcc, basfChallanSelection, false);
            this.selectionAlgo(outAcc.basfChallanSelection, outAcc.OutputQuantity);
          } else {
            this.getChallanSelection(outAcc, outAccs[i - 1].basfChallanSelection, true);
            this.selectionAlgo(outAcc.basfChallanSelection, outAcc.OutputQuantity);
          }
        }

        if (i == curOutAccIndex) {
          if (isManualTrigger) {
            if (i == 0) {
              this.getChallanSelection(outAcc, basfChallanSelection, false);
              this.selectionAlgo(outAcc.basfChallanSelection, outAcc.OutputQuantity);
            } else {
              this.getChallanSelection(outAcc, outAccs[i - 1].basfChallanSelection, true);
              this.selectionAlgo(outAcc.basfChallanSelection, outAcc.OutputQuantity);
            }
          }

          this.basfChallanSelection = outAcc.basfChallanSelection;
        }
      }

      if (i > curOutAccIndex) {
        outAcc.basfChallanSelection = [];
      }

      i++;
    });
  }

  public getChallanSelection(obj, basfChallanSelection: BASFChallanSelection[], isPrev: boolean) {
    let challanSelection: BASFChallanSelection[] = [];

    basfChallanSelection.forEach(selection => {
      let basfChallanSelectionObj = new BASFChallanSelection();
      basfChallanSelectionObj.ChallanDetail = selection.ChallanDetail;
      basfChallanSelectionObj.ChallanProduct = selection.ChallanProduct;
      basfChallanSelectionObj.InputQuantity = selection.InputQuantity;
      basfChallanSelectionObj.IsChecked = false;
      basfChallanSelectionObj.OutputQuantity = selection.OutputQuantity == undefined || selection.OutputQuantity == null ? 0 : selection.OutputQuantity;
      basfChallanSelectionObj.RemainingQuantity = isPrev ? selection.qntAfterDeduction : selection.RemainingQuantity;
      basfChallanSelectionObj.outQuantity = 0;
      basfChallanSelectionObj.qntAfterDeduction = 0;
      challanSelection.push(basfChallanSelectionObj);
    });

    obj.basfChallanSelection = challanSelection;
  }

  public selectionAlgo(basfChallanSelection: BASFChallanSelection[], outputQnt: number) {
    basfChallanSelection.forEach(challan => {
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
        challan.qntAfterDeduction = challan.RemainingQuantity;
      }
    });
  }
}
