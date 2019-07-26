import { Component, OnInit } from '@angular/core';
import { ChallanProduct } from 'src/app/models/ChallanProduct';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController } from '@ionic/angular';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ChallanDetail } from 'src/app/models/ChallanDetail';
import { ChallanDetailModel } from 'src/app/models/ChallanDetailModel';
import { ChallanProductModel } from 'src/app/models/ChallanProductModel';
import { ActivatedRoute } from '@angular/router';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-challan-details',
  templateUrl: './challan-details.page.html',
  styleUrls: ['./challan-details.page.scss'],
})
export class ChallanDetailsPage implements OnInit {
  public challanProducts: ChallanProduct[] = [];
  public productDetails: ProductDetail[];
  public challanDetail: ChallanDetail;

  public isEdit: boolean;

  public isPO: boolean = false;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public activatedRoute: ActivatedRoute, public location: Location) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      debugger;
      if (params && params.challanId && params.challanId != 0 && params.isPO != undefined && params.isPO != null) {
        this.isEdit = true;
        this.isPO = params.isPO == "true" ? true : false;

        let vendorChallanNoModel = new VendorChallanNoModel();
        vendorChallanNoModel.VendorChallanNo = params.challanId;
        if (this.isPO) {
          this.generalService.getAllProductDetailsForPO()
            .subscribe(
              result => {
                this.productDetails = result;

                this.generalService.getBASFPOByBASFPOId(vendorChallanNoModel)
                  .subscribe(
                    result => {
                      this.challanDetail = new ChallanDetail();
                      this.challanDetail.ChallanDate = result.PODetail.PODate;
                      this.challanDetail.ChallanId = result.PODetail.POId;
                      this.challanDetail.ChallanNo = result.PODetail.PONo;
                      this.challanDetail.CreateDate = result.PODetail.CreateDate;
                      this.challanDetail.EditDate = result.PODetail.EditDate;

                      result.POProducts.forEach(poProduct => {
                        let challanProd = new ChallanProduct();
                        challanProd.ChallanId = poProduct.POProduct.POId;
                        challanProd.ChallanProductId = poProduct.POProduct.POProductId;
                        challanProd.CreateDate = poProduct.POProduct.CreateDate;
                        challanProd.EditDate = poProduct.POProduct.EditDate;
                        challanProd.InputQuantity = poProduct.POProduct.InputQuantity;
                        challanProd.ProductId = poProduct.POProduct.ProductId;
                        challanProd.CanDelete = poProduct.CanDelete;

                        this.challanProducts.push(challanProd);
                      });
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
        } else {
          this.generalService.getAllProductDetails()
            .subscribe(
              result => {
                this.productDetails = result;

                vendorChallanNoModel.VendorChallanNo = params.challanId;
                this.generalService.getBASFChallanByBASFChallanId(vendorChallanNoModel)
                  .subscribe(
                    result => {
                      this.challanDetail = result.ChallanDetail;
                      result.ChallanProducts.forEach(challanProduct => {
                        let challanProd = new ChallanProduct();
                        challanProd.ChallanId = challanProduct.ChallanProduct.ChallanId;
                        challanProd.ChallanProductId = challanProduct.ChallanProduct.ChallanProductId;
                        challanProd.CreateDate = challanProduct.ChallanProduct.CreateDate;
                        challanProd.EditDate = challanProduct.ChallanProduct.EditDate;
                        challanProd.InputQuantity = challanProduct.ChallanProduct.InputQuantity;
                        challanProd.ProductId = challanProduct.ChallanProduct.ProductId;
                        challanProd.CanDelete = challanProduct.CanDelete;

                        this.challanProducts.push(challanProd);
                      });
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
      } else {
        this.challanDetail = new ChallanDetail();
        this.challanProducts.push(new ChallanProduct());

        this.getAllProductDetails();
      }
    });
  }

  public poSwitched() {
    if (!this.isPO) {
      if (confirm('Are you sure you want to switch to PO? All the entered data will be lost.')) {
        this.challanDetail = new ChallanDetail();
        this.challanProducts = [];
        this.challanProducts.push(new ChallanProduct());

        this.getAllProductDetailsForPO();
      } else {
        setTimeout(x => {
          this.isPO = !this.isPO;
        }, 1);
      }
    } else {
      if (confirm('Are you sure you want to switch to Challan? All the entered data will be lost.')) {
        this.challanDetail = new ChallanDetail();
        this.challanProducts = [];
        this.challanProducts.push(new ChallanProduct());

        this.getAllProductDetails();
      } else {
        this.isPO = !this.isPO;
      }
    }
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

  public getAllProductDetailsForPO() {
    this.generalService.getAllProductDetailsForPO()
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
        if (this.isPO) {
          if (!this.isEdit)
            successMsg = 'BASF PO added successfully.';
          else
            successMsg = 'BASF PO updated successfully.';
        } else {
          if (!this.isEdit)
            successMsg = 'BASF Challan added successfully.';
          else
            successMsg = 'BASF Challan updated successfully.';
        }

        this.generalService.addOrUpdateChallan(challanDetailModel)
          .subscribe(
            result => {
              this.generalService.toast(this.toastCtrl, successMsg);

              this.challanDetail = new ChallanDetail();
              this.challanProducts = [];
              this.challanProducts.push(new ChallanProduct());

              if (this.isEdit) {
                this.location.back();
              }
            },
            error => {
              debugger;
              alert(error.error.ExceptionMessage);
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
