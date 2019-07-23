import { Component, OnInit, Input } from '@angular/core';
import { BASFPOSelection } from 'src/app/models/BASFPOSelection';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { OutStockModel } from 'src/app/models/OutStockModel';
import { OutAccModel } from 'src/app/models/OutAccModel';
import { OutAssemblyModel } from 'src/app/models/OutAssemblyModel';
import { GeneralService } from 'src/app/services/general/general.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-basf-po-deduction',
  templateUrl: './basf-po-deduction.component.html',
  styleUrls: ['./basf-po-deduction.component.scss'],
})
export class BasfPoDeductionComponent implements OnInit {
  @Input() public outStock: OutStockModel;
  @Input() public outAcc: OutAccModel;
  @Input() public outAssembly: OutAssemblyModel;
  @Input() public outStocks: OutStockModel[];

  //public basfChallanSelection: BASFChallanSelection[];
  //public totalDeduction: number = 0;
  //public isManualPO: boolean;  

  public basfPOSelection: BASFPOSelection[];
  public totalDeduction: number = 0;
  public isManualPO: boolean;
  public productId;
  public outputQuantity;

  constructor(public generalService: GeneralService, public modalCtrl: ModalController) { }

  ngOnInit() {
    debugger;
    if (this.outAcc == null && this.outAssembly == null) {    // Out Stock
      this.productId = this.outStock.ProductId;
      this.outputQuantity = this.outStock.OutputQuantity;
      this.initiateOutStockDeductions();
    } else if (this.outAssembly == null) {    // Out Accessory
      this.productId = this.outAcc.ProductId;
      this.outputQuantity = this.outAcc.OutputQuantity;
      this.initiateOutAccDeductions();
    } else if (this.outAcc == null) {    // Out Assembly
      this.productId = this.outAssembly.ProductId;
      this.outputQuantity = this.outAssembly.OutputQuantity;
      this.initiateOutAssemblyDeductions();
    }
  }

  public initiateOutStockDeductions() {
    if (this.outStock.basfPOSelection != null && this.outStock.basfPOSelection.length > 0) {
      let totalOutQty = 0;
      this.outStock.basfPOSelection.forEach(po => {
        if (po.IsChecked)
          totalOutQty = totalOutQty + po.outQuantity;
      });

      if (this.outputQuantity == totalOutQty && this.outStock.basfPOSelection[0].POProduct.ProductId == this.productId)
        this.basfPOSelection = this.outStock.basfPOSelection;
      else {
        this.outStock.isManualPO = false;
        this.getAllBASFPOByProductIdForViewing(this.productId);
      }
    } else {
      this.outStock.isManualPO = false;
      this.getAllBASFPOByProductIdForViewing(this.productId);
    }

    this.totalDeduction = this.outputQuantity;
    this.isManualPO = this.outStock.isManualPO;
  }

  public initiateOutAccDeductions() {
    if (this.outAcc.basfPOSelection != null && this.outAcc.basfPOSelection.length > 0) {
      let totalOutQty = 0;
      this.outAcc.basfPOSelection.forEach(po => {
        if (po.IsChecked)
          totalOutQty = totalOutQty + po.outQuantity;
      });

      if (this.outAcc.OutputQuantity == totalOutQty && this.outAcc.basfPOSelection[0].POProduct.ProductId == this.productId)
        this.basfPOSelection = this.outAcc.basfPOSelection;
      else {
        this.outAcc.isManualPO = false;
        //this.getAllBASFPOByProductIdForViewing(this.outAcc.ProductId);
        this.getBASFPOAndCalculateOutAccSelections(false);
      }
    } else {
      this.outAcc.isManualPO = false;
      //this.getAllBASFPOByProductIdForViewing(this.outAcc.ProductId);
      this.getBASFPOAndCalculateOutAccSelections(false);
    }

    this.totalDeduction = this.outAcc.OutputQuantity;
    this.isManualPO = this.outAcc.isManualPO;
  }

  public initiateOutAssemblyDeductions() {
    if (this.outAssembly.basfPOSelection != null && this.outAssembly.basfPOSelection.length > 0) {
      let totalOutQty = 0;
      this.outAssembly.basfPOSelection.forEach(po => {
        if (po.IsChecked)
          totalOutQty = totalOutQty + po.outQuantity;
      });

      if (this.outAssembly.OutputQuantity == totalOutQty && this.outAssembly.basfPOSelection[0].POProduct.ProductId == this.productId)
        this.basfPOSelection = this.outAssembly.basfPOSelection;
      else {
        this.outAssembly.isManualPO = false;
        //this.getAllBASFPOByProductIdForViewing(this.outAssembly.ProductId);
        this.getBASFPOAndCalculateOutAssemblySelections(false);
      }
    } else {
      this.outAssembly.isManualPO = false;
      //this.getAllBASFPOByProductIdForViewing(this.outAssembly.ProductId);
      this.getBASFPOAndCalculateOutAssemblySelections(false);
    }

    this.totalDeduction = this.outAssembly.OutputQuantity;
    this.isManualPO = this.outAssembly.isManualPO;
  }

  private getBASFPOAndCalculateOutAssemblySelections(isManualTrigger: boolean) {
    let productIdModel = new ProductIdModel;
    productIdModel.ProductId = this.outAssembly.ProductId;
    this.generalService.getAllBASFPOByProductId(productIdModel)
      .subscribe(
        result => {
          this.calculateOutAssemblySelections(result.BASFPOSelections, isManualTrigger);
        },
        error => {
          this.calculateOutAssemblySelections(null, isManualTrigger);
        }
      );
  }

  private getBASFPOAndCalculateOutAccSelections(isManualTrigger: boolean) {
    let productIdModel = new ProductIdModel;
    productIdModel.ProductId = this.outAcc.ProductId;
    this.generalService.getAllBASFPOByProductId(productIdModel)
      .subscribe(
        result => {
          this.calculateOutAccSelections(result.BASFPOSelections, isManualTrigger);
        },
        error => {
          this.calculateOutAccSelections(null, isManualTrigger);
        }
      );
  }

  public getAllBASFPOByProductIdForViewing(productId: number) {
    let productIdModel = new ProductIdModel();
    productIdModel.ProductId = productId;
    this.generalService.getAllBASFPOByProductId(productIdModel)
      .subscribe(
        result => {
          debugger;
          this.basfPOSelection = result.BASFPOSelections;

          let outputQnt = this.outputQuantity;
          this.basfPOSelection.forEach(po => {
            debugger;
            if (outputQnt > 0) {
              if (po.RemainingQuantity < outputQnt) {
                po.outQuantity = po.RemainingQuantity;
                outputQnt -= po.RemainingQuantity;
                po.qntAfterDeduction = 0;
              } else {
                po.outQuantity = outputQnt;
                outputQnt = 0;
                po.qntAfterDeduction = po.RemainingQuantity - po.outQuantity;
              }

              po.IsChecked = true;
            } else {
              po.outQuantity = 0;
              po.qntAfterDeduction = po.RemainingQuantity;
            }
          });
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public manualSelectionChanged() {
    if (!this.isManualPO) {
      this.totalDeduction = this.outputQuantity;
      //this.getAllBASFPOByProductIdForViewing(this.productId);
      if (this.outAssembly != null) {
        this.getBASFPOAndCalculateOutAssemblySelections(true);
      } else if (this.outAcc != null) {
        this.getBASFPOAndCalculateOutAccSelections(true);
      }
    }
  }

  public outQtyChanged(po: BASFPOSelection) {
    po.qntAfterDeduction = po.RemainingQuantity - po.outQuantity;
  }

  public changeTotalDeduction(basfPO: BASFPOSelection) {
    this.totalDeduction = 0;
    let selfObj = this;
    let deductionFlag = true;

    let poRef = null;
    this.basfPOSelection.forEach(po => {
      debugger;
      if (po.IsChecked) {
        if (po.outQuantity == null || po.outQuantity == undefined) {
          po.outQuantity = 0;
        }

        if (po.outQuantity.toString().trim() == "")
          po.outQuantity = 0;
        else if (po.outQuantity.toString().length > 1 && po.outQuantity.toString()[0] == '0') {
          po.outQuantity = parseInt(po.outQuantity.toString().substring(1, po.outQuantity.toString().length));
        }

        if (parseInt(po.outQuantity.toString()) > po.RemainingQuantity) {
          deductionFlag = false;
          setTimeout(x => {
            po.outQuantity = po.RemainingQuantity;
          }, 1);
        }

        selfObj.totalDeduction = selfObj.totalDeduction + parseInt(po.outQuantity.toString());
      }
    });

    if (deductionFlag && this.totalDeduction > this.outputQuantity) {
      setTimeout(x => {
        if (basfPO != null && basfPO.outQuantity != null && basfPO.outQuantity != undefined)
          basfPO.outQuantity = parseInt(basfPO.outQuantity.toString()) - (selfObj.totalDeduction - selfObj.outputQuantity);
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
          outAssembly.basfPOSelection = [];
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
          outAcc.basfPOSelection = [];
        }

        i++;
      });
    }

    basfPO.qntAfterDeduction = basfPO.RemainingQuantity - basfPO.outQuantity;
  }

  public returnValues() {
    if (this.outAcc == null && this.outAssembly == null) {    // Out Stock
      this.outStock.isManualPO = this.isManualPO;
    } else if (this.outAssembly == null) {    // Out Accessory
      this.outAcc.isManualPO = this.isManualPO;
    } else if (this.outAcc == null) {    // Out Assembly
      this.outAssembly.isManualPO = this.isManualPO;
    }

    this.modalCtrl.dismiss(this.basfPOSelection);
  }

  public isDoneButtonDisabled() {
    if (this.isManualPO) {
      let totalOutQty = 0;
      this.basfPOSelection.forEach(po => {
        if (po.IsChecked)
          totalOutQty = totalOutQty + po.outQuantity;
      });

      if (this.outputQuantity == totalOutQty)
        return false;
      else
        return true;
    } else {
      return false;
    }
  }

  public calculateOutAssemblySelections(basfPOSelection: BASFPOSelection[], isManualTrigger: boolean) {
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
        if (outAssembly.basfPOSelection != undefined && outAssembly.basfPOSelection.length > 0) {
          // Do Nothing
        } else {
          if (i == 0) {
            this.getPOSelection(outAssembly, basfPOSelection, false);
            this.selectionAlgo(outAssembly.basfPOSelection, outAssembly.OutputQuantity);
          } else {
            this.getPOSelection(outAssembly, outAssemblys[i - 1].basfPOSelection, true);
            this.selectionAlgo(outAssembly.basfPOSelection, outAssembly.OutputQuantity);
          }
        }

        if (i == curOutAssemblyIndex) {
          if (isManualTrigger) {
            if (i == 0) {
              this.getPOSelection(outAssembly, basfPOSelection, false);
              this.selectionAlgo(outAssembly.basfPOSelection, outAssembly.OutputQuantity);
            } else {
              this.getPOSelection(outAssembly, outAssemblys[i - 1].basfPOSelection, true);
              this.selectionAlgo(outAssembly.basfPOSelection, outAssembly.OutputQuantity);
            }
          }

          this.basfPOSelection = outAssembly.basfPOSelection;
        }
      }

      if (i > curOutAssemblyIndex) {
        outAssembly.basfPOSelection = [];
      }

      i++;
    });
  }

  public calculateOutAccSelections(basfPOSelection: BASFPOSelection[], isManualTrigger: boolean) {
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
        if (outAcc.basfPOSelection != undefined && outAcc.basfPOSelection.length > 0) {
          // Do Nothing
        } else {
          if (i == 0) {
            this.getPOSelection(outAcc, basfPOSelection, false);
            this.selectionAlgo(outAcc.basfPOSelection, outAcc.OutputQuantity);
          } else {
            this.getPOSelection(outAcc, outAccs[i - 1].basfPOSelection, true);
            this.selectionAlgo(outAcc.basfPOSelection, outAcc.OutputQuantity);
          }
        }

        if (i == curOutAccIndex) {
          if (isManualTrigger) {
            if (i == 0) {
              this.getPOSelection(outAcc, basfPOSelection, false);
              this.selectionAlgo(outAcc.basfPOSelection, outAcc.OutputQuantity);
            } else {
              this.getPOSelection(outAcc, outAccs[i - 1].basfPOSelection, true);
              this.selectionAlgo(outAcc.basfPOSelection, outAcc.OutputQuantity);
            }
          }

          this.basfPOSelection = outAcc.basfPOSelection;
        }
      }

      if (i > curOutAccIndex) {
        outAcc.basfPOSelection = [];
      }

      i++;
    });
  }

  public getPOSelection(obj, basfPOSelection: BASFPOSelection[], isPrev: boolean) {
    let POSelection: BASFPOSelection[] = [];

    basfPOSelection.forEach(selection => {
      let basfPOSelectionObj = new BASFPOSelection();
      basfPOSelectionObj.PODetail = selection.PODetail;
      basfPOSelectionObj.POProduct = selection.POProduct;
      basfPOSelectionObj.InputQuantity = selection.InputQuantity;
      basfPOSelectionObj.IsChecked = false;
      basfPOSelectionObj.OutputQuantity = selection.OutputQuantity == undefined || selection.OutputQuantity == null ? 0 : selection.OutputQuantity;
      basfPOSelectionObj.RemainingQuantity = isPrev ? selection.qntAfterDeduction : selection.RemainingQuantity;
      basfPOSelectionObj.outQuantity = 0;
      basfPOSelectionObj.qntAfterDeduction = 0;
      POSelection.push(basfPOSelectionObj);
    });

    obj.basfPOSelection = POSelection;
  }

  public selectionAlgo(basfPOSelection: BASFPOSelection[], outputQnt: number) {
    basfPOSelection.forEach(po => {
      if (outputQnt > 0) {
        if (po.RemainingQuantity < outputQnt) {
          po.outQuantity = po.RemainingQuantity;
          outputQnt -= po.RemainingQuantity;
          po.qntAfterDeduction = 0;
        } else {
          po.outQuantity = outputQnt;
          outputQnt = 0;
          po.qntAfterDeduction = po.RemainingQuantity - po.outQuantity;
        }

        po.IsChecked = true;
      } else {
        po.qntAfterDeduction = po.RemainingQuantity;
      }
    });
  }
}
