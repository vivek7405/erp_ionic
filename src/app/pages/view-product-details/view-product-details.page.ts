import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController } from '@ionic/angular';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.page.html',
  styleUrls: ['./view-product-details.page.scss'],
})
export class ViewProductDetailsPage implements OnInit {
  public productDetails: ProductDetail[];

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public router: Router) { }

  ngOnInit() {
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

  public redirectToProductMappings(productDetail: ProductDetail) {
    this.router.navigate(['/product-mappings'], {
      queryParams: {
        productId: productDetail.ProductId
      }
    });
  }
}
