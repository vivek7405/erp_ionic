import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-challan-details',
  templateUrl: './view-challan-details.page.html',
  styleUrls: ['./view-challan-details.page.scss'],
})
export class ViewChallanDetailsPage implements OnInit {
  public challanDetails: ViewChallanDetailModel[];
  public productQnts: ProductQuantity[];

  constructor(public generalService: GeneralService, public router: Router) { }

  ngOnInit() {
    this.getAllChallanDetails();
  }

  public getAllChallanDetails() {
    this.generalService.getAllChallanDetails()
      .subscribe(
        result => {
          debugger;
          this.challanDetails = result;

          this.challanDetails.forEach(challanDetail => {
            challanDetail.totalStockIn = 0;
            challanDetail.ChallanProducts.forEach(challanProduct => {
              challanDetail.totalStockIn += challanProduct.ChallanProduct.InputQuantity;
            });
          });
        },
        error => {
          alert('Some error occurred while fetching details.');
        }
      );
  }

  public showDetails(challanDetail: ViewChallanDetailModel) {
    this.router.navigate(['/view-challan-detail-info'], {
      queryParams: {
        challanId: challanDetail.ChallanDetail.ChallanId
      }
    });
  }
}
