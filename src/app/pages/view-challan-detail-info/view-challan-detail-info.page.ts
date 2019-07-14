import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ActivatedRoute } from '@angular/router';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { ToastController } from '@ionic/angular';
import { ViewPODetailModel } from 'src/app/models/ViewPODetailModel';

@Component({
  selector: 'app-view-challan-detail-info',
  templateUrl: './view-challan-detail-info.page.html',
  styleUrls: ['./view-challan-detail-info.page.scss'],
})
export class ViewChallanDetailInfoPage implements OnInit {
  public challanDetail: ViewChallanDetailModel;
  public poDetail: ViewPODetailModel;
  public isPO: boolean = false;

  constructor(public activatedRoute: ActivatedRoute, public generalService: GeneralService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result) => {
      debugger;
      let challanIdModel = new VendorChallanNoModel();
      challanIdModel.VendorChallanNo = result.challanId;

      if (result.challanId != undefined && result.challanId != null && result.challanId > 0) {
        this.isPO = false;
        this.getChallanDetailByChallanId(challanIdModel);
      }

      let poIdModel = new VendorChallanNoModel();
      poIdModel.VendorChallanNo = result.poId;

      if (result.poId != undefined && result.poId != null && result.poId > 0) {
        this.isPO = true;
        this.getPODetailByPOId(poIdModel);
      }
    });
  }

  public getChallanDetailByChallanId(challanIdModel) {
    this.generalService.getBASFChallanByBASFChallanId(challanIdModel)
      .subscribe(
        result => {
          this.challanDetail = result;

          this.challanDetail.totalStockIn = 0;
          this.challanDetail.ChallanProducts.forEach(challanProduct => {
            this.challanDetail.totalStockIn += challanProduct.ChallanProduct.InputQuantity;
          });
        },
        error => {
          this.generalService.toast(this.toastCtrl, 'Something went wrong while fetching details!');
        }
      );
  }

  public getPODetailByPOId(poIdModel) {
    this.generalService.getBASFPOByBASFPOId(poIdModel)
      .subscribe(
        result => {
          debugger;
          this.poDetail = result;

          this.poDetail.totalStockIn = 0;
          this.poDetail.POProducts.forEach(poProduct => {
            this.poDetail.totalStockIn += poProduct.POProduct.InputQuantity;
          });
        },
        error => {
          this.generalService.toast(this.toastCtrl, 'Something went wrong while fetching details!');
        }
      );
  }
}
