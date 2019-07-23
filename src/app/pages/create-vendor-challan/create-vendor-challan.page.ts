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
  public selectProductPlaceholder = "Select Product";
  public selectAccessoryPlaceholder = "Select Accessory";

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
          this.productQnts.forEach(prodQnt => {
            this.setProdQntDisplayTextWithPOQnt(prodQnt);
          });
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
    if (this.vendorChallan.OutStocks.length == this.productQnts.length || this.productQnts.length == 0)
      alert('No more products available in stock!');
    else
      this.vendorChallan.OutStocks.push(new OutStockModel());
  }

  public addOutAcc(outStock: OutStockModel) {
    if (this.productAccQnts != undefined && this.productAccQnts != null && this.productAccQnts.length > 0) {
      if (outStock.OutAccs.length == this.productAccQnts.length || this.productAccQnts.length == 0)
        alert('No more accessories available in stock!');
      else {
        debugger;
        let outAcc = new OutAccModel();
        outAcc.productAccQnts = [];

        this.productAccQnts.forEach(accQnt => {
          debugger;
          let accProdQnt = new ProductQuantity();
          accProdQnt.ProductId = accQnt.ProductId;
          accProdQnt.ProductName = accQnt.ProductName;
          accProdQnt.RemainingQuantity = accQnt.RemainingQuantity;
          accProdQnt.RemainingQuantityPO = accQnt.RemainingQuantityPO;
          accProdQnt.SplitRatio = accQnt.SplitRatio;
          accProdQnt.totalOutQnt = accQnt.totalOutQnt;

          if (this.vendorChallan.OutStocks.length > 1) {
            let initialRemainingQnt = accQnt.RemainingQuantity;
            //let initialRemainingQntPO = accQnt.RemainingQuantityPO;

            let totalProductAccOutQnt = 0;
            this.vendorChallan.OutStocks.forEach(x => {
              debugger;
              if (x != outStock) {
                let xOutAcc = x.OutAccs.find(p => p.ProductId == accQnt.ProductId);
                if (xOutAcc != undefined && xOutAcc != null) {
                  if (xOutAcc.OutputQuantity != undefined && xOutAcc.OutputQuantity != null)
                    totalProductAccOutQnt += xOutAcc.OutputQuantity;
                }
              }
            });

            //let productAccQnt = outAcc.productAccQnts.find(q => q.ProductId == outAcc.ProductId);
            accProdQnt.RemainingQuantity = initialRemainingQnt - totalProductAccOutQnt;
            //accProdQnt.RemainingQuantityPO = initialRemainingQntPO - totalProductAccOutQnt;
          }

          this.setProdQntDisplayTextWithoutPOQnt(accProdQnt);
          outAcc.productAccQnts.push(accProdQnt);
        });

        outStock.OutAccs.push(outAcc);
      }
    } else {
      alert('No accessories available in stock!');
    }
  }

  public async viewBASFChallans(outStock: OutStockModel, outAcc: OutAccModel, outAssembly: OutAssemblyModel) {
    debugger;
    const modal = await this.modalController.create({
      component: BasfChallanDeductionComponent,
      componentProps: { outStock: outStock, outAcc: outAcc, outAssembly: outAssembly, outStocks: this.vendorChallan.OutStocks },
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
      componentProps: { outStock: outStock, outAcc: outAcc, outAssembly: outAssembly, outStocks: this.vendorChallan.OutStocks },
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

    outStock.basfPOSelection = [];
    outStock.PODeductions = [];

    if (outStock.ProductId != undefined && outStock.ProductId != null && outStock.ProductId != 0) {
      if (outStock.OutputQuantity > 0) {
        let productQnt = this.productQnts.find(x => x.ProductId == outStock.ProductId);

        if (productQnt != undefined && productQnt != null && productQnt.RemainingQuantity != undefined && productQnt.RemainingQuantity != null && productQnt.RemainingQuantity > 0) {
          let leastAssemblyRemainingQnt = -1;

          if (!this.IsNg && outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
            outStock.OutAssemblys.forEach(assemblyProduct => {
              let assemblyProdQnt = assemblyProduct.productAssemblyQnts.find(x => x.ProductId == assemblyProduct.ProductId);

              if (assemblyProdQnt != undefined && assemblyProdQnt != null && assemblyProdQnt.RemainingQuantity != undefined && assemblyProdQnt.RemainingQuantity != null) {
                if (leastAssemblyRemainingQnt == -1) {
                  // if (assemblyProdQnt.RemainingQuantity < assemblyProdQnt.RemainingQuantityPO)
                  //   leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantity;
                  // else
                  //   leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantityPO;

                  leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantity;
                } else if (assemblyProdQnt.RemainingQuantity < leastAssemblyRemainingQnt) {
                  // if (assemblyProdQnt.RemainingQuantity < assemblyProdQnt.RemainingQuantityPO)
                  //   leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantity;
                  // else
                  //   leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantityPO;

                  leastAssemblyRemainingQnt = assemblyProdQnt.RemainingQuantity;
                }
              }
            });
          }


          let leastAssignableQnt = 0;

          if (leastAssemblyRemainingQnt == -1) {
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
              //outStock.OutputQuantity = leastAssignableQnt;
              outStock.OutputQuantity = 0;

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
      } else if (outStock.OutputQuantity <= 0) {
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
    debugger;
    outAssembly.basfChallanSelection = [];
    outAssembly.AssemblyChallanDeductions = [];

    outAssembly.basfPOSelection = [];
    outAssembly.AssemblyPODeductions = [];

    if (outAssembly.OutputQuantity > 0) {
      let assemblyProdQnt = this.productAssemblyQnts.find(x => x.ProductId == outAssembly.ProductId);

      if (assemblyProdQnt != undefined && assemblyProdQnt != null && assemblyProdQnt.RemainingQuantity != undefined && assemblyProdQnt.RemainingQuantity != null && assemblyProdQnt.RemainingQuantity > 0) {
        if (outAssembly.OutputQuantity > assemblyProdQnt.RemainingQuantity) {
          setTimeout(x => {
            outAssembly.OutputQuantity = assemblyProdQnt.RemainingQuantity;
            // outStock.OutputQuantity = outAssembly.OutputQuantity;

            if (outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
              outStock.OutAssemblys.forEach(assemblyProduct => {
                assemblyProduct.OutputQuantity = outAssembly.OutputQuantity;
              });
            }
          }, 1);
        } else {
          setTimeout(x => {
            // outStock.OutputQuantity = outAssembly.OutputQuantity;

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
        // outStock.OutputQuantity = outAssembly.OutputQuantity;

        if (outStock.OutAssemblys != undefined && outStock.OutAssemblys != null && outStock.OutAssemblys.length > 0) {
          outStock.OutAssemblys.forEach(assemblyProduct => {
            assemblyProduct.OutputQuantity = outAssembly.OutputQuantity;
          });
        }
      }, 1);
    }


    // let outStockIndex = this.vendorChallan.OutStocks.findIndex(x => x.ProductId == outStock.ProductId);
    // let loopIndex = 0;
    // this.vendorChallan.OutStocks.forEach(x => {
    //   if (loopIndex > outStockIndex) {
    //     let prevOutAssembly = this.vendorChallan.OutStocks[loopIndex - 1].OutAssemblys.find(p => p.OutAssemblyId == outAssembly.OutAssemblyId);
    //     let prevProductAssemblyQnt = prevOutAssembly.productAssemblyQnts.find(k => k.ProductId == prevOutAssembly.ProductId);

    //     let curOutAssembly = x.OutAssemblys.find(p => p.OutAssemblyId == outAssembly.OutAssemblyId);
    //     if (curOutAssembly != undefined && curOutAssembly != null) {
    //       let curProductAssemblyQnt = curOutAssembly.productAssemblyQnts.find(k => k.ProductId == curOutAssembly.ProductId);

    //       curProductAssemblyQnt.RemainingQuantity = prevProductAssemblyQnt.RemainingQuantity - prevOutAssembly.OutputQuantity;
    //       curProductAssemblyQnt.RemainingQuantityPO = prevProductAssemblyQnt.RemainingQuantityPO - prevOutAssembly.OutputQuantity;

    //       x.OutputQuantity = 0;
    //       curOutAssembly.OutputQuantity = 0;

    //       setTimeout(t1 => {
    //         curOutAssembly.ProductId = 0;

    //         setTimeout(t2 => {
    //           curOutAssembly.ProductId = outAssembly.ProductId;
    //         }, 1);
    //       }, 1);
    //     }
    //   }

    //   loopIndex++;
    // });

    let outStockIndex = this.vendorChallan.OutStocks.findIndex(x => x.ProductId == outStock.ProductId);
    this.reCalculateAssemblyRemainingQnts(outStockIndex);
  }

  public accOutQntChanged(outAcc: OutAccModel, outStockIndex: number) {
    debugger;
    outAcc.basfChallanSelection = [];
    outAcc.AccChallanDeductions = [];

    outAcc.basfPOSelection = [];
    outAcc.AccPODeductions = [];

    if (outAcc.OutputQuantity > 0) {
      let accProdQnt = outAcc.productAccQnts.find(x => x.ProductId == outAcc.ProductId);

      if (accProdQnt != undefined && accProdQnt != null && accProdQnt.RemainingQuantity != undefined && accProdQnt.RemainingQuantity != null) {
        if (outAcc.OutputQuantity > accProdQnt.RemainingQuantity) {
          setTimeout(x => {
            // if (accProdQnt.RemainingQuantity < accProdQnt.RemainingQuantityPO)
            //   outAcc.OutputQuantity = accProdQnt.RemainingQuantity;
            // else
            //   outAcc.OutputQuantity = accProdQnt.RemainingQuantityPO;

            outAcc.OutputQuantity = 0;
          }, 1);
        }
      }
    } else if (outAcc.OutputQuantity <= 0) {
      setTimeout(x => {
        outAcc.OutputQuantity = 0;
      }, 1);
    }

    this.reCalculateAccRemainingQnts(outStockIndex);
  }

  public basfChallanOrPOSelectionDone(obj) {
    //return ((obj.basfChallanSelection != undefined && obj.basfChallanSelection != null && obj.basfChallanSelection.length > 0 && obj.isManual) || (obj.basfPOSelection != undefined && obj.basfPOSelection != null && obj.basfPOSelection.length > 0 && obj.isManualPO));
    return (obj.isManual || obj.isManualPO);
  }

  public basfChallanAndPOSelectionDone(obj) {
    return ((obj.basfChallanSelection != undefined && obj.basfChallanSelection != null && obj.basfChallanSelection.length > 0) && (obj.basfPOSelection != undefined && obj.basfPOSelection != null && obj.basfPOSelection.length > 0));
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
        if (assemblyQnt.totalOutQnt > assemblyQnt.RemainingQuantity) {
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
        if (assemblyQnt.totalOutQnt > assemblyQnt.RemainingQuantity) {
          exceeds = true;
        }
      });

      this.productAccQnts.forEach(accQnt => {
        if (accQnt.totalOutQnt > accQnt.RemainingQuantity) {
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
        let selection: string = data['data'];
        if (selection == 'Challan')
          this.viewBASFChallans(outStock, outAcc, outAssembly);
        else if (selection == 'PO')
          this.viewBASFPOs(outStock, outAcc, outAssembly);
      });

    return await popover.present();
  }

  public removeRow(i: number) {
    debugger;
    if ((this.vendorChallan.OutStocks[i].ProductId == undefined || this.vendorChallan.OutStocks[i].ProductId == 0) && (this.vendorChallan.OutStocks[i].OutputQuantity == undefined || this.vendorChallan.OutStocks[i].OutputQuantity == 0)) {
      this.vendorChallan.OutStocks.splice(i, 1);
      this.reCalculateAssemblyRemainingQnts(i);
      this.reCalculateAccRemainingQnts(i);
    } else
      if (confirm('Are you sure you want to remove this product?')) {
        this.vendorChallan.OutStocks.splice(i, 1);
        this.reCalculateAssemblyRemainingQnts(i);
        this.reCalculateAccRemainingQnts(i);
      }
  }

  public reCalculateAssemblyRemainingQnts(i) {
    let outStockIndex = 0;
    this.vendorChallan.OutStocks.forEach(outStock => {
      outStock.OutAssemblys.forEach(outAssembly => {
        let initialProductAssemblyQnt = this.productAssemblyQnts.find(k => k.ProductId == outAssembly.ProductId);
        if (initialProductAssemblyQnt != undefined && initialProductAssemblyQnt != null) {
          let initialRemainingQnt = initialProductAssemblyQnt.RemainingQuantity;
          //let initialRemainingQntPO = initialProductAssemblyQnt.RemainingQuantityPO;

          let xIndex = 0;
          let totalProductAssemblyOutQnt = 0;
          this.vendorChallan.OutStocks.forEach(x => {
            if (xIndex < outStockIndex) {
              let xOutAssembly = x.OutAssemblys.find(p => p.ProductId == outAssembly.ProductId);
              if (xOutAssembly != undefined && xOutAssembly != null) {
                if (xOutAssembly.OutputQuantity != undefined && xOutAssembly.OutputQuantity != null)
                  totalProductAssemblyOutQnt += xOutAssembly.OutputQuantity;
              }
            }

            xIndex++;
          });

          let productAssemblyQnt = outAssembly.productAssemblyQnts.find(q => q.ProductId == outAssembly.ProductId);
          if (productAssemblyQnt != undefined && productAssemblyQnt != null) {
            let prevProdAssemblyRemainingQuantity = productAssemblyQnt.RemainingQuantity;
            //let prevProdAssemblyRemainingQuantityPO = productAssemblyQnt.RemainingQuantityPO;

            productAssemblyQnt.RemainingQuantity = initialRemainingQnt - totalProductAssemblyOutQnt;
            //productAssemblyQnt.RemainingQuantityPO = initialRemainingQntPO - totalProductAssemblyOutQnt;
            this.setProdQntDisplayTextWithoutPOQnt(productAssemblyQnt);

            //if (prevProdAssemblyRemainingQuantity != productAssemblyQnt.RemainingQuantity || prevProdAssemblyRemainingQuantityPO != productAssemblyQnt.RemainingQuantityPO) {
            if (prevProdAssemblyRemainingQuantity != productAssemblyQnt.RemainingQuantity) {
              outStock.OutputQuantity = 0;
              outStock.basfChallanSelection = [];
              outStock.basfPOSelection = [];

              outAssembly.OutputQuantity = 0;
              outAssembly.basfChallanSelection = [];
              outAssembly.basfPOSelection = [];
            }

            // let prodId = outAssembly.ProductId;
            // setTimeout(t1 => {
            //   outAssembly.ProductId = 0;

            //   setTimeout(t2 => {
            //     outAssembly.ProductId = prodId;
            //   }, 1);
            // }, 1);
          }
        }
      });

      outStockIndex++;
    });
  }

  public reCalculateAccRemainingQnts(i) {
    debugger;
    let outStockIndex = 0;
    this.vendorChallan.OutStocks.forEach(outStock => {
      outStock.OutAccs.forEach(outAcc => {
        let initialProductAccQnt = this.productAccQnts.find(k => k.ProductId == outAcc.ProductId);
        if (initialProductAccQnt != undefined && initialProductAccQnt != null) {
          let initialRemainingQnt = initialProductAccQnt.RemainingQuantity;
          //let initialRemainingQntPO = initialProductAccQnt.RemainingQuantityPO;

          let xIndex = 0;
          let totalProductAccOutQnt = 0;
          this.vendorChallan.OutStocks.forEach(x => {
            if (xIndex < outStockIndex) {
              let xOutAcc = x.OutAccs.find(p => p.ProductId == outAcc.ProductId);
              if (xOutAcc != undefined && xOutAcc != null) {
                if (xOutAcc.OutputQuantity != undefined && xOutAcc.OutputQuantity != null)
                  totalProductAccOutQnt += xOutAcc.OutputQuantity;
              }
            }

            xIndex++;
          });

          let productAccQnt = outAcc.productAccQnts.find(q => q.ProductId == outAcc.ProductId);
          if (productAccQnt != undefined && productAccQnt != null) {
            let prevProdAccRemainingQuantity = productAccQnt.RemainingQuantity;
            //let prevProdAccRemainingQuantityPO = productAccQnt.RemainingQuantityPO;

            productAccQnt.RemainingQuantity = initialRemainingQnt - totalProductAccOutQnt;
            //productAccQnt.RemainingQuantityPO = initialRemainingQntPO - totalProductAccOutQnt;
            this.setProdQntDisplayTextWithoutPOQnt(productAccQnt);

            //if (prevProdAccRemainingQuantity != productAccQnt.RemainingQuantity || prevProdAccRemainingQuantityPO != productAccQnt.RemainingQuantityPO) {
            if (prevProdAccRemainingQuantity != productAccQnt.RemainingQuantity) {
              outAcc.OutputQuantity = 0;
              outAcc.basfChallanSelection = [];
              outAcc.basfPOSelection = [];
            }

            // let prodId = outAcc.ProductId;
            // let selectedProductAccQnt = outAcc.selectedProductAccQnt;
            // let outAccProductAccQnts = outAcc.productAccQnts;
            // setTimeout(t1 => {
            //   outAcc.ProductId = 0;
            //   outAcc.productAccQnts = null;
            //   outAcc.selectedProductAccQnt = null;

            //   setTimeout(t2 => {
            //     outAcc.ProductId = prodId;
            //     outAcc.productAccQnts = outAccProductAccQnts;
            //     outAcc.selectedProductAccQnt = selectedProductAccQnt;
            //   }, 100);
            // }, 100);
          }
        }
      });

      outStockIndex++;
    });
  }

  public setProdQntDisplayTextWithoutPOQnt(prodQnt: ProductQuantity) {
    prodQnt.displayText = prodQnt.ProductName + ' - ' + prodQnt.RemainingQuantity;
  }

  public setProdQntDisplayTextWithPOQnt(prodQnt: ProductQuantity) {
    prodQnt.displayText = prodQnt.ProductName + ' - ' + prodQnt.RemainingQuantity + ' - ' + prodQnt.RemainingQuantityPO;
  }

  // public reCalculateAssemblyRemainingQntsPrev(i: number) {
  //   debugger;
  //   let loopIndex = 0;
  //   this.vendorChallan.OutStocks.forEach(x => {
  //     debugger;
  //     if (loopIndex > i) {
  //       x.OutAssemblys.forEach(outAssembly => {
  //         debugger;
  //         let prevOutAssembly = this.vendorChallan.OutStocks[loopIndex - 1].OutAssemblys.find(p => p.OutAssemblyId == outAssembly.OutAssemblyId);
  //         if (prevOutAssembly != undefined && prevOutAssembly != null) {
  //           let prevProductAssemblyQnt = prevOutAssembly.productAssemblyQnts.find(k => k.ProductId == prevOutAssembly.ProductId);

  //           let curProductAssemblyQnt = outAssembly.productAssemblyQnts.find(k => k.ProductId == outAssembly.ProductId);

  //           if (curProductAssemblyQnt != undefined && curProductAssemblyQnt != null) {
  //             curProductAssemblyQnt.RemainingQuantity = prevProductAssemblyQnt.RemainingQuantity - prevOutAssembly.OutputQuantity;
  //             curProductAssemblyQnt.RemainingQuantityPO = prevProductAssemblyQnt.RemainingQuantityPO - prevOutAssembly.OutputQuantity;

  //             x.OutputQuantity = 0;
  //             x.basfChallanSelection = [];

  //             outAssembly.OutputQuantity = 0;
  //             outAssembly.basfChallanSelection = [];

  //             let prodId = outAssembly.ProductId;
  //             setTimeout(t1 => {
  //               outAssembly.ProductId = 0;

  //               setTimeout(t2 => {
  //                 outAssembly.ProductId = prodId;
  //               }, 1);
  //             }, 1);
  //           }
  //         }
  //       });
  //     }

  //     loopIndex++;
  //   });

  //   if (this.vendorChallan.OutStocks.length == 1) {
  //     this.vendorChallan.OutStocks[0].OutAssemblys.forEach(outAssembly => {
  //       let initialProductAssemblyQnt = this.productAssemblyQnts.find(p => p.ProductId == outAssembly.ProductId);
  //       let productAssemblyQnt = outAssembly.productAssemblyQnts.find(q => q.ProductId == outAssembly.ProductId);

  //       if (productAssemblyQnt != undefined && productAssemblyQnt != null) {
  //         productAssemblyQnt.RemainingQuantity = initialProductAssemblyQnt.RemainingQuantity;
  //         productAssemblyQnt.RemainingQuantityPO = initialProductAssemblyQnt.RemainingQuantityPO;

  //         this.vendorChallan.OutStocks[0].OutputQuantity = 0;
  //         this.vendorChallan.OutStocks[0].basfChallanSelection = [];

  //         outAssembly.OutputQuantity = 0;
  //         outAssembly.basfChallanSelection = [];

  //         let prodId = outAssembly.ProductId;
  //         setTimeout(t1 => {
  //           outAssembly.ProductId = 0;

  //           setTimeout(t2 => {
  //             outAssembly.ProductId = prodId;
  //           }, 1);
  //         }, 1);
  //       }
  //     });
  //   }
  // }

  public removeAccRow(j, outStock: OutStockModel) {
    debugger;
    if ((outStock.OutAccs[j].ProductId == undefined || outStock.OutAccs[j].ProductId == 0) && (outStock.OutAccs[j].OutputQuantity == undefined || outStock.OutAccs[j].OutputQuantity == 0)) {
      outStock.OutAccs.splice(j, 1);
      this.reCalculateAccRemainingQnts(j);
    } else
      if (confirm('Are you sure you want to remove this product?')) {
        outStock.OutAccs.splice(j, 1);
        this.reCalculateAccRemainingQnts(j);
      }
  }

  public outStockProductSelected(outStock: OutStockModel) {
    debugger;
    outStock.OutAssemblys = [];
    outStock.ProductId = outStock.selectedProductQnt.ProductId;
    //let productQnt: ProductQuantity = outStock.selectedProductQnt; //this.productQnts.find(x => x.ProductId == outStock.ProductId);
    outStock.SplitRatio = outStock.selectedProductQnt.SplitRatio;

    outStock.selectedProductQnt.AssemblyProductQnts.forEach(assemblyProduct => {
      debugger;
      let outAssemblyModel = new OutAssemblyModel();
      outAssemblyModel.ProductId = assemblyProduct.ProductId;
      outAssemblyModel.SplitRatio = assemblyProduct.SplitRatio;
      outAssemblyModel.productAssemblyQnts = [];

      this.productAssemblyQnts.forEach(assemblyQnt => {
        let assemblyProdQnt = new ProductQuantity();
        assemblyProdQnt.ProductId = assemblyQnt.ProductId;
        assemblyProdQnt.ProductName = assemblyQnt.ProductName;
        assemblyProdQnt.RemainingQuantity = assemblyQnt.RemainingQuantity;
        assemblyProdQnt.RemainingQuantityPO = assemblyQnt.RemainingQuantityPO;
        assemblyProdQnt.SplitRatio = assemblyQnt.SplitRatio;
        assemblyProdQnt.totalOutQnt = assemblyQnt.totalOutQnt;
        this.setProdQntDisplayTextWithoutPOQnt(assemblyProdQnt);
        outAssemblyModel.productAssemblyQnts.push(assemblyProdQnt);
      });

      let productAssemblyQnt = outAssemblyModel.productAssemblyQnts.find(q => q.ProductId == assemblyProduct.ProductId);
      if (this.vendorChallan.OutStocks.length > 1) {
        let initialProductAssemblyQnt = this.productAssemblyQnts.find(k => k.ProductId == assemblyProduct.ProductId);
        let initialRemainingQnt = initialProductAssemblyQnt.RemainingQuantity;
        //let initialRemainingQntPO = initialProductAssemblyQnt.RemainingQuantityPO;

        let totalProductAssemblyOutQnt = 0;
        this.vendorChallan.OutStocks.forEach(x => {
          debugger;
          if (x != outStock) {
            let xOutAssembly = x.OutAssemblys.find(p => p.ProductId == assemblyProduct.ProductId);
            if (xOutAssembly != undefined && xOutAssembly != null) {
              if (xOutAssembly.OutputQuantity != undefined && xOutAssembly.OutputQuantity != null)
                totalProductAssemblyOutQnt += xOutAssembly.OutputQuantity;
            }
          }
        });

        productAssemblyQnt.RemainingQuantity = initialRemainingQnt - totalProductAssemblyOutQnt;
        //productAssemblyQnt.RemainingQuantityPO = initialRemainingQntPO - totalProductAssemblyOutQnt;
        this.setProdQntDisplayTextWithoutPOQnt(productAssemblyQnt);
      }

      outAssemblyModel.selectedProductAssemblyQnt = productAssemblyQnt;
      outStock.OutAssemblys.push(outAssemblyModel);
    });

    this.vendorChallan.OutStocks.forEach(x => {
      if (x.ProductId != undefined && x.ProductId != null) {
        if (x.ProductId == outStock.ProductId && x != outStock) {
          x.ProductId = 0;
          x.selectedProductQnt = null;
          x.OutputQuantity = 0;

          x.OutAssemblys = [];
          x.OutAccs = [];
        }
      }
    });

    outStock.OutAccs = [];

    outStock.OutputQuantity = 0;
  }

  public outStockProductNotSelectedElsewhere(product: ProductQuantity, outStock: OutStockModel) {
    let notSelected = true;

    this.vendorChallan.OutStocks.forEach(x => {
      if (x.ProductId == product.ProductId && x.ProductId != outStock.ProductId)
        notSelected = false;
    });

    return notSelected;
  }

  public outAccProductSelected(outAcc: OutAccModel, outStock: OutStockModel) {
    debugger;
    outAcc.ProductId = outAcc.selectedProductAccQnt.ProductId;
    //let productAccQnt: ProductQuantity = outAcc.selectedProductAccQnt; //this.productAccQnts.find(x => x.ProductId == outAcc.ProductId);
    //if (outAcc.selectedProductAccQnt != undefined && outAcc.selectedProductAccQnt != null) {
    outAcc.SplitRatio = outAcc.selectedProductAccQnt.SplitRatio;

    outStock.OutAccs.forEach(x => {
      if (x.ProductId == outAcc.ProductId && x != outAcc) {
        x.ProductId = 0;
        x.selectedProductAccQnt = null;
        x.OutputQuantity = 0;
      }
    });

    outAcc.OutputQuantity = 0;
  }

  // public outAssemblyProductSelected(outAssembly: OutAssemblyModel, outStock: OutStockModel) {
  //   debugger;
  //   outAssembly.ProductId = outAssembly.selectedProductAssemblyQnt.ProductId;
  //   let productAccQnt: ProductQuantity = this.productAccQnts.find(x => x.ProductId == outAssembly.ProductId);
  //   if (productAccQnt != undefined && productAccQnt != null) {
  //     outAssembly.SplitRatio = productAccQnt.SplitRatio;

  //     outStock.OutAssemblys.forEach(x => {
  //       if (x.ProductId == outAssembly.ProductId && x != outAssembly) {
  //         x.ProductId = 0;
  //         x.selectedProductAssemblyQnt = null;
  //         x.OutputQuantity = 0;
  //       }
  //     });

  //     outAssembly.OutputQuantity = 0;
  //   }
  // }

  public outAccProductNotSelectedElsewhere(product: ProductQuantity, outAcc: OutAccModel, outStock: OutStockModel) {
    let notSelected = true;

    outStock.OutAccs.forEach(x => {
      if (x.ProductId == product.ProductId && x.ProductId != outAcc.ProductId)
        notSelected = false;
    });

    return notSelected;
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
