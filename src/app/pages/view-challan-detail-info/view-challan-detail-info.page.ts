import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ActivatedRoute } from '@angular/router';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';

@Component({
  selector: 'app-view-challan-detail-info',
  templateUrl: './view-challan-detail-info.page.html',
  styleUrls: ['./view-challan-detail-info.page.scss'],
})
export class ViewChallanDetailInfoPage implements OnInit {
  public challanDetail: ViewChallanDetailModel;

  constructor(public activatedRoute: ActivatedRoute, public generalService: GeneralService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result) => {
      let vendorChallanNoModel = new VendorChallanNoModel();
      vendorChallanNoModel.VendorChallanNo = result.challanId;

      this.generalService.getBASFChallanByBASFChallanId(vendorChallanNoModel)
        .subscribe(
          result => {
            this.challanDetail = result;

            this.challanDetail.totalStockIn = 0;
            this.challanDetail.ChallanProducts.forEach(challanProduct => {
              this.challanDetail.totalStockIn += challanProduct.ChallanProduct.InputQuantity;
            });
          },
          error => {

          }
        );
    });
  }

}
