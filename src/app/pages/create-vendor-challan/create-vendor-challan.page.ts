import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ToastController, ModalController, IonDatetime } from '@ionic/angular';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { OutStockModel } from 'src/app/models/OutStockModel';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { BasfChallanDeductionComponent } from '../basf-challan-deduction/basf-challan-deduction.component';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { BASFChallanSelection } from 'src/app/models/BASFChallanSelection';
import { ChallanDeductionModel } from 'src/app/models/ChallanDeductionModel';

@Component({
  selector: 'app-create-vendor-challan',
  templateUrl: './create-vendor-challan.page.html',
  styleUrls: ['./create-vendor-challan.page.scss'],
})
export class CreateVendorChallanPage implements OnInit {
  public vendorChallan: VendorChallanModel;
  public productDetails: ProductDetail[];
  public productQnts: ProductQuantity[];
  public BASFChallanDetails: ViewChallanDetailModel[];
  public basfChallanSelection: BASFChallanSelection[];
  private outStockCount = 0;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, private modalController: ModalController) { }

  ngOnInit() {
    this.vendorChallan = new VendorChallanModel();
    this.vendorChallan.OutStocks = [];
    this.vendorChallan.OutStocks.push(new OutStockModel());
    this.getProductRemainingQuantity();
  }

  public getProductRemainingQuantity() {
    this.generalService.getProductRemainingQuantity()
      .subscribe(
        result => {
          this.productQnts = result;
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public addOutStock() {
    this.vendorChallan.OutStocks.push(new OutStockModel());
  }

  public async viewBASFChallans(outStock: OutStockModel) {
    debugger;
    const modal = await this.modalController.create({
      component: BasfChallanDeductionComponent,
      componentProps: { outStock: outStock }
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
          this.getProductRemainingQuantity();
        },
        error => {
          alert('Something went wrong!');
        }
      );
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
