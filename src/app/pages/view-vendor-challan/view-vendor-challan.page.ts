import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController } from '@ionic/angular';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-vendor-challan',
  templateUrl: './view-vendor-challan.page.html',
  styleUrls: ['./view-vendor-challan.page.scss'],
})
export class ViewVendorChallanPage implements OnInit {
  public vendorChallans: VendorChallanModel[];

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public router: Router) { }

  ngOnInit() {
    this.getAllVendorChallans();
  }

  public getAllVendorChallans() {
    this.generalService.getAllVendorChallans()
      .subscribe(
        result => {
          this.vendorChallans = result;

          this.vendorChallans.forEach(vendorChallan => {
            vendorChallan.outputQuantity = 0;
            vendorChallan.OutStocks.forEach(outStock => {
              vendorChallan.outputQuantity += outStock.OutputQuantity;
            });
          });
        },
        error => {
          alert('Some error occurred while fetching details.');
        }
      );
  }

  public showDetails(vendorChallan: VendorChallanModel) {
    this.router.navigate(['/vendor-challan-info'], {
      queryParams: {
        vendorChallanNo: vendorChallan.VendorChallanNo
      }
    });
  }
}
