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

  public submitChallanDetails() {
    let challanDetailModel: ChallanDetailModel = new ChallanDetailModel();
    challanDetailModel.ChallanDetail = this.challanDetail;
    challanDetailModel.ChallanProducts = this.challanProducts;

    this.generalService.addOrUpdateChallan(challanDetailModel)
      .subscribe(
        result => {
          this.generalService.toast(this.toastCtrl, 'Challan Detail added successfully.');
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public addChallanProduct() {
    this.challanProducts.push(new ChallanProduct());
  }

  public removeRow(i) {
    this.challanProducts.splice(i, 1);
  }
}
