import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ToastController, ModalController, IonDatetime, PopoverController } from '@ionic/angular';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { OutStockModel } from 'src/app/models/OutStockModel';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { BasfChallanDeductionComponent } from '../basf-challan-deduction/basf-challan-deduction.component';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { BASFChallanSelection } from 'src/app/models/BASFChallanSelection';
import { ChallanDeductionModel } from 'src/app/models/ChallanDeductionModel';
import { ViewDeductionButtonsComponent } from '../view-deduction-buttons/view-deduction-buttons.component';
import { OutAccModel } from 'src/app/models/OutAccModel';
import { AccChallanDeductionModel } from 'src/app/models/AccChallanDeductionModel';
import { OutAssemblyModel } from 'src/app/models/OutAssemblyModel';
import { AssemblyChallanDeductionModel } from 'src/app/models/AssemblyChallanDeductionModel';
import { OutAssembly } from 'src/app/models/OutAssembly';
import { OutStock } from 'src/app/models/OutStock';
import { PODeductionModel } from 'src/app/models/PODeductionModel';
import { AccPODeductionModel } from 'src/app/models/AccPODeductionModel';
import { AssemblyPODeductionModel } from 'src/app/models/AssemblyPODeductionModel';
import { BasfPoDeductionComponent } from '../basf-po-deduction/basf-po-deduction.component';

@Component({
  selector: 'app-create-vendor-challan',
  templateUrl: './create-vendor-challan.page.html',
  styleUrls: ['./create-vendor-challan.page.scss'],
})
export class CreateVendorChallanPage implements OnInit {
  public vendorChallan: VendorChallanModel;
  public productDetails: ProductDetail[];
  public productQnts: ProductQuantity[];
  public productAccQnts: ProductQuantity[];
  public productAssemblyQnts: ProductQuantity[];
  public BASFChallanDetails: ViewChallanDetailModel[];
  public basfChallanSelection: BASFChallanSelection[];
  private outStockCount = 0;
  public IsNg: boolean = false;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, private modalController: ModalController, public popoverController: PopoverController) { }

  ngOnInit() {
    this.vendorChallan = new VendorChallanModel();
    this.vendorChallan.OutStocks = [];
    this.vendorChallan.OutStocks.push(new OutStockModel());
    this.getMainProductRemainingQuantity();
    this.getAccProductRemainingQuantity();
    this.getAssemblyProductRemainingQuantity();
  }

  public getMainProductRemainingQuantity() {
    this.generalService.getMainProductRemainingQuantity()
      .subscribe(
        result => {
          debugger;
          this.productQnts = result;
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public getAccProductRemainingQuantity() {
    this.generalService.getAccProductRemainingQuantity()
      .subscribe(
        result => {
          this.productAccQnts = result;
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public getAssemblyProductRemainingQuantity() {
    this.generalService.getAssemblyProductRemainingQuantity()
      .subscribe(
        result => {
          debugger;
          this.productAssemblyQnts = result;
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public addOutStock() {
    this.vendorChallan.OutStocks.push(new OutStockModel());
  }

  public addOutAcc(outStock: OutStockModel) {
    if (this.productAccQnts != undefined && this.productAccQnts != null && this.productAccQnts.length > 0) {
      outStock.OutAccs.push(new OutAccModel());
    } else {
      alert('No accessories available in stock!');
    }
  }

  public async viewBASFChallans(outStock: OutStockModel, outAcc: OutAccModel, outAssembly: OutAssemblyModel) {
    debugger;
    const modal = await this.modalController.create({
      component: BasfChallanDeductionComponent,
      componentProps: { outStock: outStock, outAcc: outAcc, outAssembly: outAssembly },
      backdropDismiss: false
    });

    modal.onDidDismiss()
      .then((data) => {
        debugger;
        if (outAcc == null && outAssembly == null) {     // Out Stock
          outStock.basfChallanSelection = data['data'];
          outStock.ChallanDeductions = [];

          outStock.basfChallanSelection.forEach(challan => {
            if (challan.IsChecked && challan.outQuantity > 0) {
              let challanDeduction: ChallanDeductionModel = new ChallanDeductionModel();

              challanDeduction.ChallanProductId = challan.ChallanProduct.ChallanProductId;
              challanDeduction.OutQuantity = challan.outQuantity;

              outStock.ChallanDeductions.push(challanDeduction);
            }
          });
        } else if (outAssembly == null) {    // Out Accessory
          outAcc.basfChallanSelection = data['data'];
          outAcc.AccChallanDeductions = [];

          outAcc.basfChallanSelection.forEach(challan => {
            if (challan.IsChecked && challan.outQuantity > 0) {
              let accChallanDeduction: AccChallanDeductionModel = new AccChallanDeductionModel();

              accChallanDeduction.ChallanProductId = challan.ChallanProduct.ChallanProductId;
              accChallanDeduction.OutQuantity = challan.outQuantity;

              outAcc.AccChallanDeductions.push(accChallanDeduction);
            }
          });
        } else if (outAcc == null) {    // Out Assembly
          outAssembly.basfChallanSelection = data['data'];
          outAssembly.AssemblyChallanDeductions = [];

          outAssembly.basfChallanSelection.forEach(challan => {
            if (challan.IsChecked && challan.outQuantity > 0) {
              let assemblyChallanDeduction: AssemblyChallanDeductionModel = new AssemblyChallanDeductionModel();

              assemblyChallanDeduction.ChallanProductId = challan.ChallanProduct.ChallanProductId;
              assemblyChallanDeduction.OutQuantity = challan.outQuantity;

              outAssembly.AssemblyChallanDeductions.push(assemblyChallanDeduction);
            }
          });
        }
      });

    await modal.present();
  }

  public async viewBASFPOs(outStock: OutStockModel, outAcc: OutAccModel, outAssembly: OutAssemblyModel) {
    debugger;
    const modal = await this.modalController.create({
      component: BasfPoDeductionComponent,
      componentProps: { outStock: outStock, outAcc: outAcc, outAssembly: outAssembly },
      backdropDismiss: false
    });

    modal.onDidDismiss()
      .then((data) => {
        debugger;
        if (outAcc == null && outAssembly == null) {     // Out Stock
          outStock.basfPOSelection = data['data'];
          outStock.PODeductions = [];

          outStock.basfPOSelection.forEach(po => {
            if (po.IsChecked && po.outQuantity > 0) {
              let poDeduction: PODeductionModel = new PODeductionModel();

              poDeduction.POProductId = po.POProduct.POProductId;
              poDeduction.OutQuantity = po.outQuantity;

              outStock.PODeductions.push(poDeduction);
            }
          });
        } else if (outAssembly == null) {    // Out Accessory
          outAcc.basfPOSelection = data['data'];
          outAcc.AccPODeductions = [];

          outAcc.basfPOSelection.forEach(po => {
            if (po.IsChecked && po.outQuantity > 0) {
              let accPODeduction: AccPODeductionModel = new AccPODeductionModel();

              accPODeduction.POProductId = po.POProduct.POProductId;
              accPODeduction.OutQuantity = po.outQuantity;

              outAcc.AccPODeductions.push(accPODeduction);
            }
          });
        } else if (outAcc == null) {    // Out Assembly
          outAssembly.basfPOSelection = data['data'];
          outAssembly.AssemblyPODeductions = [];

          outAssembly.basfPOSelection.forEach(po => {
            if (po.IsChecked && po.outQuantity > 0) {
              let assemblyPODeduction: AssemblyPODeductionModel = new AssemblyPODeductionModel();

              assemblyPODeduction.POProductId = po.POProduct.POProductId;
              assemblyPODeduction.OutQuantity = po.outQuantity;

              outAssembly.AssemblyPODeductions.push(assemblyPODeduction);
            }
          });
        }
      });

    await modal.present();
  }

  public mainOutQntChanged(outStock: OutStockModel) {
    debugger;
    outStock.basfChallanSelection = [];
    outStock.ChallanDeductions = [];

    if (outStock.ProductId != undefined && outStock.ProductId != null && outStock.ProductId != 0) {
      if (outStock.OutputQuantity > 0) {
        let productQnt = this.productQnts.find(x => x.ProductId == outStock.ProductId);

        if (productQnt != undefined && productQnt != null && productQnt.RemainingQuantity != undefined && productQnt.RemainingQuantity != null && productQnt.RemainingQuantity > 0) {
          let leastAssemblyRemainingQnt = 0;

          if (!this.IsNg && outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
            outStock.OutAssemblys.forEach(assemblyProduct => {
              debugger;
              let assemblyProdQnt = this.productAssemblyQnts.find(x => x.ProductId == assemblyProduct.ProductId);

              if (assemblyProdQnt != undefined && assemblyProdQnt != null && assemblyProdQnt.RemainingQuantity != undefined && assemblyProdQnt.RemainingQuantity != null && assemblyProdQnt.RemainingQuantity > 0 && assemblyProdQnt.RemainingQuantityPO != null && assemblyProdQnt.RemainingQuantityPO > 0) {
                if (leastAssemblyRemainingQnt == 0) {
                  if (assemblyProdQnt.RemainingQuantity < assemblyProdQnt.RemainingQuantityPO)
                    leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantity;
                  else
                    leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantityPO;
                } else if (assemblyProdQnt.RemainingQuantity < leastAssemblyRemainingQnt || assemblyProdQnt.RemainingQuantityPO < leastAssemblyRemainingQnt) {
                  if (assemblyProdQnt.RemainingQuantity < assemblyProdQnt.RemainingQuantityPO)
                    leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantity;
                  else
                    leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantityPO;
                }
              }
            });
          }


          let leastAssignableQnt = 0;

          if (leastAssemblyRemainingQnt == 0) {
            if (productQnt.RemainingQuantity < productQnt.RemainingQuantityPO)
              leastAssignableQnt = productQnt.RemainingQuantity;
            else
              leastAssignableQnt = productQnt.RemainingQuantityPO;
          } else {
            if (leastAssemblyRemainingQnt < productQnt.RemainingQuantity && leastAssemblyRemainingQnt < productQnt.RemainingQuantityPO) {
              leastAssignableQnt = leastAssemblyRemainingQnt;
            } else {
              if (productQnt.RemainingQuantity < productQnt.RemainingQuantityPO)
                leastAssignableQnt = productQnt.RemainingQuantity;
              else
                leastAssignableQnt = productQnt.RemainingQuantityPO;
            }
          }

          if (outStock.OutputQuantity > leastAssignableQnt) {
            setTimeout(x => {
              outStock.OutputQuantity = leastAssignableQnt;

              if (outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
                outStock.OutAssemblys.forEach(assemblyProduct => {
                  assemblyProduct.OutputQuantity = outStock.OutputQuantity;
                });
              }
            }, 1);
          } else {
            setTimeout(x => {
              if (outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
                outStock.OutAssemblys.forEach(assemblyProduct => {
                  assemblyProduct.OutputQuantity = outStock.OutputQuantity;
                });
              }
            }, 1);
          }
        }
      } else if (outStock.OutputQuantity < 0) {
        setTimeout(x => {
          outStock.OutputQuantity = 0;

          if (outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
            outStock.OutAssemblys.forEach(assemblyProduct => {
              assemblyProduct.OutputQuantity = outStock.OutputQuantity;
            });
          }
        }, 1);
      }
    }
  }

  public assemblyOutQntChanged(outAssembly: OutAssemblyModel, outStock: OutStockModel) {
    outAssembly.basfChallanSelection = [];
    outAssembly.AssemblyChallanDeductions = [];

    if (outAssembly.OutputQuantity > 0) {
      let assemblyProdQnt = this.productAssemblyQnts.find(x => x.ProductId == outAssembly.ProductId);

      if (assemblyProdQnt != undefined && assemblyProdQnt != null && assemblyProdQnt.RemainingQuantity != undefined && assemblyProdQnt.RemainingQuantity != null && assemblyProdQnt.RemainingQuantity > 0) {
        if (outAssembly.OutputQuantity > assemblyProdQnt.RemainingQuantity) {
          setTimeout(x => {
            outAssembly.OutputQuantity = assemblyProdQnt.RemainingQuantity;

            outStock.OutputQuantity = outAssembly.OutputQuantity;

            if (outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
              outStock.OutAssemblys.forEach(assemblyProduct => {
                assemblyProduct.OutputQuantity = outAssembly.OutputQuantity;
              });
            }
          }, 1);
        } else {
          setTimeout(x => {
            outStock.OutputQuantity = outAssembly.OutputQuantity;

            if (outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
              outStock.OutAssemblys.forEach(assemblyProduct => {
                assemblyProduct.OutputQuantity = outAssembly.OutputQuantity;
              });
            }
          }, 1);
        }
      }
    } else if (outAssembly.OutputQuantity < 0) {
      setTimeout(x => {
        outAssembly.OutputQuantity = 0;
        outStock.OutputQuantity = outAssembly.OutputQuantity;

        if (outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
          outStock.OutAssemblys.forEach(assemblyProduct => {
            assemblyProduct.OutputQuantity = outAssembly.OutputQuantity;
          });
        }
      }, 1);
    }
  }

  public accOutQntChanged(outAcc: OutAccModel) {
    outAcc.basfChallanSelection = [];
    outAcc.AccChallanDeductions = [];

    if (outAcc.OutputQuantity > 0) {
      let accProdQnt = this.productAccQnts.find(x => x.ProductId == outAcc.ProductId);

      if (accProdQnt != undefined && accProdQnt != null && accProdQnt.RemainingQuantity != undefined && accProdQnt.RemainingQuantity != null && accProdQnt.RemainingQuantity > 0 && accProdQnt.RemainingQuantityPO != null && accProdQnt.RemainingQuantityPO > 0) {
        if (outAcc.OutputQuantity > accProdQnt.RemainingQuantity || outAcc.OutputQuantity > accProdQnt.RemainingQuantityPO) {
          setTimeout(x => {
            if (accProdQnt.RemainingQuantity < accProdQnt.RemainingQuantityPO)
              outAcc.OutputQuantity = accProdQnt.RemainingQuantity;
            else
              outAcc.OutputQuantity = accProdQnt.RemainingQuantityPO;
          }, 1);
        }
      }
    } else if (outAcc.OutputQuantity < 0) {
      setTimeout(x => {
        outAcc.OutputQuantity = 0;
      }, 1);
    }
  }

  public submit() {
    // this.outStockCount = 0;
    // this.vendorChallan.OutStocks.forEach(outStock => {
    //   this.challanDeductionAndSave(outStock);
    // });

    if (this.vendorChallan.VendorChallanDate == undefined || this.vendorChallan.VendorChallanDate == null) {
      alert('Please enter Challan Date.');
    } else if (this.isOutQntZero()) {
      alert('Please enter a valid Output Quantity.');
    } else if (this.checkForDuplicates()) {
      alert('There are duplicate products/accessories selected!');
    } else if (!this.IsNg && this.doesQntExceed()) {
      alert('The total assembly/accessory output quantity exceeds the quantity in stock!');
    } else {
      if (confirm('Are you sure you want to Submit?')) {
        this.vendorChallan.IsNg = this.IsNg;
        this.generalService.addOrUpdateVendorChallan(this.vendorChallan)
          .subscribe(
            result => {
              this.generalService.toast(this.toastCtrl, 'Vibrant Challan saved successfully.');
              this.generalService.getMainProductRemainingQuantity()
                .subscribe(
                  result => {
                    debugger;
                    this.productQnts = result;
                    this.vendorChallan = new VendorChallanModel();
                    this.vendorChallan.OutStocks = [];
                    this.vendorChallan.OutStocks.push(new OutStockModel());
                  },
                  error => {
                    alert('Something went wrong!');
                  }
                );
            },
            error => {
              alert('Something went wrong!');
            }
          );
      }
    }
  }

  private isOutQntZero() {
    let isZero = false;

    this.vendorChallan.OutStocks.forEach(outStock => {
      if (!(outStock.OutputQuantity != undefined && outStock.OutputQuantity != null && outStock.OutputQuantity > 0)) {
        isZero = true;
      }

      if (!this.IsNg && outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
        outStock.OutAssemblys.forEach(outAssembly => {
          if (!(outAssembly.OutputQuantity != undefined && outAssembly.OutputQuantity != null && outAssembly.OutputQuantity > 0)) {
            isZero = true;
          }
        });
      }

      if (!this.IsNg && outStock.OutAccs != undefined && outStock.OutAccs != null && outStock.OutAccs.length > 0) {
        outStock.OutAccs.forEach(outAcc => {
          if (!(outAcc.OutputQuantity != undefined && outAcc.OutputQuantity != null && outAcc.OutputQuantity > 0)) {
            isZero = true;
          }
        });
      }
    });

    return isZero;
  }

  private checkForDuplicates() {
    let duplicate = false;
    let productIds = [];
    this.vendorChallan.OutStocks.forEach(outStock => {
      if (outStock.ProductId != undefined && outStock.ProductId != null && outStock.ProductId > 0) {
        if (productIds.length > 0) {
          if (productIds.indexOf(outStock.ProductId) >= 0) {
            duplicate = true;
          }
        }
        productIds.push(outStock.ProductId);
      }
    });

    if (!this.IsNg) {
      this.vendorChallan.OutStocks.forEach(outStock => {
        productIds = [];
        if (outStock.OutAccs != undefined && outStock.OutAccs != null && outStock.OutAccs.length > 0) {
          outStock.OutAccs.forEach(outAcc => {
            if (outAcc.ProductId != undefined && outAcc.ProductId != null && outAcc.ProductId > 0) {
              if (productIds.length > 0) {
                if (productIds.indexOf(outAcc.ProductId) >= 0) {
                  duplicate = true;
                }
              }
              productIds.push(outAcc.ProductId);
            }
          });
        }
      });
    }

    return duplicate;
  }

  private doesQntExceed() {
    let exceeds = false;

    if (this.productAssemblyQnts != undefined && this.productAssemblyQnts != null && this.productAssemblyQnts.length > 0) {
      this.productAssemblyQnts.forEach(assemblyQnt => {
        assemblyQnt.totalOutQnt = 0;

        this.vendorChallan.OutStocks.forEach(outStock => {
          if (outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0)
            outStock.OutAssemblys.forEach(outAssembly => {
              if (outAssembly.ProductId != undefined && outAssembly.ProductId != null && outAssembly.ProductId > 0 && outAssembly.OutputQuantity != undefined && outAssembly.OutputQuantity != null && outAssembly.OutputQuantity > 0) {
                if (outAssembly.ProductId == assemblyQnt.ProductId) {
                  assemblyQnt.totalOutQnt += outAssembly.OutputQuantity;
                }
              }
            });
        });
      });

      this.productAssemblyQnts.forEach(assemblyQnt => {
        if (assemblyQnt.totalOutQnt > assemblyQnt.RemainingQuantity || assemblyQnt.totalOutQnt > assemblyQnt.RemainingQuantityPO) {
          exceeds = true;
        }
      });
    }

    if (this.productAccQnts != undefined && this.productAccQnts != null && this.productAccQnts.length > 0) {
      this.productAccQnts.forEach(accQnt => {
        accQnt.totalOutQnt = 0;

        this.vendorChallan.OutStocks.forEach(outStock => {
          if (outStock.OutAccs != undefined && outStock.OutAccs != null && outStock.OutAccs.length > 0)
            outStock.OutAccs.forEach(outAcc => {
              if (outAcc.ProductId != undefined && outAcc.ProductId != null && outAcc.ProductId > 0 && outAcc.OutputQuantity != undefined && outAcc.OutputQuantity != null && outAcc.OutputQuantity > 0) {
                if (outAcc.ProductId == accQnt.ProductId) {
                  accQnt.totalOutQnt += outAcc.OutputQuantity;
                }
              }
            });
        });
      });

      this.productAssemblyQnts.forEach(assemblyQnt => {
        if (assemblyQnt.totalOutQnt > assemblyQnt.RemainingQuantity || assemblyQnt.totalOutQnt > assemblyQnt.RemainingQuantityPO) {
          exceeds = true;
        }
      });

      this.productAccQnts.forEach(accQnt => {
        if (accQnt.totalOutQnt > accQnt.RemainingQuantity || accQnt.totalOutQnt > accQnt.RemainingQuantityPO) {
          exceeds = true;
        }
      });
    }

    return exceeds;
  }

  async presentPopover(ev: any, outStock: OutStockModel, outAcc: OutAccModel, outAssembly: OutAssemblyModel) {
    debugger;
    const popover = await this.popoverController.create({
      component: ViewDeductionButtonsComponent,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss()
      .then(data => {
        debugger;
        let isBASFChallan: boolean = data['data'];
        if (isBASFChallan)
          this.viewBASFChallans(outStock, outAcc, outAssembly);
        else
          this.viewBASFPOs(outStock, outAcc, outAssembly);
      });

    return await popover.present();
  }

  public removeRow(i) {
    debugger;
    if ((this.vendorChallan.OutStocks[i].ProductId == undefined || this.vendorChallan.OutStocks[i].ProductId == 0) && (this.vendorChallan.OutStocks[i].OutputQuantity == undefined || this.vendorChallan.OutStocks[i].OutputQuantity == 0)) {
      this.vendorChallan.OutStocks.splice(i, 1);
    } else
      if (confirm('Are you sure you want to remove this product?'))
        this.vendorChallan.OutStocks.splice(i, 1);
  }

  public removeAccRow(j, outStock: OutStockModel) {
    debugger;
    if ((outStock.OutAccs[j].ProductId == undefined || outStock.OutAccs[j].ProductId == 0) && (outStock.OutAccs[j].OutputQuantity == undefined || outStock.OutAccs[j].OutputQuantity == 0)) {
      outStock.OutAccs.splice(j, 1);
    } else
      if (confirm('Are you sure you want to remove this product?'))
        outStock.OutAccs.splice(j, 1);
  }

  public outStockProductSelected(outStock: OutStockModel) {
    debugger;
    outStock.OutAssemblys = [];
    let productQnt: ProductQuantity = this.productQnts.find(x => x.ProductId == outStock.ProductId);
    outStock.SplitRatio = productQnt.SplitRatio;

    productQnt.AssemblyProductQnts.forEach(assemblyProduct => {
      let outAssemblyModel = new OutAssemblyModel();
      outAssemblyModel.ProductId = assemblyProduct.ProductId;
      outAssemblyModel.SplitRatio = assemblyProduct.SplitRatio;
      outStock.OutAssemblys.push(outAssemblyModel);
    });

    this.mainOutQntChanged(outStock);
  }

  public outAccProductSelected(outAcc: OutAccModel) {
    let productAccQnt: ProductQuantity = this.productAccQnts.find(x => x.ProductId == outAcc.ProductId);
    outAcc.SplitRatio = productAccQnt.SplitRatio;
  }

  public changeToNg() {
    this.vendorChallan.OutStocks.forEach(outStock => {
      this.mainOutQntChanged(outStock);
    });
  }

  // public changeToNg() {
  //   let alertMsg = 'Are you sure you want to change to NG? All the data entered will be lost!';
  //   if (this.IsNg)
  //     alertMsg = 'Are you sure you want to change to FG? All the data entered will be lost!';
  //   if (confirm(alertMsg)) {
  //     this.vendorChallan = new VendorChallanModel();
  //     this.vendorChallan.OutStocks = [];
  //     this.vendorChallan.OutStocks.push(new OutStockModel());
  //     this.getMainProductRemainingQuantity();
  //   } else {
  //     setTimeout(x => {
  //       let selfObj = this;
  //       selfObj.IsNg = !selfObj.IsNg;
  //     }, 1);
  //   }
  // }


  // public challanDeductionAndSave(outStock: OutStockModel) {
  //   let productIdModel = new ProductIdModel();
  //   productIdModel.ProductId = outStock.ProductId;
  //   this.generalService.getAllBASFChallanByProductId(productIdModel)
  //     .subscribe(
  //       result => {
  //         debugger;
  //         this.outStockCount++;
  //         this.basfChallanSelection = result.BASFChallanSelections;

  //         let outputQnt = outStock.OutputQuantity;
  //         outStock.ChallanDeductions = [];
  //         this.basfChallanSelection.forEach(challan => {
  //           debugger;
  //           let challanDeduction = new ChallanDeductionModel();

  //           if (outputQnt > 0) {
  //             if (challan.RemainingQuantity < outputQnt) {
  //               challan.outQuantity = challan.RemainingQuantity;
  //               outputQnt -= challan.RemainingQuantity;
  //               challan.qntAfterDeduction = 0;
  //             } else {
  //               challan.outQuantity = outputQnt;
  //               outputQnt = 0;
  //               challan.qntAfterDeduction = challan.RemainingQuantity - challan.outQuantity;
  //             }

  //             challan.IsChecked = true;

  //             challanDeduction.ChallanProductId = challan.ChallanProduct.ChallanProductId;
  //             challanDeduction.OutQuantity = challan.outQuantity;

  //             outStock.ChallanDeductions.push(challanDeduction);
  //           } else {
  //             challan.qntAfterDeduction = challan.RemainingQuantity;
  //           }
  //         });

  //         if (this.outStockCount == this.vendorChallan.OutStocks.length) {
  //           debugger;
  //           this.generalService.addOrUpdateVendorChallan(this.vendorChallan)
  //             .subscribe(
  //               result => {
  //                 debugger;
  //                 this.generalService.toast(this.toastCtrl, 'Vendor Challan saved successfully.');
  //                 this.vendorChallan = new VendorChallanModel();
  //                 this.vendorChallan.OutStocks = [];
  //                 this.vendorChallan.OutStocks.push(new OutStockModel());
  //                 this.getProductRemainingQuantity();
  //               },
  //               error => {
  //                 alert('Something went wrong!');
  //               }
  //             );
  //         }
  //       },
  //       error => {
  //         alert('Something went wrong!');
  //       }
  //     );
  // }
}
