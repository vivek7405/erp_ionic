import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ToastController } from '@ionic/angular';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { OutStockModel } from 'src/app/models/OutStockModel';
import { ChallanDeduction } from 'src/app/models/ChallanDeduction';

@Component({
  selector: 'app-create-vendor-challan',
  templateUrl: './create-vendor-challan.page.html',
  styleUrls: ['./create-vendor-challan.page.scss'],
})
export class CreateVendorChallanPage implements OnInit {
  public vendorChallan: VendorChallanModel;
  public productDetails: ProductDetail[];
  public BASFChallanDetails: ViewChallanDetailModel[];

  constructor(public generalService: GeneralService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.vendorChallan = new VendorChallanModel();
    this.vendorChallan.OutStocks = [];
    this.vendorChallan.OutStocks.push(new OutStockModel());
    this.getAllProductDetails();
    this.getAllBASFChallanDetails();
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

  public getAllBASFChallanDetails() {
    this.generalService.getAllChallanDetails()
      .subscribe(
        result => {
          debugger;
          this.BASFChallanDetails = result;
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }

  public addOutStock() {
    this.vendorChallan.OutStocks.push(new OutStockModel());
  }
}
