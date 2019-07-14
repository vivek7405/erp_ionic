import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { GeneralService } from 'src/app/services/general/general.service';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';

@Component({
  selector: 'app-vendor-challan-info',
  templateUrl: './vendor-challan-info.page.html',
  styleUrls: ['./vendor-challan-info.page.scss'],
})
export class VendorChallanInfoPage implements OnInit {
  public vendorChallan: VendorChallanModel;

  constructor(public activatedRoute: ActivatedRoute, public generalService: GeneralService) {
    this.activatedRoute.queryParams.subscribe((result) => {
      debugger;
      let vendorChallanNoModel = new VendorChallanNoModel();
      vendorChallanNoModel.VendorChallanNo = result.vendorChallanNo;
      this.generalService.getVendorChallanByVendorChallanNo(vendorChallanNoModel)
        .subscribe(
          result => {
            this.vendorChallan = result;
            this.vendorChallan.outputQuantity = 0;

            this.vendorChallan.OutStocks.forEach(outStock => {
              outStock.mainQntSum = 0;
              outStock.assemblyQntSum = 0;
              outStock.accQntSum = 0;

              outStock.ChallanDeductions.forEach(challanDeduction => {
                outStock.mainQntSum += challanDeduction.OutQuantity;
              });

              outStock.OutAssemblys.forEach(assembly => {
                assembly.AssemblyChallanDeductions.forEach(assemblyChallanDeduction => {
                  outStock.assemblyQntSum += assemblyChallanDeduction.OutQuantity;
                });
              });

              outStock.OutAccs.forEach(acc => {
                acc.AccChallanDeductions.forEach(accChallanDeduction => {
                  outStock.accQntSum += accChallanDeduction.OutQuantity;
                });
              });

              this.vendorChallan.outputQuantity += outStock.OutputQuantity;
            });
          },
          error => {
            alert('Some error occurred while fetching details.');
          }
        );
    });
  }

  ngOnInit() {
  }

}
