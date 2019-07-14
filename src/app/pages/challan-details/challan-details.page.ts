import { Component, OnInit } from '@angular/core';
import { ChallanProduct } from 'src/app/models/ChallanProduct';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController } from '@ionic/angular';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ChallanDetail } from 'src/app/models/ChallanDetail';
import { ChallanDetailModel } from 'src/app/models/ChallanDetailModel';
import { ChallanProductModel } from 'src/app/models/ChallanProductModel';

@Component({
  selector: 'app-challan-details',
  templateUrl: './challan-details.page.html',
  styleUrls: ['./challan-details.page.scss'],
})
export class ChallanDetailsPage implements OnInit {
  public challanProducts: ChallanProduct[] = [];
  public productDetails: ProductDetail[];
  public challanDetail: ChallanDetail;

  public isPO: boolean = false;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.challanDetail = new ChallanDetail();
    this.challanProducts.push(new ChallanProduct());

    this.getAllProductDetails();
  }

  public getAllProductDetails() {
    this.generalService.getAllProductDetails()
      .subscribe(
        result => {
          this.productDetails = result;
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public inputQntChanged(challanProduct: ChallanProduct) {
    if (challanProduct.InputQuantity < 0) {
      setTimeout(x => {
        challanProduct.InputQuantity = 0;
      }, 1);
    }
  }

  public submitChallanDetails() {
    let challanDetailModel: ChallanDetailModel = new ChallanDetailModel();
    challanDetailModel.ChallanDetail = this.challanDetail;
    challanDetailModel.ChallanProducts = this.challanProducts;

    if (this.isChallanNoEmpty()) {
      if (this.isPO)
        alert('Please enter PO Number.');
      else
        alert('Please enter Challan Number.');
    } else if (this.isChallanDateEmpty()) {
      if (this.isPO)
        alert('Please enter PO Date.');
      else
        alert('Please enter Challan Date.');
    } else if (this.isInputQntZero()) {
      alert('Please enter a valid Input Quantity.');
    } else if (this.isProductDuplicate()) {
      alert('There are duplicate products selected!');
    } else {
      if (confirm('Are you sure you want to Submit?')) {
        challanDetailModel.isPO = this.isPO;

        let successMsg = 'BASF Challan added successfully.';
        if (this.isPO)
          successMsg = 'BASF PO added successfully.';

        this.generalService.addOrUpdateChallan(challanDetailModel)
          .subscribe(
            result => {
              this.generalService.toast(this.toastCtrl, successMsg);
            },
            error => {
              alert('Something went wrong!');
            }
          );
      }
    }
  }

  private isChallanNoEmpty() {
    debugger;
    if (this.challanDetail.ChallanNo == undefined || this.challanDetail.ChallanNo == null) {
      return true;
    } else if (this.challanDetail.ChallanNo != undefined && this.challanDetail.ChallanNo != null && this.challanDetail.ChallanNo.trim() == "") {
      return true;
    } else {
      return false;
    }
  }

  private isChallanDateEmpty() {
    if (this.challanDetail.ChallanDate == undefined || this.challanDetail.ChallanDate == null) {
      return true;
    } else {
      return false;
    }
  }

  private isInputQntZero() {
    let isZero = false;

    this.challanProducts.forEach(challanProduct => {
      if (challanProduct.InputQuantity == undefined || challanProduct.InputQuantity == null || challanProduct.InputQuantity <= 0) {
        isZero = true;
      }
    });

    return isZero;
  }

  private isProductDuplicate() {
    let productIds = [];
    let duplicate = false;

    this.challanProducts.forEach(challanProduct => {
      if (productIds.indexOf(challanProduct.ProductId) >= 0) {
        duplicate = true;
      }
      productIds.push(challanProduct.ProductId);
    });

    return duplicate;
  }

  public addChallanProduct() {
    this.challanProducts.push(new ChallanProduct());
  }

  public removeRow(i) {
    this.challanProducts.splice(i, 1);
  }
}
