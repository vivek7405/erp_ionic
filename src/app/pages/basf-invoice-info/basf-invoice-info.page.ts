import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { Printer } from '@ionic-native/printer/ngx';
import { ToastController } from '@ionic/angular';
import { WindowRefService } from 'src/app/services/common/common.service';
import { BASFInvoiceModel } from 'src/app/models/BASFInvoiceModel';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';

@Component({
  selector: 'app-basf-invoice-info',
  templateUrl: './basf-invoice-info.page.html',
  styleUrls: ['./basf-invoice-info.page.scss'],
})
export class BasfInvoiceInfoPage implements OnInit {
  public basfInvoice: BASFInvoiceModel;
  public window: any;

  constructor(public activatedRoute: ActivatedRoute, public generalService: GeneralService, public printer: Printer, public toastCtrl: ToastController, public windowRef: WindowRefService) { }

  ngOnInit() {
    this.window = this.windowRef.nativeWindow;
    this.activatedRoute.queryParams.subscribe((result) => {
      debugger;
      let vendorChallanNoModel = new VendorChallanNoModel();
      vendorChallanNoModel.VendorChallanNo = result.basfInvoiceId;
      this.generalService.getBASFInvoiceByBASFInvoiceId(vendorChallanNoModel)
        .subscribe(
          result => {
            this.basfInvoice = result;
            this.basfInvoice.outputQuantity = 0;

            this.basfInvoice.InvoiceOutStocks.forEach(outStock => {
              outStock.mainQntSum = 0;              

              outStock.InvoiceChallanDeductions.forEach(challanDeduction => {
                outStock.mainQntSum += challanDeduction.OutQuantity;
              });

              this.basfInvoice.outputQuantity += outStock.OutputQuantity;
            });
          },
          error => {
            alert('Some error occurred while fetching details.');
          }
        );
    });
  }

}
