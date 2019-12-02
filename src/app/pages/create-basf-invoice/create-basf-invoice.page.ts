import { Component, OnInit } from '@angular/core';
import { BASFInvoiceModel } from 'src/app/models/BASFInvoiceModel';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { BASFChallanSelection } from 'src/app/models/BASFChallanSelection';
import { InvoiceOutStockModel } from 'src/app/models/InvoiceOutStockModel';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController, ModalController, PopoverController } from '@ionic/angular';
import { BasfInvoiceChallanDeductionComponent } from '../basf-invoice-challan-deduction/basf-invoice-challan-deduction.component';
import { InvoiceOutStock } from 'src/app/models/InvoiceOutStock';
import { InvoiceChallanDeductionModel } from 'src/app/models/InvoiceChallanDeductionModel';

@Component({
  selector: 'app-create-basf-invoice',
  templateUrl: './create-basf-invoice.page.html',
  styleUrls: ['./create-basf-invoice.page.scss'],
})
export class CreateBasfInvoicePage implements OnInit {
  public basfInvoice: BASFInvoiceModel;
  public productDetails: ProductDetail[];
  public productQnts: ProductQuantity[];
  public BASFChallanDetails: ViewChallanDetailModel[];
  public basfChallanSelection: BASFChallanSelection[];
  private outStockCount = 0;
  public IsNg: boolean = false;
  public selectProductPlaceholder = "Select Product";

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, private modalController: ModalController, public popoverController: PopoverController) { }

  ngOnInit() {
    this.basfInvoice = new BASFInvoiceModel();
    this.basfInvoice.InvoiceOutStocks = [];
    this.basfInvoice.InvoiceOutStocks.push(new InvoiceOutStockModel());
    this.getMainProductRemainingQuantity();
  }

  public getMainProductRemainingQuantity() {
    this.generalService.GetMainProductFGQuantityBASFInvoice()
      .subscribe(
        result => {
          debugger;
          this.productQnts = result;
          this.productQnts.forEach(prodQnt => {
            this.setProdQntDisplayTextWithoutPOQnt(prodQnt);
          });
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public setProdQntDisplayTextWithoutPOQnt(prodQnt: ProductQuantity) {
    prodQnt.displayText = prodQnt.ProductName + ' | ' + prodQnt.RemainingQuantity;
  }

  public addOutStock() {
    if (this.basfInvoice.InvoiceOutStocks.length == this.productQnts.length || this.productQnts.length == 0)
      alert('No more products available in stock!');
    else
      this.basfInvoice.InvoiceOutStocks.push(new InvoiceOutStockModel());
  }

  public async viewBASFChallans(outStock: InvoiceOutStockModel) {
    debugger;
    const modal = await this.modalController.create({
      component: BasfInvoiceChallanDeductionComponent,
      componentProps: { outStock: InvoiceOutStock },
      backdropDismiss: false
    });

    modal.onDidDismiss()
      .then((data) => {
        debugger;
        outStock.basfChallanSelection = data['data'];
        outStock.InvoiceChallanDeductions = [];

        outStock.basfChallanSelection.forEach(challan => {
          if (challan.IsChecked && challan.outQuantity > 0) {
            let challanDeduction: InvoiceChallanDeductionModel = new InvoiceChallanDeductionModel();

            challanDeduction.ChallanProductId = challan.ChallanProduct.ChallanProductId;
            challanDeduction.OutQuantity = challan.outQuantity;

            outStock.InvoiceChallanDeductions.push(challanDeduction);
          }
        });
      });

    await modal.present();
  }

  public outStockProductSelected(outStock: InvoiceOutStockModel) {
    debugger;
    outStock.ProductId = outStock.selectedProductQnt.ProductId;
    //let productQnt: ProductQuantity = outStock.selectedProductQnt; //this.productQnts.find(x => x.ProductId == outStock.ProductId);
    outStock.SplitRatio = outStock.selectedProductQnt.SplitRatio;

    this.basfInvoice.InvoiceOutStocks.forEach(x => {
      if (x.ProductId != undefined && x.ProductId != null) {
        if (x.ProductId == outStock.ProductId && x != outStock) {
          x.ProductId = 0;
          x.selectedProductQnt = null;
          x.OutputQuantity = 0;
        }
      }
    });

    outStock.OutputQuantity = 0;
  }

  public mainOutQntChanged(outStock: InvoiceOutStockModel) {
    debugger;
    outStock.basfChallanSelection = [];
    outStock.InvoiceChallanDeductions = [];

    if (outStock.ProductId != undefined && outStock.ProductId != null && outStock.ProductId != 0) {
      if (outStock.OutputQuantity > 0) {
        let productQnt = this.productQnts.find(x => x.ProductId == outStock.ProductId);

        if (productQnt != undefined && productQnt != null && productQnt.RemainingQuantity != undefined && productQnt.RemainingQuantity != null && productQnt.RemainingQuantity > 0) {
          if (outStock.OutputQuantity > productQnt.RemainingQuantity) {
            setTimeout(x => {
              outStock.OutputQuantity = 0;
            }, 1);
          }
        }
      } else if (outStock.OutputQuantity <= 0) {
        setTimeout(x => {
          outStock.OutputQuantity = 0;
        }, 1);
      }
    }
  }

  public basfChallanSelectionDone(obj) {
    return obj.isManual;
  }

  public submit() {
    // this.outStockCount = 0;
    // this.vendorChallan.OutStocks.forEach(outStock => {
    //   this.challanDeductionAndSave(outStock);
    // });

    if (this.basfInvoice.BASFInvoiceNo == undefined || this.basfInvoice.BASFInvoiceNo == null) {
      alert('Please enter Invoice Number.');
    } else if (this.basfInvoice.BASFInvoiceDate == undefined || this.basfInvoice.BASFInvoiceDate == null) {
      alert('Please enter Invoice Date.');
    } else if (this.isOutQntZero()) {
      alert('Please enter a valid Output Quantity.');
    } else if (this.checkForDuplicates()) {
      alert('There are duplicate products selected!');
    } else {
      if (confirm('Are you sure you want to Submit?')) {
        this.basfInvoice.IsNg = this.IsNg;
        this.generalService.addOrUpdateBASFInvoice(this.basfInvoice)
          .subscribe(
            result => {
              this.generalService.toast(this.toastCtrl, 'BASF Invoice saved successfully.');
              this.generalService.getMainProductRemainingQuantityBASFInvoice()
                .subscribe(
                  result => {
                    debugger;
                    this.productQnts = result;
                    this.productQnts.forEach(prodQnt => {
                      this.setProdQntDisplayTextWithoutPOQnt(prodQnt);
                    });
                    this.basfInvoice = new BASFInvoiceModel();
                    this.basfInvoice.InvoiceOutStocks = [];
                    this.basfInvoice.InvoiceOutStocks.push(new InvoiceOutStockModel());
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

    this.basfInvoice.InvoiceOutStocks.forEach(outStock => {
      if (!(outStock.OutputQuantity != undefined && outStock.OutputQuantity != null && outStock.OutputQuantity > 0)) {
        isZero = true;
      }
    });

    return isZero;
  }

  private checkForDuplicates() {
    let duplicate = false;
    let productIds = [];
    this.basfInvoice.InvoiceOutStocks.forEach(outStock => {
      if (outStock.ProductId != undefined && outStock.ProductId != null && outStock.ProductId > 0) {
        if (productIds.length > 0) {
          if (productIds.indexOf(outStock.ProductId) >= 0) {
            duplicate = true;
          }
        }
        productIds.push(outStock.ProductId);
      }
    });

    return duplicate;
  }
}
