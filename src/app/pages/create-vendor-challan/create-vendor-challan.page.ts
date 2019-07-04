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
  public BASFChallanDetails: ViewChallanDetailModel[];
  public basfChallanSelection: BASFChallanSelection[];
  private outStockCount = 0;
  public htmlString = "<button>ABC</button>";

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, private modalController: ModalController, public popoverController: PopoverController) { }

  ngOnInit() {
    this.vendorChallan = new VendorChallanModel();
    this.vendorChallan.OutStocks = [];
    this.vendorChallan.OutStocks.push(new OutStockModel());
    this.getMainProductRemainingQuantity();
    this.getAccProductRemainingQuantity();
  }

  public getMainProductRemainingQuantity() {
    this.generalService.getMainProductRemainingQuantity()
      .subscribe(
        result => {
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

  public addOutStock() {
    this.vendorChallan.OutStocks.push(new OutStockModel());
  }

  public addOutAcc(outStock: OutStockModel) {
    outStock.OutAccs.push(new OutAccModel());
  }

  public async viewBASFChallans(outStock: OutStockModel, outAcc: OutAccModel) {
    debugger;
    const modal = await this.modalController.create({
      component: BasfChallanDeductionComponent,
      componentProps: { outStock: outStock, outAcc: outAcc },
      backdropDismiss: false
    });

    modal.onDidDismiss()
      .then((data) => {
        debugger;
        if (outAcc == null) {     // Out Stock
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
        } else {    //Out Accessory
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
        }
      });

    await modal.present();
  }

  public submit() {
    // this.outStockCount = 0;
    // this.vendorChallan.OutStocks.forEach(outStock => {
    //   this.challanDeductionAndSave(outStock);
    // });

    this.generalService.addOrUpdateVendorChallan(this.vendorChallan)
      .subscribe(
        result => {
          this.generalService.toast(this.toastCtrl, 'Vendor Challan saved successfully.');
          this.vendorChallan = new VendorChallanModel();
          this.vendorChallan.OutStocks = [];
          this.vendorChallan.OutStocks.push(new OutStockModel());
          this.getMainProductRemainingQuantity();
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  async presentPopover(ev: any, outStock: OutStockModel, outAcc: OutAccModel) {
    const popover = await this.popoverController.create({
      component: ViewDeductionButtonsComponent,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss()
      .then(data => {
        let isBASFChallan: boolean = data['data'];
        if (isBASFChallan)
          this.viewBASFChallans(outStock, outAcc);
        // else
        //   this.viewBASFPO(outStock);
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
