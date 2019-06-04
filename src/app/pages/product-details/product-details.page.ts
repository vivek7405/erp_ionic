import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  public productDetails: ProductDetail[];
  public productDetail: ProductDetail;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.productDetail = new ProductDetail();
    this.getAllProductDetails();
  }

  public getAllProductDetails() {
    let selfObj = this;
    this.generalService.getAllProductDetails()
      .subscribe(
        result => {
          selfObj.productDetails = result;
        },
        error => {
          alert(error);
        }
      );
  }

  public addOrUpdateProductDetails() {
    if (this.productDetail.ProductName.trim() !== '') {
      this.generalService.addOrUpdateProductDetail(this.productDetail)
        .subscribe(
          result => {
            this.generalService.toast(this.toastCtrl, 'Product Details added successfully.');
            this.getAllProductDetails();
          },
          error => {
            alert(error);
          }
        );
    }
  }
}
